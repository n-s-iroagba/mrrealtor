import { faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import "../styles/listing.styles.css";
import { ContactRealtorButton, ViewBuildingButton } from "./Buttons";
import { BuildingDTO } from "../types/dto";
import { daysFromToday, numberWithCommas } from "../../../common/utils/utils";

const SearchListingCard: React.FC<{ data: BuildingDTO }> = ({ data }) => {
  const liked = false;
  return (
    <Card className="px-3 pt-5 pb-4 h-100 search-listing-card shadow">
      <div className="card-image">
        <div className="days bg-primary text-light px-2">
          {daysFromToday(data.listingDate.toString())} days ago
        </div>
        <Image className="w-100 image" src={data.images[0]} />
        <FontAwesomeIcon
          className={`like-button ${
            liked ? "like-button-red" : "like-button-white"
          }`}
          size="2x"
          icon={faHeart}
        />
      </div>

      <Card.Title className="mt-1">
        N{numberWithCommas(data.price)} per year
      </Card.Title>
      <Card.Text>
        {data.numberOfRooms} Bedroom | {data.propertyType} | {data.bestAmmenity}{" "}
        | {data.otherAmmenity} |
      </Card.Text>
      <div className="d-flex justify-content-between mb-1 mt-auto">
        <div className="address-container">
          <FontAwesomeIcon className="listing-icon" icon={faLocationDot} />
          {"  "}
          {data.firstLineAddress}
        </div>
      </div>
      <Row className="d-flex justify-content-between mt-auto">
        <Col xs={6}>
          <ViewBuildingButton data={data} />
        </Col>
        <Col xs={6}>
          <ContactRealtorButton backgroundColor={"bg-primary"} />
        </Col>
      </Row>
    </Card>
  );
};

export default SearchListingCard;
