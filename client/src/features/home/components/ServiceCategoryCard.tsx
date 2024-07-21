
import React from "react";
import { Card, } from "react-bootstrap";
import '../styles/home.styles.css'





export const ServiceCategoryCard: React.FC<{ stylingClassName: any, numberOfProperties: number, title: string }> = ({
  stylingClassName,
  numberOfProperties,
  title,
}) => {


  return (
    <div>
      <Card className={`${stylingClassName} listingCard px-5`}>


        <Card.Title className="listingCardTitle">{title}</Card.Title>
        <Card.Text className="listingCardCount" >{numberOfProperties}</Card.Text>



      </Card>
    </div>

  );
};


export default ServiceCategoryCard;