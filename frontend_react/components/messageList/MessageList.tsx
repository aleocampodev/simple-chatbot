import { FC , useState} from 'react';
import { ChatMessage } from '@/types/messageList';
import styles from './messageList.module.css'; //*hi

const chats: ChatMessage[]= [
    {
      sender: "user",
      message: "Describe the Lacy Dog breed",
    },
    {
      sender: "bot",
      message: "The Lacy Dog, also known as the Texas Lacy, is a breed of working dog that originated in Texas, USA. It was developed in the mid-19th century by the Lacy family, who were ranchers and cattlemen. The breed was created by crossing various herding and hunting dogs, including Greyhounds, Beagles, and Collies, to produce a versatile and hardworking dog suited for herding livestock and hunting game."
    },
    {
      sender: "user",
      message: "Describe the Border Collie breed",
    },
    {
      sender: "bot",
      message: "The Border Collie is a highly intelligent and energetic breed of herding dog that originated in the border region between England and Scotland. Known for their exceptional work ethic, agility, and trainability, Border Collies are often considered one of the most intelligent dog breeds in the world. They are medium-sized dogs with a well-proportioned body, typically weighing between 30 to 45 pounds (14 to 20 kg) and standing about 18 to 22 inches (46 to 56 cm) tall at the shoulder."
    }
  ]

const MessageList: FC = () => {
  const [userMessage, setUserMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(chats);


  const sendMessage = async ():Promise<void> => {
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", message: userMessage },
      { sender: "bot", message: "This is a placeholder response from the bot." }
    ]);
    setUserMessage("");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Chat with GPT</h1>
      <div className={styles.chatBox}>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`${styles.message} ${
              chat.sender === "user"
                ? styles.userMessage
                : styles.botMessage
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
        <button onClick={sendMessage}  className={styles.sendButton}>Send</button >
      </div>
    </div>
  ); 
};

export default MessageList;
