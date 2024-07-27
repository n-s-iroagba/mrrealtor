import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

interface Notification {
  id: number;
  message: string;
  type: 'appointment' | 'like';
  isRead: boolean;
  recipientId: number;
  relatedPropertyId?: number | null;
  relatedLandId?: number | null;
  createdAt: string;
}

interface NotificationsModalProps {
  show: boolean;
  handleClose: () => void;
  notifications: Notification[];
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({ show, handleClose, notifications }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Notifications</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {notifications.map(notification => (
            <ListGroup.Item key={notification.id} className={notification.isRead ? '' : 'font-weight-bold'}>
              {notification.message}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotificationsModal;
