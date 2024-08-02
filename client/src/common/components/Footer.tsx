import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTiktok, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { companySupportEmail, companySupportPhoneNumber } from '../../constants/constants';
import { companyFacebookLink, companyTwitterLink, companyInstagramLink, companyTiktokLink } from '../../constants/urls';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-dark pt-4 px-3">
      <Container>
        <Row className="text-center text-md-left">
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase mb-4 font-weight-bold">Mr Realtor</h5>
            <p>Your trusted partner in finding your dream real estate property in Nigeria.</p>
          </Col>
          <Col md={4} className="mb-4">
            <h5 className="text-uppercase mb-4 font-weight-bold">Contact Us</h5>
            <ul className="list-unstyled">
              <li><FontAwesomeIcon icon ={faEnvelope}/>  {companySupportEmail}</li>
              <li><FontAwesomeIcon icon ={faPhone}/>  {companySupportPhoneNumber}</li>
            </ul>
          </Col>
          <Col md={3} className="mb-4">
            <h5 className="text-uppercase mb-4 font-weight-bold">Follow Us</h5>
            <ul className="list-unstyled d-flex justify-content-around">
              <li><a target="_blank" href={`https://${companyFacebookLink}`} className="text-dark" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} size="2x" /></a></li>
              <li><a target="_blank" href={`https://${companyTwitterLink}`} className="text-dark" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} size="2x" /></a></li>
              <li><a target="_blank" href={`https://${companyInstagramLink}`} className="text-dark" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} size="2x" /></a></li>
              <li><a target="_blank" href={`https://${companyTiktokLink}`} className="text-dark" rel="noreferrer"><FontAwesomeIcon icon={faTiktok} size="2x" /></a></li>
            </ul>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <p className="text-muted">&copy; {new Date().getFullYear()} MrRealtor Nigeria. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
