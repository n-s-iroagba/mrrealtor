import React from 'react';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  messages: Array<{ id: string; sender: string; content: string; timestamp: string; }>;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div className="chat-window">
      {messages.map(message => (
        <MessageBubble key={message.id} {...message} />
      ))}
    </div>
  );
};

export default ChatWindow;
