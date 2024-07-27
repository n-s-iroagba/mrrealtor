import { Col, Row } from 'react-bootstrap';
import '../styles/profile.styles.css';

interface UserDetailsProps {
  firstname: string;
  surname: string;
  phoneNumber: string;
  state: string;
  lga: string;
  district: string;
}

const RealtorDetails: React.FC<UserDetailsProps> = ({
  firstname,
  surname,
  phoneNumber,
  state,
  lga,
  district
}) => {
  return (
    <Row className="container justify-content-center mt-4">
      <Col xs={12} md={6} lg={4} className="user-detail d-md-flex flex-md-column align-items-md-center">
        <label>Name:</label>
        <div>{firstname} {surname}</div>
      </Col>
      <Col xs={12} md={6} lg={4} className="user-detail d-md-flex flex-md-column align-items-md-center">
        <label>Phone Number:</label>
        <div>{phoneNumber}</div>
      </Col>
      <Col xs={12} md={6} lg={4} className="user-detail d-md-flex flex-md-column align-items-md-center">
        <label>State:</label>
        <div>{state}</div>
      </Col>
      <Col xs={12} md={6} lg={4} className="user-detail d-md-flex flex-md-column align-items-md-center">
        <label>LGA:</label>
        <div>{lga}</div>
      </Col>
      <Col xs={12} md={6} lg={4} className="user-detail d-md-flex flex-md-column align-items-md-center">
        <label>District:</label>
        <div>{district}</div>
      </Col>
    </Row>
  );
};

export default RealtorDetails;
