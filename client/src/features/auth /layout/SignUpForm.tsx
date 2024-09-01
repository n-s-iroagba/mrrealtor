import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import { useMemo } from 'react';


import { AuthContext } from '../context/AuthContext';
import { InputGroup, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import { useNavigate } from 'react-router-dom';

import countryList from 'react-select-country-list'
import '../styles/auth.styles.css'
import { createRealtorUrl } from '../../../constants/urls';
import ErrorMessage from '../../common/components/ErrorMessage';
import { required } from '../../common/components/required';
const SignUpForm: React.FC = () => {
  const options = useMemo(() => countryList().getData(), [])
  const { realtorData,
    submitting,
    setRealtorData,
    handleSubmit,
    handleChange,
    handleConfirmPasswordsChange,
    passwordType,
    showPassword,
    isMatchingPassword,
    errorMessage,
    passwordValidityMessage,
    validated
  } = useContext<any>(AuthContext)

const navigate = useNavigate()


  

  return (

    <div className='form-wrapper px-5 pt-5 mx-1'>
      <h3 className='text-center'>Sign Up</h3>
      <Form noValidate validated={validated} onSubmit={(e: any) => handleSubmit(realtorData, e, createRealtorUrl,navigate)}>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationFormik01">
            <Form.Label className='mb-0'>First name{required}</Form.Label>
            <Form.Control
              required
              type="text"
              name="firstName"
              value={realtorData.firstName}
              onChange={(e) => handleChange(realtorData, e, setRealtorData,)}
              className=' custom-input bg-transparent'
            />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col}  >
            <Form.Label className='mb-0'>Last name{required}</Form.Label>
            <Form.Control
              required
              type="text"
              name="lastName"
              value={realtorData.lastName}
              onChange={(e) => handleChange(realtorData, e, setRealtorData)}
              className=' custom-input bg-transparent'
            />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        </Row>
       
        <Form.Group className='mb-3' controlId="validationFormik04">
          <Form.Label>Country of residence{required}</Form.Label>
          <Select options={options} onChange={(e: any) => {
            setRealtorData({ ...realtorData, country: e.label })
          }} className=' bg-transparent form-control' />
        </Form.Group>

        <Form.Group className='mb-4' as={Col} controlId="validationFormik01">
          <Form.Label className='mb-0'>Email{required}</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            value={realtorData.email}
            onChange={(e) => handleChange(realtorData, e, setRealtorData)}
            className=' custom-input bg-transparent'
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group> 

        <Form.Group className='mb-4' as={Col} controlId="validationFormik01">
          <Form.Label className='mb-0'>Phone Number{required}</Form.Label>
          <Form.Control
            required
            type="phoneNumber"
            name="phoneNumber"
            value={realtorData.email}
            onChange={(e) => handleChange(realtorData, e, setRealtorData)}
            className=' custom-input bg-transparent'
          />
          <Form.Control.Feedback></Form.Control.Feedback>
        </Form.Group> 



       <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Password{required}</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type={passwordType}
              name='password'
              value={realtorData.password}
              onChange={(e) => handleChange(realtorData, e, setRealtorData)}
              className=" custom-input bg-transparent form-control text-light"

            />
            <InputGroup.Text onClick={() => showPassword()}>
              <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
            </InputGroup.Text>
          </InputGroup>
          <PasswordStrengthMeter password={realtorData.password} />
          <div className='d-flex flex-column'>
            {
              Array.isArray(passwordValidityMessage) && passwordValidityMessage.length > 0 && (
                passwordValidityMessage.map((message, index) => (
                  <Form.Text className='text-danger' key={index}>*{message}</Form.Text>
                ))
              )
            }
          </div>
        </Form.Group>
        <br />

        <Form.Group as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Confirm password{required}</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type={passwordType}
              name="confirmPassword"
              value={realtorData.confirmPassword}
              onChange={(e) => handleConfirmPasswordsChange(realtorData, e, setRealtorData)}
              className=" custom-input  bg-transparent form-control text-light "
            />
            <InputGroup.Text onClick={() => showPassword()}>
              <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
            </InputGroup.Text>
          </InputGroup>
          <div>
            {
              !isMatchingPassword && <Form.Text className='text-danger'>*passwords do not match</Form.Text>
            }
          </div>
        </Form.Group>
        <br />
        <Form.Group>
        <div className='d-flex justify-content-evenly w-100 pb-5'>
          <button className='auth-button w-50 text-light py-3' type={submitting === 'submitting' ? 'button' : 'submit'}>
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

export default SignUpForm;
