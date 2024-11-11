export default function ChatBubble({ messages }) {
  return (
    <>
      {messages.map((msg, index) => (
        <div key={index} className={`chat ${msg.position}`}>
          <div className="chat-bubble">{msg.text}</div>
        </div>
      ))}
    </>
  );
}
