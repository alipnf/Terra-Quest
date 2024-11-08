import { useState, useEffect } from "react";
import axios from "axios";

export const useNpcData = () => {
  const [npcData, setNpcData] = useState([]);
  const [selectedNpc, setSelectedNpc] = useState(null);

  useEffect(() => {
    const fetchNpcData = async () => {
      try {
        const response = await axios.get(
          "https://672b14f7976a834dd0258331.mockapi.io/npc",
        );
        setNpcData(response.data);
      } catch (error) {
        console.error("Error fetching NPC data:", error);
      }
    };

    fetchNpcData();
  }, []);

  const handleNpcChange = (event) => {
    const selectedNpcName = event.target.value;
    const npc = npcData.find((npc) => npc.name === selectedNpcName);
    setSelectedNpc(npc);
  };

  return { npcData, selectedNpc, handleNpcChange };
};