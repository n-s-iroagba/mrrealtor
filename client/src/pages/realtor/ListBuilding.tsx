
import React from 'react';
import NewBuildingListingForm from '../../features/listing/layout/NewBuildingListingForm';
import Logo from '../../features/common/components/Logo';


const ListBuilding: React.FC = () => {
  return <div className='d-flex flex-column align-items-center'>
    <Logo/>
  <NewBuildingListingForm/>
  </div>;
};

export default ListBuilding;