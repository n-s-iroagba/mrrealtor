import React from 'react'
import ListingCategoryCard from '../components/ListingCategoryCard'
import { Col, Row } from 'react-bootstrap'

const ListingCategory:React.FC = ()=>{
    const numberOfNewListing = 1
    const numberOfProperties = 60
    const  numberOfRecentlySold =2
    const lands = 500
    const closestLocation = 'PortHarcourt, Nigeria'
    return (
        <div className='categoryList-padding px-5 pb-4s'>
            <h2>Browse Houses in {closestLocation}.</h2>
            <Row className='gy-3 gx-5'>
            <Col xs={12} md={6} lg={3}>
            <ListingCategoryCard stylingClassName = {'firstListingCard'} title={'New Listing'} numberOfProperties = { numberOfNewListing}/>
            </Col> 
            <Col xs={12} md={6} lg={3}>
            <ListingCategoryCard stylingClassName = {'secondListingCard'} title={'Best Offers'} numberOfProperties = {numberOfProperties}/>
            </Col> 
            <Col xs={12} md={6} lg={3}>
            <ListingCategoryCard stylingClassName = {'thirdListingCard'} title={'Recently Sold'} numberOfProperties = { numberOfRecentlySold}/>
            </Col> 
            <Col xs={12} md={6} lg={3}>
            <ListingCategoryCard stylingClassName = {'fourthListingCard'} title={'Land'} numberOfProperties = {lands}/>
            </Col> 

            </Row>
        </div>
    )
}
export default ListingCategory