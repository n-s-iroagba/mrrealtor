
import React from "react";
import { Card, } from "react-bootstrap";
import '../styles/home.styles.css'





export const ListingCategoryCard: React.FC<{stylingClassName:any, numberOfProperties:number,title:string}> = ({
 stylingClassName,
 numberOfProperties,
 title,
}) => {


  return (
<div>
    <Card className={`${stylingClassName} listingCard px-5`}>
      
         <div className="d-flex">
      
          <Card.Title className="text-center text-dark listingCardTitle">{title}</Card.Title>
          
        {numberOfProperties!==0 && <Card.Text className="listingCardCount text-dark" >{numberOfProperties}</Card.Text>}
        </div>
       
       
   
    </Card>
    </div>

  );
};


export default ListingCategoryCard;