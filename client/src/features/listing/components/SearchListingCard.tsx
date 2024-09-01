import { faHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import "../styles/listing.styles.css";
import { ContactRealtorButton, ViewBuildingButton } from "./Buttons";
import { BuildingDTO } from "../types/dto";
import { daysFromToday, numberWithCommas } from "../../../common/utils/utils";
import axios from 'axios';

const SearchListingCard: React.FC<{ data: BuildingDTO; clientId: number }> = ({
  data,
  clientId,
}) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Check if the building is liked by the realtor when the component mounts
    const checkIfLiked = async () => {
      try {
        const response = await axios.get(`/api/realtors/${clientId}/likes/${data.id}`);
        if (response.data.liked) {
          setLiked(true);
        }
      } catch (error) {
        console.error("Error checking if building is liked", error);
      }
    };

    checkIfLiked();
  }, [clientId, data.id]);

  const toggleLikeBuilding = async (buildingId: number) => {
    try {
      if (liked) {
        // Unlike the building
        const response = await axios.delete(`/api/realtors/${clientId}/likes/${buildingId}`);
        if (response.status === 200) {
          setLiked(false);
        }
      } else {
        // Like the building
        const response = await axios.post(`/api/realtors/${clientId}/likes`, { buildingId });
        if (response.status === 200) {
          setLiked(true);
        }
      }
    } catch (error) {
      console.error(`Error ${liked ? 'unliking' : 'liking'} the building`, error);
    }
  };

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
          onClick={() => toggleLikeBuilding(data.id)}
        />
      </div>

      <Card.Title className="mt-1">
        N{numberWithCommas(data.price)} per year
      </Card.Title>
      <Card.Text>
        {data.numberOfRooms} Bedroom | {data.propertyType} | {data.bestAmenity}{" "}
        | {data.otherAmenity} |
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
          <ContactRealtorButton backgroundColor={"bg-primary"} posterId={data.posterId} clientId={0} district={data.district} />
        </Col>
      </Row>
    </Card>
  );
};

export default SearchListingCard;
