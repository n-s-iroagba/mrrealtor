import React from 'react'
import SearchListingCard from '../components/SearchListingCard';
import { Col, Row } from 'react-bootstrap';
import image from '../../home/assets/images/firstListing.jpeg'
interface Room {
    propertyType: string;
    numberOfRooms?: number;
    address: string;
    bestAmmenity: string;
    otherAmmenity: string;
    cost: number;
    image: any;
}

const SearchListingLayout:React.FC = ()=>{
    const assets: Room[] = [
        {
            propertyType: "Single Room",
            address: "123 Main St",
            bestAmmenity: "Swimming pool",
            otherAmmenity: "Gym",
            cost: 1000,
            image:image
        },
        {
            propertyType: "Bedroom",
            numberOfRooms: 2,
            address: "456 Elm St",
            bestAmmenity: "Balcony",
            otherAmmenity: "Parking",
            cost: 1500,
            image:image
        },
        {
            propertyType: "Studio Room",
            address: "789 Oak Ave",
            bestAmmenity: "Roof terrace",
            otherAmmenity: "Laundry",
            cost: 800,
            image:image
        },
    ];
    return(
        <Row>
        {assets.map((asset, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
            <SearchListingCard  {...asset} />
            </Col>
        ))}
    </Row>
    )
}
export default SearchListingLayout