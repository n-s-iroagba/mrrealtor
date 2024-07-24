

import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle, faHouse, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import '../styles/listing.styles.css'
import { Accordion, Col, Row } from 'react-bootstrap';
import {ContactRealtorButton, CopyLinkButton} from '../components/Buttons';
import Line from '../components/Line';

// Example data
const images = [
  { src: 'image1.jpg', label: 'First slide label', caption: 'Nulla vitae elit libero, a pharetra augue mollis interdum.' },
  { src: 'image2.jpg', label: 'Second slide label', caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { src: 'image3.jpg', label: 'Third slide label', caption: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.' }
];

const cost = '500,000';
const numberOfRooms = 3;
const propertyType = 'Apartment';
const bestAmmenity = 'Swimming Pool';
const otherAmmenity = 'Gym';
const address = '1234 Main St, Springfield';

const Information:React.FC<{title:string,description:string}> = ({
    title,
    description
})=>{

    return (
        <Row className='d-flex align-items-center'>
       <Col xs={2}>
        <FontAwesomeIcon className='h-50' icon={faHouse}/>
       </Col>
     
        <Col xs={10}>
        <h6 className='mb-0'>{title}</h6>
    <p className='mb-0'>{description}</p>
    </Col>
       </Row>
    
    );
}

const ListingCarousel =()=>{
    const interiorDesignFeatures = [
        { icon: faDotCircle, text: `${1} bathrooms` },
        { icon: faDotCircle, text: `${numberOfRooms} rooms` },
        { icon: faDotCircle, text: `${bestAmmenity}` },
        { icon: faDotCircle, text: `${otherAmmenity}` },
    ]
        const salesPitch = 'hello world' 
      ;
  return (
    <div className='px-2 pt-2'>
      <Carousel slide={false}>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <Image src={image.src} alt={image.label} fluid />
            <Carousel.Caption>
              <h3>{image.label}</h3>
              <p>{image.caption}</p>
            </Carousel.Caption> 
          </Carousel.Item>
        ))}
      </Carousel>
       <p>*available </p>
      <div className='mt-3'>N{cost} per year</div>
      <div>{numberOfRooms} {propertyType} | {bestAmmenity} | {otherAmmenity}</div>
      <div className='d-flex justify-content-between pb-3'>
        <div>
          <FontAwesomeIcon className='listing-icon' icon={faLocationDot} />{' '}
          {address}
        </div>
       
      </div>
      <Row>
        <Col lg={3} className='bg-danger pb-0'>
        <Information title='Bedrooms' description={numberOfRooms+' bedrooms'}/>
        </Col>
        <Col  lg={3} className='bg-warning'>
        <Information title='Bathrooms' description={numberOfRooms+' bathrooms'}/>
        </Col>
        </Row>
        <ContactRealtorButton backgroundColor={'bg-dark'}/>
        <CopyLinkButton/>
      
  <div>
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header className='text-center'>Property Details</Accordion.Header>
        <Accordion.Body>
            {salesPitch}
            <h2>Bedrooms</h2>
          <Line/>
          <div className='d-flex'>
            <FontAwesomeIcon icon={faDotCircle}/>
            <p>{numberOfRooms} bedrooms</p>
          </div>
          <h2>Bathrooms</h2>
          <Line/>
          <Row>
          {interiorDesignFeatures.map((feature, index) => (
         
        <Col key={index} className="d-flex align-items-center mr-3">
            <FontAwesomeIcon icon={feature.icon} className="mr-1" />
            <p className="mb-0">{feature.text}</p>
          </Col>

        ))}
        </Row>
          
          

        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

<b><h6>Find Out More about this house </h6></b>
    </div>
    </div>
  );
}

export default ListingCarousel
