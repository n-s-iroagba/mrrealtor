import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../styles/chat.styles.css';
import { useParams } from 'react-router-dom';

const socket = io('http://localhost:4000');

// Define Message interface
export interface Message {
  id?: number;
  senderId: number;
  recipientId: number;
  message: string;
  timeStamp: Date;
}

const ChatLayout: React.FC = () => {
  const senderId = 1; // Assume senderId is 1; this should be dynamic in a real application
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [toUser, setToUser] = useState<number | string>('');
  const { recipientId } = useParams<{ recipientId: string }>();

  useEffect(() => {
    if (recipientId) {
      socket.emit('register', { id: senderId });

      socket.on('message', (message: string) => {
        const parsedMessage: Message = JSON.parse(message);
        setMessages((prevMessages) => [
          ...prevMessages,
          parsedMessage,
        ]);
      });

      console.log(socket.connected);

      return () => {
        socket.off('message');
      };
    }
  }, [senderId, recipientId]);

  const sendMessage = () => {
    if (input.trim() === '') return;

    const newMessage: Message = {
      senderId,
      recipientId: Number(recipientId),
      message: input,
      timeStamp: new Date(),
    };

    socket.emit('message', JSON.stringify(newMessage));
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.senderId === senderId ? 'sent' : 'received'}`}
          >
            {message.message}
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
        type="number"
        value={toUser}
        onChange={(e) => setToUser(e.target.value)}
        placeholder="Enter recipient user ID"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatLayout;

