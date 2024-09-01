import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatInput, { FirstChatInput } from '../../features/chat/components/ChatInput';
import ChatWindow from '../../features/chat/components/ChatWindow';

const ChatPage: React.FC = () => {
  // Extract posterId and district from URL parameters
  const { posterId, district } = useParams<{ posterId: string; district: string }>();

  // Initialize chat messages (this is just an example, you may fetch these from an API)
  const [messages, setMessages] = useState([
    { id: '1', sender: 'John Doe', content: 'Hello!', timestamp: '10:00 AM' },
    { id: '2', sender: 'me', content: 'Hi John!', timestamp: '10:01 AM' },
  ]);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { id: String(messages.length + 1), sender: 'me', content: message, timestamp: 'now' }]);
  };

  useEffect(() => {
    // You can use posterId and district here to fetch data or perform actions
    console.log('Poster ID:', posterId);
    console.log('District:', district);
  }, [posterId, district]);

  return (
    <div className="app">
      <ChatWindow messages={messages} />
      {messages.length > 0 ? (
        <ChatInput onSendMessage={handleSendMessage} />
      ) : (
        <FirstChatInput onSendMessage={handleSendMessage} firstMessage="" />
      )}
    </div>
  );
};

export default ChatPage;
