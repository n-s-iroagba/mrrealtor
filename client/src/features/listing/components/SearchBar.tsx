import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


interface SearchResult {
  addressType: 'state' | 'localGovernmentArea' | 'district' | 'address';
  value: string;
}

interface SearchBarProps {
  onSearchResult: (result: SearchResult) => void;
}

// Sample data for demonstration
const states = ['California', 'Texas', 'New York'];
const localGovernmentAreas = ['LGA1', 'LGA2', 'LGA3'];
const districts = ['District1', 'District2', 'District3'];
const addresses = ['123 Main St', '456 Elm St', '789 Oak St'];

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResult }) => {
  const [query, setQuery] = useState<string>('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    if (query.length > 0) {
     


      let result: SearchResult = { addressType: 'state', value: '' };

      states.forEach(state => {
        if (state.toLowerCase().includes(query.toLowerCase())) {
          result = { addressType: 'state', value: state };
        }
      });
      localGovernmentAreas.forEach(lga => {
        if (lga.toLowerCase().includes(query.toLowerCase())) {
          result = { addressType: 'localGovernmentArea', value: lga };
        }
      });
      districts.forEach(district => {
        if (district.toLowerCase().includes(query.toLowerCase())) {
          result = { addressType: 'district', value: district };
        }
      });
      addresses.forEach(address => {
        if (address.toLowerCase().includes(query.toLowerCase())) {
          result = { addressType: 'address', value: address };
        }
      });

      onSearchResult(result);
    } else {
      setShowDropdown(false);
    }
  }, [filteredSuggestions,query, onSearchResult]);

  const handleSelect = async (suggestion: string) => {
    setShowDropdown((prevState)=>(!prevState));
    setQuery(suggestion);
     setFilteredSuggestions([])
   
   
  };

const clear =()=>{
    setQuery('');
    setShowDropdown(false);
    onSearchResult({ addressType: 'state', value: '' }); 
  
}
const handleChange = (e:any) => {
  const tempQuery = e.target.value;
  const filtered = [
    ...states.filter(state => state.toLowerCase().includes(tempQuery.toLowerCase())),
    ...localGovernmentAreas.filter(lga => lga.toLowerCase().includes(tempQuery.toLowerCase())),
    ...districts.filter(district => district.toLowerCase().includes(tempQuery.toLowerCase())),
    ...addresses.filter(address => address.toLowerCase().includes(tempQuery.toLowerCase())),
  ];
setShowDropdown(true)
  setFilteredSuggestions(filtered)
  console.log(filteredSuggestions)
  setQuery(tempQuery)
};
  return (
    <div className=''>
      <InputGroup className=' px-2'>
        <InputGroup.Text>
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
        <FormControl
          type="text"
          placeholder="Search by location."
          value={query}
          onChange={(e) => handleChange(e)}
          onFocus={() => setShowDropdown(query.length > 0)}
        />

      </InputGroup>
      {showDropdown &&  filteredSuggestions.length > 0 ? (
      <Dropdown.Menu show={showDropdown} className="mx-2">
        {filteredSuggestions.map((suggestion, index) => (
          <Dropdown.Item
            key={index}
            onClick={() => handleSelect(suggestion)}
          >
            {suggestion}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    ) : (
      <Dropdown.Menu show={showDropdown} className="mx-2">
        <Dropdown.Item>No results found</Dropdown.Item>
      </Dropdown.Menu>
    )}
      
     
          {showDropdown && <div className='d-flex justify-content-center'><button className='mt-3' onClick={()=>clear()}>Clear Search Bar</button></div>}
     
    </div>
  );
};

export default SearchBar;
