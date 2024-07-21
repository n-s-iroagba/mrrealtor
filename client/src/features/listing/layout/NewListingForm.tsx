import React, { useState }  from 'react';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import { required } from '../../../common/components/required';
import ErrorMessage from '../../../common/components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import '../styles/listing.styles.css'
import { Button, Spinner } from 'react-bootstrap';
const NewListingForm: React.FC = () => {
const [validated, setValidated] = useState(true)
const [errorMessage, setErrorMessage] = useState('')
const [estateData, setEstateData] = useState<any>({

})
const [submitting,setSubmiting] = useState(false)
const [images, setImages] = useState([{ file: null }])


  
const navigate = useNavigate()

const handleSubmit=(e:any) => {

}

const handleChange= (e:any) => {


}

const handleAddImage = () => {
    setImages([...images, { file: null }]);
  }
  const handleImageChange = (index:number, event:any) => {
    const newImages = [...images];
    newImages[index].file = event.target.files[0];
    setImages(newImages);
  }
const options = [
  { value: 'land', label: 'Land' },
  { value: 'building', label: 'Building' },
]
const commerceOptions = [
    { value: 'Rental', label: 'Rental' },
    { value: 'Sale', label: 'Sale' },

]
  

  return (

    <div className='form-wrapper px-5 pt-5 mx-5'>
      <h3 className='text-center'>Register Real Estate</h3>
      <Form noValidate validated={validated} onSubmit={(e: any) => handleSubmit(e)}>
      <Form.Label>
        Property Category {required}
      </Form.Label>
      <Select 
        options={options}  
        onChange={(e:any) => {
          setEstateData((prevData:any) => ({
            ...prevData,
            category: e.label,
          }));
        }} 
        className='bg-transparent form-control' 
      />

        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationFormik01">
            <Form.Label className='mb-0'>Property Type{required}</Form.Label>
            <Form.Control
              required
              type="text"
              name="firstName"
              placeholder={estateData.category?`type of ${estateData.category}`:''}
              value={estateData.propertyType}
              onChange = {(e)=>handleChange(e)}
              className=' custom-input bg-transparent'
            />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
          <Form.Label>
        Commercial Type {required}
      </Form.Label>
      <Select 
        options={commerceOptions}  
        onChange={(e:any) => {
          setEstateData((prevData:any) => ({
            ...prevData,
            commerceType: e.label,
          }));
        }} 
        className='bg-transparent form-control' 
      />

        </Row>
        {estateData.category === 'land' ? (
        <Form.Group className="mb-4" as={Col} controlId="validationFormik01">
          <Form.Label className="mb-0">
            Number Of Rooms{required}
          </Form.Label>
          <Form.Control
            required
            type="number"
            name="numberOfRooms"
            value={estateData.numberOfRooms || ''}
            onChange = {(e)=>handleChange(e)}
            className="custom-input bg-transparent"
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group>
      ) : null}
        
        <Form.Group className='mb-4' as={Col} controlId="validationFormik01">
          <Form.Label className='mb-0'>Best Perk or Social Ammenity{required}</Form.Label>
          <Form.Control
            required
            type="string"
            name="firstSocialAmmenity"
            value={estateData.firstSocialAmmenity}
             onChange = {(e)=>handleChange(e)}        
             className=' custom-input bg-transparent'
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group> 

             
        <Form.Group className='mb-4' as={Col} controlId="validationFormik01">
          <Form.Label className='mb-0'>Other Perk or Social Ammenity{required}</Form.Label>
          <Form.Control
            required
            type="string"
            name="otherSocialAmmenity"
            value={estateData.otherSocialAmmenity}
             onChange = {(e)=>handleChange(e)}        
             className=' custom-input bg-transparent'
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group> 
         {images.map((image, index) => (
        <Form.Group key={index} className="mb-3">
          <Form.Label>Image {index + 1}</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(event) => handleImageChange(index, event)}
            required
          />
        </Form.Group>
      ))}
      <Button type="button" onClick={handleAddImage} className="mb-3">
        {images.length <=1?'Add image':'Add more Images'}
      </Button>
     
    
       
        <br />
        <Form.Group>
        <div className='d-flex justify-content-evenly w-100 pb-5'>
          <button className='auth-button w-50 text-light py-3' type={submitting ? 'button' : 'submit'}>
          {submitting? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
          <button className='auth-button text-light w-50 py-3' onClick={() => navigate('/')}> Home</button>
        </div>
        </Form.Group>
      </Form>
      <ErrorMessage message={errorMessage} />
    </div>

  );
}

export default NewListingForm;
