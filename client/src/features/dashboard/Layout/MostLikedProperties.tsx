import React from 'react'
import '../styles/dashboard.styles.css'
import ImageCarousel from '../../../common/components/ImageCarousel'
import image1 from '../../../assets/logo/blacklogo.png'
import image2 from '../../../assets/logo/whitelogo.png'

const MostLikedProperties = () =>{
    const images = [image1,image2]
    return(
        <div>
            <h5 className='text-center mt-4'>Most Liked Properties</h5>
            <div className='line'></div>
            <ImageCarousel images={images} shouldslide/>
        </div>
    )
}
export default MostLikedProperties