import React, { useState }  from 'react';
import Col from 'react-bootstrap/Col';
import Select,{ StylesConfig } from 'react-select';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { required } from '../../../common/components/required';
import ErrorMessage from '../../../common/components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import '../styles/listing.styles.css'
import { Button, Spinner } from 'react-bootstrap';
import { getLGAs, getLgaSubAreas, getNigeriaStates, StateCodes } from 'geo-ng';
import { faScaleUnbalancedFlip } from '@fortawesome/free-solid-svg-icons';
const NewListingForm: React.FC = () => {
const [validated, setValidated] = useState(true)
const [errorMessage, setErrorMessage] = useState('')
const [estateData, setEstateData] = useState<any>({

})
const [submitting,setSubmiting] = useState(false)
const [images, setImages] = useState([{ file: null }])
const [stateCode,setStateCode] = useState('')
const [subLgaOptions, setSubLgaOptions] = useState<any>([])
const [lgaOptions, setLgaOptions] = useState<any>([])

interface OptionType {
  value: string; // or another type depending on your values
  label: string;
  
}




const navigate = useNavigate()

const statesWithCode = getNigeriaStates().filter((state)=>( state.name))
const statesOption= getNigeriaStates().map((state)=>state.name)
const l = getLGAs('AB')
console.log(l)

function getStateCodeByName(stateName: string): string | undefined {
  const states =  getNigeriaStates().filter((state)=>({name: state.name,code: state.code}))
  const state = states.find(state => state.name === stateName);
  return state ? state.code : undefined;
}

const handleSubmit=(e:any) => {
  console.log(estateData)
  e.preventDefault();

  const formData = new FormData();

  images.forEach((image, index) => {
    if (image.file) {
      formData.append('images', image.file);
    }
  })

}

const handleChange= (e:any) => {


}

const handleChangeState= (e:any):void =>{
  setEstateData((prevData:any) => ({
   ...prevData,
    state: e.target.value,
  }));
const code = getStateCodeByName(e.target.value)

if (code) {
const lgas = getLGAs(code as StateCodes) as string[]
setStateCode(code)

setLgaOptions(lgas);
}
}

const handleChangeLga = (e:any):void =>{
  setEstateData((prevData:any) => ({
   ...prevData,
    lga: e.target.value,
  }));
  const subAreas = getLgaSubAreas(stateCode as StateCodes, e.target.value);
  setSubLgaOptions(subAreas)
}

const handleChangeSubLga = (e:any)=>{

  setEstateData((prevData:any) => ({
   ...prevData,
    subLga: e.target.value,
  }));
}
const handleAddImage = () => {
  setImages([...images, { file: null }]);
};

const handleImageChange = (index:number, event:any) => {
  const newImages = [...images];
  newImages[index].file = event.target.files[0];
  setImages(newImages);
};
const options = [
  { value: 'land', label: 'Land' },
  { value: 'building', label: 'Building' },
]
const commerceOptions = [
    { value: 'Rental', label: 'Rental' },
    { value: 'Sale', label: 'Sale' },

]


// Define the type of your options
interface OptionType {
  value: string;
  label: string;
}

const customStyles: StylesConfig<OptionType, false> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'red', // Background color for the control part
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'lightgrey', // Background color for the dropdown menu
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'lightblue' : 'white', // Background color for each option
  }),
  // Add more custom styles if needed
};



  

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
        className='' 
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
        <Form.Group>
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
        className='' 
      />
      </Form.Group>

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
            className=" bg-transparent"
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
        <Form.Group>
      <Form.Label>
        State <span style={{ color: 'red' }}>*</span>
      </Form.Label>
      <Form.Select  onChange={(e:any) => { handleChangeState(e); 
        }} 
      className=' bg-transparent text-dark'>
            <option className=' primary-background text-dark' value={''}>Select LGA</option>
           {
            statesOption.map((option:any) => (
              <option key={option} value={option}>{option}</option>
            ))
           }
          </Form.Select>.
    </Form.Group>

      <Form.Group>
          <Form.Label>
        Local Government Area {required}
      </Form.Label>
      <Form.Select  onChange={(e:any) => { handleChangeLga(e); 
        }} 
      className=' bg-transparent text-dark'>
            <option className=' primary-background text-dark' value={''}>Select LGA</option>
           {
            lgaOptions.map((option:any) => (
              <option key={option} value={option}>{option}</option>
            ))
           }
          </Form.Select>.
        </Form.Group>
   
  


      <Form.Group>
          <Form.Label>
        Town {required}
      </Form.Label>
      <Form.Select  onChange={(e:any) => { handleChangeLga(e); 
        }} 
      className=' bg-transparent text-dark'>
            <option className=' primary-background text-dark' value={''}>Select LGA</option>
           {
            subLgaOptions.map((option:any) => (
              <option key={option} value={option}>{option}</option>
            ))
           }
          </Form.Select>
      
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
        {images.length <= 1 ? 'Add image' : 'Add more Images'}
      </Button>
      <Button type="submit">Upload Images</Button>
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
