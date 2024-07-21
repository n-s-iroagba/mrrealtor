import {  faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Card, Image } from 'react-bootstrap';
import '../styles/listing.styles.css'


const SearchListingCard:React.FC<{propertyType:string,numberOfRooms?:number,address:string,bestAmmenity:string,otherAmmenity:string,cost:number,image:any}> = ({
    propertyType,
    numberOfRooms,
    address,
    bestAmmenity,
    otherAmmenity,
    cost,
    image
}) =>{
return<div><Card  className=' px-2 pt-2'>
<Image src={image}/>
<Card.Title className='mt-3'>N{cost} per year</Card.Title>
<Card.Title>{numberOfRooms} {propertyType} | {bestAmmenity} | {otherAmmenity}</Card.Title>
<div className='d-flex justify-content-between pb-3'>
    <div>
        <FontAwesomeIcon className='listing-icon' icon= {faLocationDot}/>{'  '}
        {address}

    </div>
    <button className='listing-button px-2'>contact agent</button>
</div>
</Card>
</div>

}
export default SearchListingCard