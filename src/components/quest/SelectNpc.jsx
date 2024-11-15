import { useState, useEffect } from "react";
import { Leaf, Zap, RefreshCw, Search } from "lucide-react";
import { useQuestStore } from "../../stores/useQuestStore";
import {
  generateQuest,
  getNPCWelcomeMessage,
} from "../../services/gemini/geminiApiServices";
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

  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [welcomeLoading, setWelcomeLoading] = useState(false);

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

  useEffect(() => {
    const loadWelcomeMessage = async () => {
      if (selectedNpc) {
        setWelcomeLoading(true); // Set the welcome message loading state to true
        try {
          const message = await getNPCWelcomeMessage(selectedNpc);
          setWelcomeMessage(message);
        } catch (error) {
          console.error("Error generating NPC welcome message:", error);
          setWelcomeMessage(
            "Selamat datang! Klik tombol 'Cari Quest' untuk memulai.",
          );
        } finally {
          setWelcomeLoading(false); // Set it back to false when finished
        }
      }
    };

    loadWelcomeMessage();
  }, [selectedNpc, setLoading]);

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
          <p className="text-xl mb-8">Pilih NPC yang akan menjadi guide-mu</p>
          <div className="flex justify-evenly flex-col md:flex-row gap-7 md:gap-[5%] px-4">
            {npcData.slice(0, 2).map((npc) => (
              <div
                key={npc.id}
                onClick={() => handleNPCSelection(npc.name)}
                className="card bg-base-100 shadow-xl cursor-pointer flex-1 w-full hover:scale-105 transition-transform duration-300"
              >
                <figure className="overflow-hidden">
                  <img
                    src={npc.image}
                    alt={npc.name}
                    className="object-cover w-full h-48 md:h-80"
                  />
                </figure>
                <div className="card-body text-center p-4">
                  <h2 className="card-title">{npc.name}</h2>
                  <p className="text-sm">
                    {npc.name === "Greenia"
                      ? "Dapatkan petualangan bersama Greenia!"
                      : "Tantangan menanti bersama Okta!"}
                  </p>
                </div>
              </div>
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
            <div className="mt-4 flex gap-4">
              <div className="w-1/3">
                <img
                  src={npcData.find((npc) => npc.name === selectedNpc)?.image}
                  alt={selectedNpc}
                  className="object-cover w-full h-48 md:h-64 rounded-lg shadow-xl"
                />
              </div>
              <div className="w-2/3 flex items-center justify-center">
                {welcomeLoading ? ( // Use welcomeLoading here for the welcome message
                  <span className="loading loading-dots loading-md"></span>
                ) : (
                  <p>{welcomeMessage}</p>
                )}
              </div>
            </div>
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
