'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

let socket: Socket;

export default function Home() {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socketLoading();
  }, []);

  const socketLoading = async () => {
    socket = io('http://localhost:5000/');

    socket.on('message', (msg: string) => {
      if (msg !== message) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);
  };

  const handleSendMessage = () => {
    if (socket) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col gap-5 ">
      <h2 className="border-2 p-2 border-black rounded-2xl w-1/2 text-center bg-black text-white">
        Simple Chat
      </h2>
      <div className="w-1/2 h-3/4 border-4 border-black rounded-2xl flex-col flex justify-between">
        <ul className="pl-5">
          {messages.map((msg, id) => (
            <li key={id}>User: {msg}</li>
          ))}
        </ul>
        <div className="flex">
          <input
            type="text"
            className="w-full border-black outline-none pl-2 border-2"
            onChange={handleChange}
          />
          <button
            className=" border-l-2 w-1/5 border-black bg-black text-white"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
