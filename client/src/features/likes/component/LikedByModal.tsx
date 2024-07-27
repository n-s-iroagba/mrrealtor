// src/components/RealtorListModal.tsx
import React from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

interface Realtor {
    firstName: string;
    lastName: string;
}

interface RealtorListModalProps {
    show: boolean;
    onHide: () => void;
    likedBy: Realtor[];
}

const LikedByModal: React.FC<RealtorListModalProps> = ({ show, onHide, likedBy }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Liked By Realtors</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup variant="flush">
                    {likedBy.map((realtor, index) => (
                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                            <div>
                                {realtor.firstName} {realtor.lastName}
                            </div>
                            <Button variant="primary">Chat</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Modal.Body>
        </Modal>
    );
};

export default  LikedByModal;
