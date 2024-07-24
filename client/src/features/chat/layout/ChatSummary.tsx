import React from 'react';
import '../styles/chat.styles.css'

// Message interface definition
export interface Message {
  id?: number;
  senderId: number;
  recipientId: number;
  message: string;
  timeStamp: Date;
  read: boolean;
}

// Sample messages data
export const messages: Message[] = [
  { id: 1, senderId: 1, recipientId: 2, message: 'Hello, Jane!', timeStamp: new Date(), read: true },
  { id: 2, senderId: 2, recipientId: 1, message: 'Hi, John! How are you?', timeStamp: new Date(), read: true },
  { id: 3, senderId: 1, recipientId: 2, message: 'I am good, thanks!', timeStamp: new Date(), read: false },
];

const getLastMessage = (userId: number): Message | undefined => {
  // Filter messages for the given user and get the latest one
  const userMessages = messages.filter(msg => msg.senderId === userId || msg.recipientId === userId);
  return userMessages.sort((a, b) => b.timeStamp.getTime() - a.timeStamp.getTime())[0];
};

const getUnreadCount = (userId: number): number => {
  // Count unread messages for the given user
  return messages.filter(msg => msg.recipientId === userId && !msg.read).length;
};

const ChatSummary: React.FC<{ userId: number }> = ({ userId }) => {
  const lastMessage = getLastMessage(userId);
  const unreadCount = getUnreadCount(userId);
  const messageText = lastMessage ? lastMessage.message : 'No messages';
  const tickOrCount = lastMessage?.read ? '✓' : unreadCount > 0 ? unreadCount : '';

  return (<>
{messages.map((msg,index)=>(
    <div className="chat-summary" key={msg.id}>
      <div className="message-preview">
        <span className="message-text">{msg.message}</span>
        <span className="message-status">{msg?.read ? '✓' : unreadCount > 0 ? unreadCount : ''}</span>
      </div>
    </div>))
}
</>
  );
};

export default ChatSummary;
