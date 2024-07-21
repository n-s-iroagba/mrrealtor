import React from 'react'
import { useNavigate } from 'react-router-dom'


export const AuthOption: React.FC<{
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
                <button onClick={() => navigate(`/${route}`)} className='authOption-button'>
                  <small>{buttonText}</small>
                </button>
                <div className="line"></div>
                </div>
            </div>
        
    );
  };

  export default  AuthOption
