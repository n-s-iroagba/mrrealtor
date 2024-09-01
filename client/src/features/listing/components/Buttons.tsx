import React from 'react';
import '../styles/listing.styles.css'
import { viewBuildingKey } from '../../../constants/tokenKeys';
import { useNavigate } from 'react-router-dom';
import { BuildingDTO } from '../types/responseDto';


interface ContactRealtorButtonProps {
  backgroundColor: string;
  posterId: number;
  clientId: number;
  district: string;
}

    export const ContactRealtorButton: React.FC<ContactRealtorButtonProps> = ({
  backgroundColor,
  posterId,
  clientId,
  district
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/chat/${posterId}/${district}`);
  };

  return (
    <button onClick={handleButtonClick} className={`w-100 contact-button px-3 ${backgroundColor}`}>
      <small>Contact Agent</small>
    </button>
  );
};

export default ContactRealtorButton;



export const CopyLinkButton:React.FC = () => {
  return (
    <button className='share-button text-dark w-100'>
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


