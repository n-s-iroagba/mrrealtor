import React, { useState } from 'react';
import ChatInput from '../../features/chat/components/ChatInput';
import ChatWindow from '../../features/chat/components/ChatWindow';


const ChatPage: React.FC = () => {


  const [messages, setMessages] = useState([
    { id: '1', sender: 'John Doe', content: 'Hello!', timestamp: '10:00 AM' },
    { id: '2', sender: 'me', content: 'Hi John!', timestamp: '10:01 AM' },
  ]);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { id: String(messages.length + 1), sender: 'me', content: message, timestamp: 'now' }]);
  };

  return (
    <div className="app">

      { <ChatWindow messages={messages} />}
      { <ChatInput onSendMessage={handleSendMessage} />}
    </div>
  );
};

export default ChatPage;
