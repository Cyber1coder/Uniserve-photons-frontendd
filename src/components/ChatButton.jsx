import { useNavigate } from "react-router-dom";

function ChatButton() {
  const navigate = useNavigate();

  return (
    <button className="chat-btn" onClick={() => navigate("/chat")}>
      💬
    </button>
  );
}

export default ChatButton;
