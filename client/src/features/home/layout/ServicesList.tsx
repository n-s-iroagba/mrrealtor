import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import '../styles/home.styles.css'
import rentImage from '../assets/serviceListImages/serviceRent.png'
import advertImage from '../assets/serviceListImages/serviceAdvertise.png'
import buyImage from '../assets/serviceListImages/serviceBuy.png'
import { useNavigate } from 'react-router-dom';
import { CommercialPurpose } from '../../common/types/commonTypes';

const ServiceList = () => {
  const navigate = useNavigate()
    const data = [
        {
          id: 1,
          image:advertImage ,
          title: 'Advertise Properties',
          text: `Maximize your real estate listings with our platform!
           Reach a vast audience and ensure your properties stand out with targeted marketing and professional photography. 
          Advertise with us and see the difference!`,
          path:'/dashboard',
          buttonText: 'Advertise Properties',
          fn:()=> navigate('/dashboard')
        },
        {
          id: 2,
          image: rentImage,
          title:'Rent a home',
          text: `Looking for a home without the commitment of buying? Renting offers flexibility and convenience.
           From cozy city apartments to spacious suburban houses, find your perfect rental today!!`,
           path:'/buildings/rent',
           buttonText:'Rent Properties',
           fn:()=> navigate(`/building/${CommercialPurpose.RENTAL}`)
        },
        {
          id: 3,
          image: buyImage,
          title:'Buy a property',
          text: `Invest in your future by buying a property today! 
          Whether you're a first-time buyer or seeking your forever home, we have diverse options to meet your needs.
           Start your journey to homeownership now!`,
           path:'/building/buy',
           buttonText:'Buy Properties',
           fn:()=> navigate(`/building/${CommercialPurpose.SALE}`)
        }
      ];
      
  return (
    <Row className='d-flex justify-content-center gx-5 px-3 service-bg py-5'>
    {data.map(item => (
      <Col key={item.id} xs={12} md={4} className='mb-4 d-flex justify-content-evenly flex-column align-items-center'>
        <Card className='text-center h-100 px-2 py-4'>
          <div className='w-100 d-flex justify-content-center'>
            <Card.Img src={item.image} className='img-fluid' style={{ maxHeight: '200px', objectFit: 'contain' }} />
          </div>
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.text}</Card.Text>
            <Button onClick={()=>item.fn()}className='bg-light border border-primary text-dark'>{item.buttonText}</Button>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
  );
};

export default ServiceList;
