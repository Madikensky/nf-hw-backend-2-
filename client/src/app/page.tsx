'use client';
import { useEffect } from 'react';
import { io } from 'socket.io-client';

export default function Home() {
  let socket;

  useEffect(() => {
    socketLoading();
  }, []);

  const socketLoading = async () => {
    socket = io('http://localhost:5000/');

    socket.on('connect', () => {
      console.log('connected');
    });
  };
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-5 bg-gray-800">
      <h2 className="border-2 p-2 border-black rounded-2xl w-1/2 text-center bg-black text-white">
        Simple Chat
      </h2>
      <div className="w-1/2 h-3/4 border-4 border-black rounded-2xl flex justify-end items-end">
        <input type="text" className="w-full border-black outline-none pl-2" />
        <button className=" border-l-2 w-1/5 border-black bg-black text-white">
          Send
        </button>
      </div>
    </div>
  );
}
