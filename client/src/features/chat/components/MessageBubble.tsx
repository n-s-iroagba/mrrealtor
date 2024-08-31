import React from 'react';
import '../styles/chat.styles.css';

interface MessageBubbleProps {
  sender: string;
  content: string;
  timestamp: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ sender, content, timestamp }) => {
  const isSentByCurrentUser = sender === 'me'; // Replace 'me' with actual user logic

  return (
    <div className={`message-bubble ${isSentByCurrentUser ? 'sent' : 'received'}`}>
      <div className="message-content">{content}</div>
      <div className="message-timestamp">{timestamp}</div>
    </div>
  );
};

export default MessageBubble;
