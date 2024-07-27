import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const DashboardDropdown: React.FC = () => {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="icon-toggle">
        <FontAwesomeIcon icon={faUser} className='icon' />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="/profile">
          <FontAwesomeIcon icon={faUserCircle} className="me-2" />
          Profile
        </Dropdown.Item>
        <Dropdown.Item href="/logout">
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DashboardDropdown;
