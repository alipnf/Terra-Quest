import ChatBubble from "./ChatBubble";
import InputChat from "./InputChat";
import { useState, useEffect } from "react";
import { useQuestStore } from "../../stores/useQuestStore";
import { useShallow } from "zustand/react/shallow";
import { initializeChat } from "../../services/gemini/geminiApiServices";

export default function QuestDetail() {
  const { selectedNpc, npcData, selectedQuest } = useQuestStore(
    useShallow((state) => ({
      selectedNpc: state.selectedNpc,
      npcData: state.npcData,
      selectedQuest: state.selectedQuest,
    })),
  );

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState(null);

  useEffect(() => {
    if (npcData && selectedQuest && selectedNpc && !chat) {
      const newChat = initializeChat(npcData, selectedQuest, selectedNpc);
      setChat(newChat);
    }
  }, [npcData, selectedQuest, selectedNpc, chat]);

  const handleSendMessage = async () => {
    if (input.trim() && chat) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { position: "chat-end", text: input },
      ]);

      const result = await chat.sendMessage(input);

      setInput("");
      setMessages((prevMessages) => [
        ...prevMessages,
        { position: "chat-start", text: result.response.text() },
      ]);
    }
  };

  return (
    <>
      <div className="min-h-screen mb-9 mx-10 mt-9 flex flex-col gap-5 relative">
        <h2 className="text-center text-3xl font-bold mb-4">
          {selectedQuest.quest.title}
        </h2>
        <ChatBubble messages={messages} setMessages={setMessages} />
      </div>
      <InputChat
        handleSendMessage={handleSendMessage}
        setInput={setInput}
        input={input}
      />
    </>
  );
}
