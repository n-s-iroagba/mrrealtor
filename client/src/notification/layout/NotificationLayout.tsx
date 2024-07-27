import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import NotificationsModal from '../components/NotifcationsModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import '../styles/notification.styles.css'



const recipientId = 1; // Example recipientId, replace with actual value

const NotificationLayout: React.FC = () => {
  // const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(true);
  const notifications:any = [
    {
      id: 1,
      message: "You have an upcoming appointment on July 30, 2024.",
      type: "appointment",
      isRead: false,
      recipientId: 1,
      relatedPropertyId: null,
      relatedLandId: null,
      createdAt: "2024-07-25T08:00:00Z",
    },
    {
      id: 2,
      message: "Your property in district 5 was liked by a client.",
      type: "like",
      isRead: false,
      recipientId: 1,
      relatedPropertyId: 101,
      relatedLandId: null,
      createdAt: "2024-07-26T10:00:00Z",
    },
    {
      id: 3,
      message: "Your land in district 8 was liked by a client.",
      type: "like",
      isRead: true,
      recipientId: 1,
      relatedPropertyId: null,
      relatedLandId: 202,
      createdAt: "2024-07-27T12:00:00Z",
    },
    {
      id: 4,
      message: "You have an upcoming appointment on August 1, 2024.",
      type: "appointment",
      isRead: false,
      recipientId: 2,
      relatedPropertyId: null,
      relatedLandId: null,
      createdAt: "2024-07-27T09:00:00Z",
    },
  ]
  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     const fetchedNotifications = await getNotificationsByRecipientId(recipientId);
  //     setNotifications(fetchedNotifications);
  //     const unreadCount = fetchedNotifications.filter(notification => !notification.open)
  //     setUnreadCount(unreadCount);
  //   };

  //   fetchNotifications();
  // }, []);

  const handleClose = async () => {
  
    // setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
    setUnreadCount(0);
    setShowModal(false);
  };

  return (
    <>
      <button className='round-button' onClick={() => setShowModal(true)}>
      <FontAwesomeIcon icon={faBell} className='icon' /> ({unreadCount})
      </button>
      <NotificationsModal
        show={showModal}
        handleClose={handleClose}
        notifications={notifications}
      />
    </>
  );
};

export default NotificationLayout;
