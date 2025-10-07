import { FC, useState } from "react";
import { ChatMessage } from "@/types/messageList";
import styles from "./messageList.module.css"; //*hi

const MessageList: FC = () => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendMessage = async (): Promise<void> => {
    if (!userMessage.trim()) return;
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setChatHistory((prev) => [
        ...prev,
        { sender: "user", message: userMessage },
        {
          sender: "bot",
          message: "This is a placeholder response from the bot.",
        },
      ]);
      setUserMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Chat with GPT</h1>
      <div className={styles.chatBox}>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              chat.sender === "user" ? styles.userMessage : styles.botMessage
            }`}
          >
            {chat.message}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          className={styles.input}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageList;
