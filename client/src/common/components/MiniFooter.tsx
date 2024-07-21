import React from 'react'

import '../styles/common.styles.css'
import { companyName } from '../../constants/constants';

const MiniFooter: React.FC<{ primaryVariant?: boolean }> = ({ primaryVariant }) => {
    const baseClassName = 'border-0 border-top text-center w-100 mini-footer mx-5';
    const lightClassName = 'text-light';
    const darkClassName = 'text-dark border-black';
  
    const classNames = `${baseClassName} ${primaryVariant ? lightClassName : darkClassName}`;
  
    return (
      <>
        <footer className={classNames}><p>{companyName} &copy;2024</p></footer>
      </>
    );
 };
export default MiniFooter