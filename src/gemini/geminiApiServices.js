import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateQuest = async (npc, npcData, quest) => {
  const prompt = `
  Anda adalah NPC bernama ${JSON.stringify(npc)} dengan karakteristik: ${JSON.stringify(npcData)}.
  Tugas Anda adalah membuat beberapa quest unik yang sesuai dengan dunia nyata (bumi) saat ini.
  buat unik dari id dan quest jangan samakan pada ${JSON.stringify(quest)}
  
  Instruksi:
  - Quest harus terkait dengan aktivitas atau tantangan yang mungkin ditemukan di lingkungan sehari-hari pada bumi, bukan dunia fantasi atau kebutuhan pribadi NPC.
  - Tingkat kesulitan terbagi menjadi "Easy", "Medium", dan "Hard".
  - Quest "Hard" harus lebih jarang muncul (maksimal 20% dari total quest).
  - Poin per tingkat kesulitan:
    - Easy: +2 poin
    - Medium: +4 poin
    - Hard: +15 poin, serta achievement.
  - Respons harus *hanya* dalam format JSON tanpa teks atau format tambahan.

  Contoh format JSON yang diinginkan:
  [
    {
      "id": "1",
      "quest": {
        "title": "Judul quest",
        "description": "Deskripsi quest terkait kegiatan di dunia nyata, seperti membantu seseorang, mengumpulkan bahan yang ada di lingkungan sekitar, atau menyelesaikan tugas umum.",
        "difficulty": "Easy",
        "points": 2,
        "achievement": null
      }
    },
    {
      "id": "2",
      "quest": {
        "title": "Judul quest Hard",
        "description": "Deskripsi quest Hard yang mengacu pada tantangan nyata di bumi, seperti menyelesaikan masalah lingkungan atau membantu komunitas.",
        "difficulty": "Hard",
        "points": 15,
        "achievement": "Nama Achievement"
      }
    }
  ]
`;

  try {
    const result = await model.generateContent(prompt);

    const cleanedResult = result.response
      .text()
      .replace(/```json/, "")
      .replace(/```/, "")
      .trim();
    return JSON.parse(cleanedResult);
  } catch (error) {
    console.error("Error generating quest:", error);
    throw error;
  }
};

export const initializeChat = (npcData, selectedQuest, selectedNpc) => {
  const questTitle = selectedQuest?.quest?.title || "quest tidak terdefinisi";
  const questDescription =
    selectedQuest?.quest?.description || "deskripsi quest tidak terdefinisi";

  const promptUser = `
  Anda adalah NPC bernama ${selectedNpc} dengan karakteristik: ${npcData}.
  anda akan memberikan jawaban sesuai deskripsi atau sifat anda yang ada di data diatas.
  anda sedang memberi quest berjudul "${questTitle}" dengan deskripsi seperti ini:
  "${questDescription}"

  saya akan tanyakan apa saja tentang quest ini, dan anda akan berusaha memberikan informasi yang kamu butuhkan. 
  Jika pertanyaan saya tidak terkait dengan konteksnya, anda tidak bisa memberikan jawaban.
`;

  const promptModel = `
  Halo, saya ${selectedNpc}. Ada yang bisa saya bantu tentang quest "${questTitle}"?
  Jangan ragu untuk bertanya, saya siap membantu dengan apa pun yang berhubungan dengan quest ini! 
  Jika pertanyaan kamu tidak terkait dengan konteksnya atau tidak berhubungan sama sekali dengan questTitle
  saya tidak bisa memberikan jawaban.
`;

  return model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `${promptUser}`,
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: `${promptModel}`,
          },
        ],
      },
    ],
  });
};
