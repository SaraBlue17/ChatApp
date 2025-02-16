import { useState } from "react";

export default function ChatApp() {
  const [chatHistory, setChatHistory] = useState([
    { text: "Hi!", sender: "received" },
    { text: "Hello?", sender: "sent" },
  ]);

  const [input, setInput] = useState("");
  const [isUserTurn, setIsUserTurn] = useState(true);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      text: input,
      sender: isUserTurn ? "sent" : "received",
    };
    setChatHistory([...chatHistory, newMessage]); // set serve per cambiare il valore di uno stato associato
    setInput(""); // ... è uno spread operetor 
    setIsUserTurn(!isUserTurn);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <div className="h-64 overflow-y-auto p-2 rounded-lg bg-gray-100">
        {chatHistory.map((msg, index) => (
          <div
            key={index} // serve per evitare errori non bloccanti in console
            className={`p-2 my-1 rounded-lg shadow-md max-w-[75%] ${
              msg.sender === "sent"
                ? "bg-purple-500 text-white ml-auto"
                : "bg-white text-black mr-auto"
            }`} // msg = oggetto , sender è la chiave , sent è il valore della chiave
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-2 flex shadow-md rounded-lg overflow-hidden">
        <input
          type="text"
          className="flex-1 p-2 border-none focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)} // (e) = event
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-purple-500 text-white"
        >
          Invia
        </button>
      </div>
    </div>
  );
}