import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateQuest = async (npc) => {
  const prompt = `
    Saya ingin kamu menjadi NPC seperti NPC berikut: ${JSON.stringify(npc)}.
    Buatlah beberapa quest unik dengan berbagai tingkat kesulitan berdasarkan deskripsi dan kepribadian NPC ini.
    Pastikan bahwa quest "Hard" muncul lebih jarang dibandingkan dengan quest dengan tingkat kesulitan "Easy" dan "Medium".
    Poin yang didapat adalah sebagai berikut: 
    - Easy: +2 poin 
    - Medium: +4 poin 
    - Hard: +15 poin.
    Hanya quest dengan tingkat kesulitan "Hard" yang mendapatkan achievement.

    Buat respons dalam format JSON seperti di bawah ini:
    [
      {
        "id": "1"
        "quest": {
          "title": "Judul quest",
          "description": "Deskripsi quest.",
          "difficulty": "Easy", // atau Medium
          "points": 2, // atau 4
          "achievement": null // untuk Easy dan Medium
        }
      },
      {
        "id": "2"
        "quest": {
          "title": "Judul quest Hard",
          "description": "Deskripsi quest Hard.",
          "difficulty": "Hard",
          "points": 15,
          "achievement": "Nama Achievement"
        }
      }
    ]
    Ingatlah untuk memastikan bahwa quest dengan tingkat kesulitan "Hard" tidak lebih dari 20% dari total quest yang dihasilkan.
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
