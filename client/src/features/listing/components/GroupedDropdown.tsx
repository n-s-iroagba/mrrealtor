
import React from 'react';
import { Dropdown, Row, Col } from 'react-bootstrap';
import { BuildingSearchOptions, State, LocalGovernmentArea, District } from '../../types/dtos';



interface GroupedDropdownProps {
  apartmentTypes: string[];
  selectedOptions:BuildingSearchOptions;
  states: State[];
  localGovernmentAreas: LocalGovernmentArea[];
  districts:District[]
  otherAmmenities:string[]
  bestAmmenities : string[]
  handleSelect: (key:string ,value: string|District ) => void;
  handlePriceChange: (key:string,value:number) => void;
  handleChangeState: (state:State) => void;
  handleChangeLocalGovernmentArea: (lga:LocalGovernmentArea) => void;
}

const GroupedDropdown: React.FC<GroupedDropdownProps> = ({
  apartmentTypes,

  handlePriceChange,
  handleSelect,
  handleChangeState,
  handleChangeLocalGovernmentArea,
  states,
  localGovernmentAreas,
  districts,
  bestAmmenities,
  otherAmmenities,
  selectedOptions
}) => {
  
  return (
    <Row className='gx-1 px-1'>
       <Col xs={4}>
        <Dropdown>
          <Dropdown.Toggle variant="transparent" id="dropdown-commercial-type">
          <small>{selectedOptions.state?.name||'State'}</small>  
          </Dropdown.Toggle>
          <Dropdown.Menu>
          {states.map((state) => (
              <Dropdown.Item key={state.id} onClick={() => handleChangeState(state)}>
                {state.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>

      <Col xs={4}>
        <Dropdown>
          <Dropdown.Toggle variant="transparent" id="dropdown-apartment-lga">
          <small>{selectedOptions.localGovernmentArea?.name||'Local Government Area'}</small>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {localGovernmentAreas.map((lga) => (
              <Dropdown.Item key={lga.name} onClick={() => handleChangeLocalGovernmentArea(lga)}>
                {lga.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>

      <Col xs={4}>
        <Dropdown>
          <Dropdown.Toggle variant="transparent" id="dropdown-price-ranges">
          <small>{selectedOptions.district?.name|| 'District'}</small>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {districts.map((district) => (
              <Dropdown.Item key={district.name} onClick={() => handleSelect('district', district.name)}>
                {district.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col xs={4}>
        <Dropdown>
          <Dropdown.Toggle variant="transparent" id="dropdown-commercial-type">
          <small>{selectedOptions.commercialType||'Rent Or Buy'}</small>  
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSelect('CommercialType', 'Rent')}>Rent</Dropdown.Item>
            <Dropdown.Item onClick={() => handleSelect('CommercialType', 'Buy')}>Buy</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>

      <Col xs={4}>
        <Dropdown>
          <Dropdown.Toggle variant="transparent" id="dropdown-apartment-type">
          <small>{selectedOptions.apartmentType||' Building Types'}</small>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {apartmentTypes.map((type,index) => (
              <Dropdown.Item key={index} onClick={() => handleSelect('apartmentType', type)}>
                {type}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>

      <Col xs={4}>
        <Dropdown>
          <Dropdown.Toggle variant="transparent" id="dropdown-price-ranges">
          <small> Price Range</small>
          </Dropdown.Toggle>
        </Dropdown>
      </Col>

      <Col xs={4}>
        <Dropdown>
          <Dropdown.Toggle variant="transparent" id="dropdown-more-options">
          <small>{selectedOptions.bestAmmenity|| 'Most Important Ammenity'}</small>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {bestAmmenities.map((option,index) => (
              <Dropdown.Item key={index} onClick={() => handleSelect('MoreOption', option)}>
                {option}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
</Col>
        <Col xs={4}>
        <Dropdown>
          <Dropdown.Toggle variant="transparent" id="dropdown-more-options">
          <small> {selectedOptions.otherAmmenity||'Other Ammenity'}</small>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {otherAmmenities.map((option,index) => (
              <Dropdown.Item key={index} onClick={() => handleSelect('MoreOption', option)}>
              {option}
            </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default GroupedDropdown;
