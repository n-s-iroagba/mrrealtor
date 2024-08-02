import React from "react";
import { Spinner } from "react-bootstrap";
import '../styles/common.styles.css'



const LoadingSpinner:React.FC<{primaryBackground?:boolean, fullheight?:boolean}> = ({fullheight}) =>{
  


    return <div className= {` w-100 d-flex justify-content-center flex-column align-items-center`}>
        
        <Spinner variant='dark'/>
        <p>Loading...</p>
        
    </div>
}
export default LoadingSpinner