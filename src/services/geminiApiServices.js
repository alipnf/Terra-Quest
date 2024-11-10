import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateQuest = async (npc, npcData) => {
  const prompt = `
  Anda adalah NPC bernama ${JSON.stringify(npc)} dengan karakteristik: ${JSON.stringify(npcData)}.
  Tugas Anda adalah membuat beberapa quest unik yang sesuai dengan dunia nyata (bumi) saat ini.
  
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
