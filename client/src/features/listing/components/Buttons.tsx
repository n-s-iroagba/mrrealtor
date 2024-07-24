import React from 'react';
import '../styles/listing.styles.css'



export const ContactRealtorButton:React.FC<{backgroundColor:string}> = ({ backgroundColor}) => {
  return (
    <button className={`contact-button px-3 py-1 ${backgroundColor}`}>
      contact Agent
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
