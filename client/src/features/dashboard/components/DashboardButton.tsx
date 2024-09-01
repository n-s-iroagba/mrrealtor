import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.styles.css'

const DashboardButton : React.FC<{icon:any,label:string,path:string}> = ({icon,label,path})=>{
        const navigate = useNavigate()
        return<button
        onClick={() => navigate( path)}
        className="dashboard-button d-flex py-4 align-items-center justify-content-evenly flex-column"
       
      >
        <FontAwesomeIcon icon={icon} className='mb-2'/> {/* Adjust the size as needed */}
        {label.split(' ').map((word, index) => (
          <small key={index} className='small-font'>
            {word}
          </small>
        ))}
      </button>
  

}
export default DashboardButton