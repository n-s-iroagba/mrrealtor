import React from 'react'
import '../styles/common.styles.css'
const Logo:React.FC<{logoImage:any}> = ({logoImage}) =>{
    return(
        <div>
          <img className='logo' src={logoImage} alt='mr.realtorlogo'/>
        </div>
    )
}
export default Logo 

