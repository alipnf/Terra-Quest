import { useEffect } from "react";
import { Leaf, Zap, RefreshCw, Search } from "lucide-react";
import { useQuestStore } from "../../stores/useQuestStore";
import { generateQuest } from "../../services/gemini/geminiApiServices";
import { useShallow } from "zustand/react/shallow";

export default function SelectNpc({ setTheme }) {
  const {
    quest,
    npcData,
    selectedNpc,
    setSelectedNpc,
    addQuests,
    error,
    setError,
    loading,
    setLoading,
  } = useQuestStore(
    useShallow((state) => ({
      quest: state.quests,
      setSelectedNpc: state.setSelectedNpc,
      npcData: state.npcData,
      selectedNpc: state.selectedNpc,
      addQuests: state.addQuests,
      error: state.error,
      setError: state.setError,
      loading: state.loading,
      setLoading: state.setLoading,
    })),
  );

  const generateQuestHandler = async () => {
    if (!selectedNpc) return;
    setError(null);

    setLoading(true);
    try {
      const responseJson = await generateQuest(selectedNpc, npcData, quest);
      const questsWithId = responseJson.map((questObj) => ({
        ...questObj,
      }));
      addQuests(questsWithId);
    } catch (err) {
      console.error(err);
      setError("Gagal mencari quest. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [setError]);

  useEffect(() => {
    const npcTheme = npcData.find((npc) => npc.name === selectedNpc)?.theme;
    if (npcTheme) {
      setTheme(npcTheme);
    }
  }, [npcData, selectedNpc, setTheme]);

  const handleNPCSelection = (npcName) => {
    setSelectedNpc(npcName);
  };

  const resetNPCSelection = () => {
    setSelectedNpc(null);
  };

  return (
    <div className="text-center mb-8">
      {!selectedNpc ? (
        <>
          <p className="text-xl mb-4">Pilih NPC yang akan membimbingmu:</p>
          <div className="flex justify-center gap-4">
            {npcData.map((npc) => (
              <button
                key={npc.id}
                onClick={() => handleNPCSelection(npc.name)}
                className="btn btn-primary flex items-center gap-2"
              >
                {npc.name === "Greenia" ? (
                  <Leaf className="w-5 h-5" />
                ) : (
                  <Zap className="w-5 h-5" />
                )}
                {npc.name}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="card bg-base-100 shadow-lg p-4">
          <div className="card-header flex items-center mb-2">
            {selectedNpc === "Greenia" ? (
              <Leaf className="w-6 h-6 mr-2 text-green-600" />
            ) : (
              <Zap className="w-6 h-6 mr-2 text-blue-600" />
            )}
            <h3 className="text-lg font-semibold">{selectedNpc}</h3>
          </div>
          <div className="card-body">
            <p>{getNPCWelcomeMessage(selectedNpc)}</p>
          </div>
          <div className="card-footer flex flex-wrap justify-between mt-4 gap-2">
            <button
              className="btn btn-outline w-full sm:w-auto"
              onClick={resetNPCSelection}
              disabled={loading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Pilih NPC Lain
            </button>
            <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={generateQuestHandler}
              disabled={loading || !selectedNpc}
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Mencari Quest...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Cari Quest
                </>
              )}
            </button>
          </div>
        </div>
      )}
      {error && (
        <div className="alert alert-error mt-4">
          <div>{error}</div>
        </div>
      )}
    </div>
  );
}

function getNPCWelcomeMessage(npcName) {
  return npcName === "Greenia"
    ? "Selamat datang, petualang! Saya Greenia, akan membimbingmu dalam petualangan ini."
    : "Hey, saya Okta! Bersiaplah untuk tantangan yang mendebarkan!";
}
