import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/listing.styles.css";
import { Accordion, Col, Row } from "react-bootstrap";
import { ContactRealtorButton, CopyLinkButton } from "../components/Buttons";

import ImageCarousel from "../../../common/components/ImageCarousel";
import Information from "../components/Information";

import { useNavigate } from "react-router-dom";
import { BuildingDTO } from "../types/dto";
import { numberWithCommas } from "../../../common/utils/utils";
import { assets } from "./mockAssets";

const BuildingDetails = () => {
  const navigate = useNavigate();


  // if (!building) {
  //   return null;
  // }

  const building = assets[0];

  return (
    <div className="px-2 pt-2">
      <Row>
        <Col lg={6}>
          <ImageCarousel images={building.images} />
        </Col>
        <Col lg={6}>
          <div className="mt-3">
            <strong>N{numberWithCommas(building.price)}</strong> per year
          </div>
          <div>
            <strong>{building.numberOfRooms} Bedroom </strong>|
            <strong> {building.buildingType} </strong> |{" "}
            <strong> {building.bestAmenity} </strong> |{" "}
            <strong>{building.otherAmenity} </strong>
          </div>
          <div className="d-flex justify-content-between pb-3">
            <div>
              <FontAwesomeIcon className="listing-icon" icon={faLocationDot} />{" "}
              <div>{building.firstLineAddress}</div>
              <div>{building.district}</div>
              <div>{building.localGovernmentArea}</div>
              <div>{building.state}</div>
            </div>
          </div>
          <Row>
            <Col lg={3} className=" pb-0">
              <Information
                title="Bedrooms"
                description={`${building.numberOfRooms} bedrooms`}
              />
            </Col>
            <Col lg={3} >
              <Information
                title="Bathrooms"
                description={`${building.numberOfRooms} bathrooms`}
              />
            </Col>
          </Row>
        
    
          <Row className="gx-3 my-4">
            <Col>
              <ContactRealtorButton backgroundColor={"bg-dark"} posterId={building.posterId} clientId={0} district={building.district} />
            </Col>
            <Col>
              <CopyLinkButton />
            </Col>
          </Row>

          <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="text-center">
              More Information About The Building
            </Accordion.Header>
            <Accordion.Body>
             <p>{building.salesPitch}</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </Col>
      </Row>

      <div>
       
      </div>
    </div>
  );
};

export default BuildingDetails;
