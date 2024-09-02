import React from 'react'
import ListingCategoryCard from '../components/ListingCategoryCard'
import { Col, Row } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'
import { CommercialPurpose } from '../../common/types/commonTypes'

const ListingCategory:React.FC<{city:string}> = ({city})=>{
    const navigate = useNavigate();
    const numberLandListing = 1
    const numberOfBuildingsForSaleListing = 60
    const numberOfBuildingsForRentListing =2
    const navigateToBuildingSearch = (commercialPurpose:CommercialPurpose) => {
        navigate(`/building/${commercialPurpose}`)
      }
      const navigateToLandSearch = () => {
        navigate(`/land/${CommercialPurpose.SALE}`)
      }
   
   
    return (
        <div className='categoryList-padding px-3 pb-4'>
            <h2>Browse Houses in {city}.</h2>
            <Row className='gy-3 gx-5 d-flex justify-content-center'>
            <Col onClick={()=>navigateToLandSearch()} xs={12} md={4}>
            <ListingCategoryCard stylingClassName = {'firstListingCard'} title={`Land Sales Listings `} numberOfProperties = { numberLandListing}/>
            </Col> 
            <Col onClick={()=>navigateToBuildingSearch(CommercialPurpose.SALE)} xs={12} md={4}>
            <ListingCategoryCard stylingClassName = {'secondListingCard'} title={'Building Sales Listings'} numberOfProperties = {numberOfBuildingsForSaleListing}/>
            </Col> 
            <Col onClick={()=>navigateToBuildingSearch(CommercialPurpose.RENTAL)} xs={12} md={4}>
            <ListingCategoryCard stylingClassName = {'thirdListingCard'} title={'Rental Building Listings'} numberOfProperties =  {numberOfBuildingsForRentListing}/>
            </Col> 

            </Row>
        </div>
    )
}
export default ListingCategory