import React from 'react';
import {  ListGroupItem, Badge,  } from 'react-bootstrap';

interface ChatItemProps {
  clientName: string;
  unreadMessagesCount: number;
  latestMessage: string;
}

// interface ChatListProps {
//   currentRealtorId: number;
// }

const ChatItem: React.FC<ChatItemProps> = ({ clientName, unreadMessagesCount, latestMessage }) => {
  return (
    <ListGroupItem className="d-flex justify-content-between align-items-center">
      <div>
        <strong>{clientName}</strong>
        <div>{latestMessage}</div>
      </div>
      {unreadMessagesCount > 0 && (
        <Badge bg="danger">{unreadMessagesCount}</Badge>
      )}
    </ListGroupItem>
  );
};
export default ChatItem;

