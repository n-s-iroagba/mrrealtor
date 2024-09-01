import React from 'react'
import '../styles/common.styles.css'
import logoImage from '../assets/logo/blacklogo.png'
const Logo:React.FC = () =>{
    return(
        <div>
          <img className='logo' src={logoImage} alt='mr.realtorlogo'/>
        </div>
    )
}
export default Logo 

