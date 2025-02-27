import { useEffect, useRef, useState } from "react";
import { useBot } from "./utils/useBot";

export default function ChatApp() {
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");

  // Ottiene la funzione mutate dal custom hook useBot
  const { mutate } = useBot();

  const sendMessage = (e) => {
    e.preventDefault(); // funzione che serve per evitare il reload della pagina all'onSubmit del form

    if (!input.trim()) return;

    const newMessage = {
      text: input,
      isUser: true,
    };

    setChatHistory([...chatHistory, newMessage]); // set serve per cambiare il valore di uno stato associato
    setInput(""); // clearing input field  // ... spread operetor

    mutate().then((newData) => {
      if (newData) {
        setChatHistory((prev) => [
          ...prev,
          { text: newData.response, isUser: false },
        ]);
      } // serve per richiamare il fetch
    });
  };

  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current.scrollIntoView();
  }, [chatHistory]);

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <div className="h-64 overflow-y-auto p-2 rounded-lg bg-gray-100">
        {chatHistory.map((msg, index) => (
          <div
            key={index} // serve per evitare errori non bloccanti in console
            className={`p-2 my-1 rounded-lg shadow-md max-w-[75%] ${
              msg.isUser
                ? "bg-purple-500 text-white ml-auto"
                : "bg-white text-black mr-auto"
            }`} // msg = oggetto , sender è la chiave , sent è il valore della chiave
          >
            {msg.text}
          </div>
        ))}

        <div ref={lastMessageRef}></div>
      </div>
      <form
        className="mt-2 flex shadow-md rounded-lg overflow-hidden"
        onSubmit={(e) => sendMessage(e)} // serve per inviare il form a cui passiamo un event
      >
        <input
          type="text"
          className="flex-1 p-2 border-none focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)} // (e) = event
        />
        <button type="submit" className="px-4 py-2 bg-purple-500 text-white">
          Send
        </button>
      </form>
    </div>
  );
}
