import React from 'react'

import '../styles/common.styles.css'
import { companyName } from '../../constants/constants';


const MiniFooter: React.FC = () => {
 
  
    return (
      <>
        <footer className='border-0 border-top text-center w-100 mini-footer mx-5  border-black'><p>{companyName} &copy;2024</p></footer>
      </>
    );
 };
export default MiniFooter