import React, { useState } from 'react';
import { InputGroup, FormControl, Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';

const options = [
  { label: 'Sell', route: '/dashboard' },
  { label: 'Buy', route: '/building/sale' },
  { label: 'Rent', route: '/building/rent' },
  { label: 'Lease', route: '/dashboard' },
];

const HomeSearchBar: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (route: string):any => {
    navigate(route)
  };

  const renderTooltip = (props: any) => (
    <Tooltip className='bg-light' id="options-tooltip" {...props}>
      <div className="d-flex flex-column bg-light">
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
          placeholder="What do you want to do?"
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
        />
      </OverlayTrigger>
    </InputGroup>
  );
};

export default HomeSearchBar;
