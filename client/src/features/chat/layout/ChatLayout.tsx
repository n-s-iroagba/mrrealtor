// src/components/Chat.tsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../styles/chat.styles.css';
import { Params, useParams } from 'react-router-dom';

const socket = io('http://localhost:4000');


interface Message {
  content: string;
  from: string;
}

const ChatLayout: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [toUser, setToUser] = useState<string>('');
  const { realtorId } = useParams<Params>();

  useEffect(() => {
    socket.emit('register', { id: realtorId });

    socket.on('message', (message: string) => {
      const parsedMessage = JSON.parse(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: parsedMessage.content, from: parsedMessage.from },
      ]);
    });
    console.log(socket.connected)

    return () => {
      socket.off('message');
    };
  }, [realtorId]);

  const sendMessage = () => {
    socket.emit('message', JSON.stringify({ type: 'message', to: toUser, content: input }));
    setMessages((prevMessages) => [...prevMessages, { content: input, from: 'You' }]);
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.from === 'You' ? 'sent' : 'received'}`}
          >
            {message.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your message"
      />
      <input
        type="text"
        value={toUser}
        onChange={(e) => setToUser(e.target.value)}
        placeholder="Enter recipient user ID"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatLayout;
