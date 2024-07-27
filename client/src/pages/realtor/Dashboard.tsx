// Dashboard.tsx
import React from 'react';


import DashboardButton from '../../features/dashboard/components/DashboardButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import logo  from '../../assets/logo/blacklogo.png'
import { Col, Row } from 'react-bootstrap';
import MostLikedProperties from '../../features/dashboard/Layout/MostLikedProperties';
import './styles/pages.realtor.css'
import NotificationLayout from '../../notification/layout/NotificationLayout';
import DashboardDropdown from '../../features/dashboard/components/DashboardDropdown';
const navItems = [


  { label: 'List  Property', path: '/list/building',icon: faUser },
  { label: 'List Lands', path: '/list/lands',icon: faUser },
  { label: 'Listed Building', path: '/listed/building',icon: faUser },
  { label: 'Listed Lands', path: '/listed/lands',icon: faUser },
  { label: 'Liked Building', path: '/liked/building',icon: faUser },
  { label: 'Liked Lands', path: '/liked/lands',icon: faUser },
  { label: 'Past Appointment', path: '/past-appointment',icon: faUser },
  { label: 'Future Appointment', path: '/future-appointment',icon: faUser },
  { label: 'Chats as Client', path: '/client-chat',icon: faEnvelope },
  { label: 'Chats as Realtor', path: '/realtor-chat',icon: faEnvelope},

];

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard px-3 pt-4">
   
   <Row className="d-flex justify-content-between align-items-center">
      <Col xs={4} className="d-flex justify-content-start">
       <NotificationLayout/>
      </Col>
      <Col xs={4} className="d-flex justify-content-center">
        <img className="w-100 h-100" src={logo} alt="logo" />
      </Col>
      <Col xs={4} className="d-flex justify-content-end">
      <DashboardDropdown/>
      </Col>
    </Row>
   
    <label className='text-center'>Actions</label>
        <Row className='gy-1 gx-1 d-flex justify-content-center '>

        {navItems.map((item, index) => (
          <Col xs={3}>
          <DashboardButton key={index} label={item.label} path={item.path} icon={item.icon} />
          </Col>
        ))}
    </Row>

    <MostLikedProperties/>
   
    </div>
  );
};

export default Dashboard;
