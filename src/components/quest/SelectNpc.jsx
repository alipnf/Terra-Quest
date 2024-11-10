import { useState, useEffect } from "react";
import { Leaf, Zap, RefreshCw, Search } from "lucide-react";

export default function SelectNpc({
  npcData,
  selectedNpc,
  handleNpcChange,
  handleSearchQuests,
  loading,
  setTheme,
}) {
  const [selectedNPC, setSelectedNPC] = useState(selectedNpc);

  useEffect(() => {
    const npcTheme = npcData.find((npc) => npc.name === selectedNPC)?.theme;
    if (!npcTheme) return;
    setTheme(npcTheme);
  }, [npcData, selectedNPC, setTheme]);

  useEffect(() => {
    setSelectedNPC(selectedNpc);
  }, [selectedNpc]);

  const handleNPCSelection = (npcName) => {
    setSelectedNPC(npcName);
    handleNpcChange(npcName); // Mengirimkan nama NPC ke `handleNpcChange`
  };

  const resetNPCSelection = () => {
    setSelectedNPC(null);
    handleNpcChange(null); // Reset NPC yang dipilih
  };

  return (
    <div className="text-center mb-8">
      {!selectedNPC ? (
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
            {selectedNPC === "Greenia" ? (
              <Leaf className="w-6 h-6 mr-2 text-green-600" />
            ) : (
              <Zap className="w-6 h-6 mr-2 text-blue-600" />
            )}
            <h3 className="text-lg font-semibold">{selectedNPC}</h3>
          </div>
          <div className="card-body">
            <p>{getNPCWelcomeMessage(selectedNPC)}</p>
          </div>
          <div className="card-footer flex justify-between mt-4">
            <button className="btn btn-outline" onClick={resetNPCSelection}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Pilih NPC Lain
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleSearchQuests(npcData)}
              disabled={loading || !selectedNpc}
            >
              <Search className="w-4 h-4 mr-2" />
              {loading ? "Mencari Quest..." : "Cari Quest"}
            </button>
          </div>
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
