import React from 'react'
import '../styles/home.styles.css'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import NavbarComponent from '../../common/components/NavbarComponent'
import useIsLargeScreen from '../../common/hooks/useIsLargeScreen'
import { CommercialPurpose } from '../../common/types/commonTypes'
import HomeSearchBar from '../components/HomeSearchBar'



const Header: React.FC = () => {
 const isLargeScreen = useIsLargeScreen()
const navigate = useNavigate()
  
const navigateToSearch = (commercialPurpose:CommercialPurpose) => {
    navigate(`/building/${commercialPurpose}`)
  }
const navigateToDasboard =()=>{
  navigate('/dashboard')
}
  return (
    <header className='header'>



      <NavbarComponent />
      <div className='header-background d-flex flex-column align-items-center px-3'>

        <h1>The #1 site real estate <span className="break">professionals trust.</span></h1>
{!isLargeScreen?<>
  <HomeSearchBar/>
  </>
       : <>
      
       <Row className='w-75 d-flex gy-1 gx-1 justify-content-center align-items-center mt-4'>
          <Col md={3} xs={12}className=' d-flex justify-content-center'>
            <button onClick={()=>{navigateToSearch(CommercialPurpose.SALE)}} className='w-100 header-button bg-light'>Buy</button>
          </Col>
          <Col md={3} xs={12}className=' d-flex justify-content-center'>
            <button  onClick={()=>navigateToDasboard()} className='w-100 header-button bg-dark text-light'>Sell</button>
          </Col>
          <Col md={3} xs={12}className=' d-flex justify-content-center'>
            <button onClick={()=>{navigateToSearch(CommercialPurpose.RENTAL)}} className='w-100 header-button bg-dark text-light'>Rent</button>
          </Col>
          <Col md={3} xs={12}className=' d-flex justify-content-center'>
            <button  onClick={()=>navigateToDasboard()} className='w-100 header-button bg-light'>Lease</button>
          </Col>
        </Row>

       </>
      
}
      </div>
    </header>


  )
}
export default Header