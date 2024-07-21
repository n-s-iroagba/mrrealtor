import React from 'react'
import NavbarComponent from '../../../common/components/NavbarComponent'
import '../styles/home.styles.css'
import { Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchLocation } from '@fortawesome/free-solid-svg-icons'

const Header:React.FC = () =>{
    const handleSearchChange = ()=>{

    }
    const navigateToSearch  = ()=>{
    }
    return (
      <header className='header'>
   

    
        <NavbarComponent/>
        <div className='header-background d-flex flex-column align-items-center'>

        <h1>The #1 site real estate <span className="break">professionals trust.</span></h1>

   
         
          <InputGroup className='home-searchbar'>
            <Form.Control
              required
              type='string'
              name="confirmPassword"
              value= ''
              onChange={(e) => handleSearchChange()}
              className=" custom-input  bg-transparent form-control text-light "
            />
            <InputGroup.Text onClick={() => navigateToSearch()}>
              <FontAwesomeIcon icon={faSearchLocation} />
            </InputGroup.Text>
          </InputGroup>
          </div>
        </header>
          
        
    )
}
export default Header