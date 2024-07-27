import React from 'react';
import '../styles/chat.styles.css'
import { Container, ListGroup } from 'react-bootstrap';
import ChatItem from '../components/ChatItem';

interface ChatListProps {
  currentRealtorId: number;
}


const ChatList: React.FC<ChatListProps> = ({ currentRealtorId }) => {
  // const [chats, setChats] = useState<{ [key: string]: any[] }>({});

  // useEffect(() => {
  //   const loadChats = async () => {
  //     try {
  //       const data = await fetchChatsGroupedByLGA(currentRealtorId);
  //       setChats(data);
  //     } catch (error) {
  //       console.error('Error fetching chats:', error);
  //     }
  //   };

  //   loadChats();
  // }, [currentRealtorId]);

  // mockData.ts
const chats:any = {
  "LGA1": [
    {
      clientName: "Jane Doe",
      unreadMessagesCount: 5,
      latestMessage: "Looking forward to the property tour!",
      chat: {
        id: 1,
      }
    },
    {
      clientName: "Alice Smith",
      unreadMessagesCount: 2,
      latestMessage: "Could you send me more details?",
      chat: {
        id: 2,
        latestMessage: "Could you send me more details?"
      }
    }
  ],
  "LGA2": [
    {
      clientName: "John Smith",
      unreadMessagesCount: 3,
      latestMessage: "What’s the status of my application?",
      chat: {
        id: 3,
        latestMessage: "What’s the status of my application?"
      }
    },
    {
      clientName: "Emily Johnson",
      unreadMessagesCount: 1,
      latestMessage: "I’m interested in the property you showed me.",
      chat: {
        id: 4,
        latestMessage: "I’m interested in the property you showed me."
      }
    }
  ]
};


  return (
    <Container>
      {Object.keys(chats).map((lga) => (
        <div key={lga}>
          <h3>{lga}</h3>
          <ListGroup>
            {chats[lga].map((chat: any) => (
              <ChatItem
                key={chat.chat.id}
                clientName={chat.clientName}
                unreadMessagesCount={chat.unreadMessagesCount}
                latestMessage={chat.latestMessage}
              />
            ))}
          </ListGroup>
        </div>
      ))}
    </Container>
  );
};

export default ChatList;