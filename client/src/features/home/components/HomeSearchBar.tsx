import React, { useState } from 'react';
import { InputGroup, FormControl, Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';

const options = [
  { label: 'Sell', route: '/sell' },
  { label: 'Buy', route: '/buy' },
  { label: 'Rent', route: '/rent' },
  { label: 'Lease', route: '/lease' },
];

const HomeSearchBar: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (route: string) => {
    navigate(route)
  };

  const renderTooltip = (props: any) => (
    <Tooltip id="options-tooltip" {...props}>
      <div className="d-flex flex-column">
        {options.map((option) => (
          <Button
            key={option.label}
            variant="link"
            onClick={() => handleOptionClick(option.route)}
            className="text-start"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </Tooltip>
  );

  return (
    <InputGroup>
      <OverlayTrigger
        placement="bottom"
        show={showTooltip}
        overlay={renderTooltip}
      >
        <FormControl
          placeholder="Search..."
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
        />
      </OverlayTrigger>
    </InputGroup>
  );
};

export default HomeSearchBar;
