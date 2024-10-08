import React from 'react';
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../styles/common.styles.css'
import useIsLargeScreen from '../hooks/useIsLargeScreen';
import { CommercialPurpose } from '../types/commonTypes';
import Logo from './Logo';


const NavbarComponent: React.FC = () => {
  const [isIconDisplay, setIsIconDisplay] = useState<boolean>(true)


  const navigate = useNavigate()
  const isLargeScreen = useIsLargeScreen()

  const navLinks = [
    { path: `building/${CommercialPurpose.SALE}`, text: 'Buy' },
    { path: 'dashboard', text: 'Sell' },
    { path: `building/${CommercialPurpose.RENTAL}`, text: 'Rent' },
    { path: 'dashboard', text: 'Lease' },
  ];
  const handleToggele = () => {
    setIsIconDisplay(!isIconDisplay)
  }
  return (
    <Navbar
      onToggle={handleToggele}
      expand="lg"
      className={`bg-body-tertiary bg-light px-4 w-100`}
    >

      <Navbar.Brand><Logo/></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={`ms-auto d-flex justify-content-between align-items-center w-50 bg bg-light `}>
          <Nav.Link><div onClick={() => navigate('/signup')}><FontAwesomeIcon icon={faUser} /></div></Nav.Link>
          {navLinks.map((link, index) => (
        <React.Fragment key={index}>
          {isLargeScreen && index % 2 === 0 ? (
          
                <button onClick={()=>{
                 navigate(`/${link.path}`)
                }} className="curved-button px-5">
                {link.text}

              </button>

             
       
           
          ) : (
            <Nav.Link  onClick={()=>{
              navigate(`/${link.path}`)
             }} className="text-dark">
              {link.text}
            </Nav.Link>
          )}
        </React.Fragment>
      ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;