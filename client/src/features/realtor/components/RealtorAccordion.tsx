// src/components/RealtorAccordion.tsx
import React, { useState } from 'react';
import { Accordion, Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import profilepic from '../../../features/common/assets/logo/blacklogo.png'
import '../styles/realtor.styles.css'
interface Realtor {
  id: number;
  firstName: string;
  lastName: string;
  email:string;
  phoneNumber:string;
  state: string
  localGovernmentArea:string;
  district:string;
}

interface RealtorAccordionProps {
  realtors: Realtor[];
  onChat: (id: number) => void;
  onDelete: (id: number) => void;
  onBan: (id: number) => void;
  onViewListings: (id: number) => void;
  onViewPaidListings:(id: number)=>void;
  onViewLikes: (id: number) => void;
  onViewFutureAppointments: (id: number) => void;
  onViewPastAppointments: (id: number) => void;
}

const RealtorAccordion: React.FC<RealtorAccordionProps> = ({
  realtors,
  onChat,
  onDelete,
  onBan,
  onViewListings,
  onViewPaidListings,
  onViewLikes,
  onViewFutureAppointments,
  onViewPastAppointments
}) => {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredRealtors, setFilteredRealtors] = useState<Realtor[]>(realtors);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    console.log('value is'+searchTerm)
   

    const filtered = realtors.filter((realtor) =>
      realtor.firstName.toLowerCase().includes(value) || realtor.lastName.toLowerCase().includes(value)
    );

    setFilteredRealtors(filtered);
  };
  return (
    <>
    <InputGroup className="mb-3">
    <Form.Control
      type="text"
      placeholder="Search Realtors by first or last name only"
      value={searchTerm}
      onChange={handleSearch}
    />
    <Button variant="outline-secondary">
      Search
    </Button>
  </InputGroup>
    <Accordion>
      {filteredRealtors.map((realtor) => (
        <Card key={realtor.id}>
         <Accordion.Item eventKey="0">
        <Accordion.Header>{realtor.firstName} {realtor.lastName}</Accordion.Header>
        <Accordion.Body>
        <div className='d-flex justify-content-center'>
        <div className="d-flex justify-content-center realtor-picture">
      <img
        src={profilepic}
        alt="Profile"
        className="rounded-circle img-fluid"
      />
    </div>
    </div>
        <Card.Body>
              <Row className="container justify-content-center mt-4">
                <Col xs={12} md={6} lg={4} className="user-detail d-md-flex flex-md-column align-items-md-center mb-3">
                  <label><strong>First Name:</strong></label>
                  <div>{realtor.firstName}</div>
                </Col>
                <Col xs={12} md={6} lg={4} className="user-detail d-md-flex flex-md-column align-items-md-center mb-3">
                  <label><strong>Last Name:</strong></label>
                  <div>{realtor.lastName}</div>
                </Col>
                <Col xs={12} md={6} lg={4} className="user-detail d-md-flex flex-md-column align-items-md-center mb-3">
                  <label><strong>Email:</strong></label>
                  <div>{realtor.email}</div>
                </Col>
                <Col xs={12} md={6} lg={4} className="user-detail d-md-flex flex-md-column align-items-md-center mb-3">
                  <label><strong>Phone Number:</strong></label>
                  <div>{realtor.phoneNumber || 'N/A'}</div>
                </Col>
                <Col xs={12} md={6} lg={4} className="user-detail d-md-flex flex-md-column align-items-md-center mb-3">
                  <label><strong>State:</strong></label>
                  <div>{realtor.state}</div>
                </Col>
                <Col xs={12} md={6} lg={4} className="user-detail d-md-flex flex-md-column align-items-md-center mb-3">
                  <label><strong>LGA:</strong></label>
                  <div>{realtor.localGovernmentArea}</div>
                </Col>
                <Col xs={12} md={6} lg={4} className="user-detail d-md-flex flex-md-column align-items-md-center mb-3">
                  <label><strong>District:</strong></label>
                  <div>{realtor.district}</div>
                </Col>
              </Row>
              <Row className="d-flex flex-wrap justify-content-center mt-3">
              <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
                <Button variant="primary" className="w-100 h-100" onClick={() => onChat(realtor.id)}>Chat</Button>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
                <Button variant="danger" className="w-100 h-100" onClick={() => onDelete(realtor.id)}>Delete</Button>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
                <Button variant="warning" className="w-100 h-100" onClick={() => onBan(realtor.id)}>Ban</Button>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
                <Button variant="info" className="w-100 h-100" onClick={() => onViewListings(realtor.id)}>View Unpaid Listings</Button>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
                <Button variant="info" className="w-100 h-100" onClick={() => onViewPaidListings(realtor.id)}>View Paid Listings</Button>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
                <Button variant="info" className="w-100 h-100" onClick={() => onViewLikes(realtor.id)}>View Likes</Button>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
                <Button variant="info" className="w-100 h-100" onClick={() => onViewFutureAppointments(realtor.id)}>View Future Appointments</Button>
              </Col>
              <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
                <Button variant="info" className="w-100 h-100" onClick={() => onViewPastAppointments(realtor.id)}>View Past Appointments</Button>
              </Col>
            </Row>
            </Card.Body>
            </Accordion.Body>
          </Accordion.Item>
        </Card>
      ))}
    </Accordion>
    </>
  );
};

export default RealtorAccordion;

