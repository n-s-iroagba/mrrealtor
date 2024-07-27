

import React from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle, faHouse, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import '../styles/listing.styles.css'
import { Accordion, Col, Row } from 'react-bootstrap';
import {ContactRealtorButton, CopyLinkButton} from '../components/Buttons';
import Line from '../components/Line';
import ImageCarousel from '../../../common/components/ImageCarousel';

// Example data
const images = [ 'image1.jpg', 'image2.jpg','image3.jpg'
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
     <ImageCarousel images={images}/>
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
