import ChatBubble from "./ChatBubble";
import InputChat from "./InputChat";
import { useState, useEffect } from "react";
import { useQuestStore } from "../../stores/useQuestStore";
import { useShallow } from "zustand/react/shallow";
import { initializeChat } from "../../services/gemini/geminiApiServices";
import { useNavigate } from "react-router-dom";

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
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (npcData && selectedQuest && selectedNpc && !chat) {
      try {
        const newChat = initializeChat(npcData, selectedQuest, selectedNpc);
        setChat(newChat);
      } catch (error) {
        console.log(error);
        setShowErrorModal(true);
      }
    }
  }, [npcData, selectedQuest, selectedNpc, chat]);

  const handleSendMessage = async () => {
    if (input.trim() && chat) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { position: "chat-end", text: input },
      ]);

      try {
        const result = await chat.sendMessage(input);
        setInput("");
        setMessages((prevMessages) => [
          ...prevMessages,
          { position: "chat-start", text: result.response.text() },
        ]);
      } catch (error) {
        console.log(error);
        setShowErrorModal(true);
      }
    }
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
    navigate("/quest");
  };

  return (
    <>
      <div className="min-h-screen mb-9 mx-10 mt-9 flex flex-col gap-5 relative">
        <h2 className="text-center text-3xl font-bold mb-4">
          {selectedQuest?.quest?.title || "Quest Detail"}
        </h2>
        <ChatBubble messages={messages} setMessages={setMessages} />
      </div>
      <InputChat
        handleSendMessage={handleSendMessage}
        setInput={setInput}
        input={input}
      />
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-5">
          <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-gray-800">Informasi</h2>
            <p className="mt-2 text-gray-600">
              {selectedNpc
                ? `${selectedNpc} belum bisa menjawab sekarang, coba lagi nanti.`
                : "NPC belum bisa menjawab sekarang, coba lagi nanti."}
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={handleCloseModal}
                className="btn btn-primary btn-sm"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
}
