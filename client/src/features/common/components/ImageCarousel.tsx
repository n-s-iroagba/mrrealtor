// ImageCarousel.tsx
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import '../styles/common.styles.css';

interface ImageCarouselProps {
  images: string[];
  shouldslide?: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, shouldslide }) => {
  return (
    <Carousel slide={false}>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <Image className='carousel-image' src={image} alt='property' />
          <Carousel.Caption>
            <p>{index + 1} of {images.length}</p>
          </Carousel.Caption> 
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;


        
