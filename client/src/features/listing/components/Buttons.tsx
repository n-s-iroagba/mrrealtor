import React from 'react';
import '../styles/listing.styles.css'
import { BuildingDTO } from '../types/dto';
import { viewBuildingKey } from '../../../constants/tokenKeys';
import { useNavigate } from 'react-router-dom';



export const ContactRealtorButton:React.FC<{backgroundColor:string}> = ({ backgroundColor}) => {
  return (
    <button className={`w-100 contact-button px-3 d-flex justify-content-center py-2  ${backgroundColor}`}>
      <small className='small-font'>contact Agent</small>
    </button>
  );
};


export const CopyLinkButton:React.FC = () => {
  return (
    <button className='share-button text-dark'>
      Share property link
    </button>
  );
};

export const ViewBuildingButton:React.FC<{data:BuildingDTO}> = ({data}) => {
const navigate = useNavigate()
const goToView = ()=>{
  localStorage.setItem(viewBuildingKey,JSON.stringify(data))
  navigate('/buildings/1')
}
  return (
    <button onClick={()=>goToView()} className={`w-100 contact-button px-3 d-flex justify-content-center py-2 bg-primary`}>
     <small className='small-font'> More Details</small>
    </button>
  );
};