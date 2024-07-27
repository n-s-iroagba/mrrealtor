import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

interface ImageCarouselProps {
  images: string[];
  shouldslide?: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images,shouldslide }) => {
  return (
    <Carousel slide={shouldslide}>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <Image src={image} alt='property' fluid />
          <Carousel.Caption>
            <p>Property Image {index + 1} of {images.length}</p>
          </Carousel.Caption> 
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;

        
