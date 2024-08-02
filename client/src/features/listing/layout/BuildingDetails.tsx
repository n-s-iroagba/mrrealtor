import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDotCircle, faHouse, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import '../styles/listing.styles.css';
import { Accordion, Col, Row } from 'react-bootstrap';
import { ContactRealtorButton, CopyLinkButton } from '../components/Buttons';
import Line from '../components/Line';
import ImageCarousel from '../../../common/components/ImageCarousel';
import Information from '../components/Information';
import { viewBuildingKey } from '../../../constants/tokenKeys';
import { useNavigate } from 'react-router-dom';
import { BuildingDTO } from '../types/dto';
import { numberWithCommas } from '../../../common/utils/utils';

const BuildingDetails = () => {
  const navigate = useNavigate();
  let building: string | null = localStorage.getItem(viewBuildingKey);
  
  if (!building) {
    navigate('/dashboard');
    return null;
  }
  
  const temp: BuildingDTO = JSON.parse(building);
  
  return (
    <div className='px-2 pt-2'>
      <ImageCarousel images={temp.images} />
      <p>Available</p>
      <div className='mt-3'><strong>N{numberWithCommas(temp.price) }</strong> per year</div>
      <div>
        <strong>{temp.numberOfRooms} Bedroom </strong>|<strong> {temp.buildingType} </strong> | <strong> {temp.bestAmmenity} </strong> | <strong>{temp.otherAmmenity} </strong>
      </div>
      <div className='d-flex justify-content-between pb-3'>
        <div>
          <FontAwesomeIcon className='listing-icon' icon={faLocationDot} />{' '}
          <div>{temp.firstLineAddress}</div>
          <div>{temp.district}</div>
          <div>{temp.localGovernmentArea}</div>
          <div>{temp.state}</div>
        </div>
      </div>
      <Row>
        <Col lg={3} className='bg-danger pb-0'>
          <Information title='Bedrooms' description={`${temp.numberOfRooms} bedrooms`} />
        </Col>
        <Col lg={3} className='bg-warning'>
          <Information title='Bathrooms' description={`${temp.numberOfRooms} bathrooms`} />
        </Col>
      </Row>
      <ContactRealtorButton backgroundColor={'bg-dark'} />
      <CopyLinkButton />
      <div>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header className='text-center'>Building Details</Accordion.Header>
            <Accordion.Body>
              {temp.salesPitch}
              <h2>Bedrooms</h2>
              <Line />
              <div className='d-flex'>
                <FontAwesomeIcon icon={faDotCircle} />
                <p>{temp.numberOfRooms} bedrooms</p>
              </div>
              <h2>Bathrooms</h2>
              <Line />
              <Row>
                {temp.interiorDesignFeatures.map((feature: string, index: number) => (
                  <Col key={index} className="d-flex align-items-center mr-3">
                    <FontAwesomeIcon icon={faHouse} className="mr-1" />
                    <p className="mb-0">{feature.trim()}</p>
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <b><h6>Find Out More about this house</h6></b>
      </div>
    </div>
  );
}

export default BuildingDetails;
