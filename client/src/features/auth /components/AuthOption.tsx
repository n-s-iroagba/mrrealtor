import React from 'react'
import { useNavigate } from 'react-router-dom'
import googleLogo from '../../../features/common/assets/logo/blacklogo.png'
import '../styles/auth.styles.css'



const AuthOption: React.FC<{
    route: string;
    title: string;
    buttonText: string;
 
  }> = ({ route, title, buttonText, }) => {
    const navigate = useNavigate();
  
    return (
     
            <div className='w-100 d-flex flex-column align-items-center '>
              <p className='mt-3 W-50'>{title}</p>
              <div className="line-container">
              <div className="line"></div>
                <button onClick={() => navigate(`/${route}`)} className='authOption-button py-2 px-2'>
                  {buttonText}
                </button>
                <div className="line"></div>
                </div>
            </div>
        
    );
  };

  export const GoogleButton: React.FC = () => {

  
    return (
     
            <div className='w-100 d-flex flex-column align-items-center mb-5 '>
              <p className='mt-3 W-50'>Gain Access with Google.</p>
              <div className="line-container">
              <div className="line"></div>
               
                <button className='authOption-button'>
                  <img className='w-100' src ={googleLogo} alt='google-icon'/>
                </button>
                
                <div className="line"></div>
                </div>
            </div>
        
    );
  };

  export default  AuthOption
