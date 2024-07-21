import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import '../styles/common.styles.css'
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

import { socialMediaLink } from '../../constants/constants';











export const  SocialMediaButton:React.FC = ()=>{
  return<div>
    <a href={socialMediaLink}><FontAwesomeIcon icon={faInstagram}  beatFade/></a>
  </div>
}



