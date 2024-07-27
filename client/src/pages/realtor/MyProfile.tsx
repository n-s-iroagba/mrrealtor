import { faCamera, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import './styles/pages.realtor.css';
import profilepic from '../../assets/logo/blacklogo.png';
import RealtorDetails from '../../features/profile/layout/RealtorDetails';

const MyProfile: React.FC = () => {
  const [showPictureModal, setShowPictureModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const handlePictureModalClose = () => setShowPictureModal(false);
  const handlePictureModalShow = () => setShowPictureModal(true);

  const handleEditFormClose = () => setShowEditForm(false);
  const handleEditFormShow = () => setShowEditForm(true);

  const realtor = {
    firstname: 'John',
    surname: 'Doe',
    phoneNumber: '+1234567890',
    state: 'California',
    lga: 'Los Angeles',
    district: 'Downtown',
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <div className="profile-picture-container">
            <img
              src={profilepic}
              alt="Profile"
            />
            <FontAwesomeIcon
              icon={faCamera}
              className="camera-icon"
              onClick={handlePictureModalShow}
            />
          </div>
          <div className="button-container">
            <Button variant="primary" onClick={handleEditFormShow}>
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit Profile
            </Button>
          </div>
        </Col>
      </Row>
      <RealtorDetails {...realtor} />

      {/* Modal for Picture Upload/Delete */}
      <Modal show={showPictureModal} onHide={handlePictureModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-3 border py-3 px-2 border-dark'>
            <Form.Label>Select New Profile Picture</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              required
            />
            <Button variant="primary" className="mt-2">
              Upload
            </Button>
          </div>
          <Button variant="danger" className="mr-2">
            Delete Picture
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePictureModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for Editing Profile */}
      <Modal show={showEditForm} onHide={handleEditFormClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter your phone number" />
            </Form.Group>
            {/* Add other form fields as needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditFormClose}>
            Cancel
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyProfile;
