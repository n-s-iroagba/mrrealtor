import React, { useContext } from 'react';
import { useNavigate} from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { InputGroup, Spinner } from 'react-bootstrap';

import { AuthContext } from '../context/AuthContext';
import '../styles/auth.styles.css'
import AuthOption from '../components/AuthOption';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createAdminUrl } from '../../../constants/urls';
import ErrorMessage from '../../common/components/ErrorMessage';
import { required } from '../../common/components/required';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';



const AdminSignUpForm: React.FC = () => {

  const navigate = useNavigate()

  const {
    submitting,
    adminData,
    validated,
    setAdminData,
    handleSubmit,
    handleChange,
    handleConfirmPasswordsChange,

    passwordType,
    showPassword,
    isMatchingPassword,
    errorMessage,
    passwordValidityMessage
  } = useContext<any>(AuthContext)// used 'any' type because code was buggy when using <AuthContextType|undefined>
 
 const navigateToVerifyEmailPage=()=>{
      navigate('/verify-email')
    }
const navigateToHome=()=>{
      navigate('/')
    }
    
  return (
    <div className='form-wrapper px-5 pt-5 mx-5'>
      <h3 className='text-center'>Sign Up</h3>
      <Form className="form py-5 " noValidate validated={validated} onSubmit={(e) => handleSubmit(adminData, e, createAdminUrl,navigateToVerifyEmailPage)}>
        <Row>
          <Form.Group as={Col} lg="12" controlId="validationFormik04">
            <Form.Label className='mb-0'>Name{required}</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={adminData.name}
              onChange={(e) => handleChange(adminData, e, setAdminData)}
              className=" bg-transparent custom-input"
            />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        </Row>
        <br />

        <Row>
          <Form.Group as={Col} lg="12" controlId="validationFormik04">
            <Form.Label className='mb-0'>Email{required}</Form.Label>
            <Form.Control
              type="email"
              required
              name="email"
              value={adminData.email}
              onChange={(e) => handleChange(adminData, e, setAdminData)}
              className="  bg-transparent custom-input"
            />
            <Form.Control.Feedback></Form.Control.Feedback>
          </Form.Group>
        </Row>
        <br />

        <Form.Group className='mb-4' as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Password{required}</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type={passwordType}
              name='password'
              value={adminData.password}
              onChange={(e) => handleChange(adminData, e, setAdminData)}
              className="  bg-transparent custom-input"

            />
            <InputGroup.Text onClick={() => showPassword()}>
              <FontAwesomeIcon icon={passwordType === 'text' ? faEye : faEyeSlash} />
            </InputGroup.Text>
          </InputGroup>
          <PasswordStrengthMeter password={adminData.password} />
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
        <br/>

        <Form.Group as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Confirm password{required}</Form.Label>
          <InputGroup>
            <Form.Control
              required
              type={passwordType}
              name="confirmPassword"
              value={adminData.confirmPassword}
              onChange={(e) => handleConfirmPasswordsChange(adminData, e, setAdminData)}
              className=" custom-input  bg-transparent text-light "
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
         <br/>

        <Form.Group className='mt-4' as={Col} lg="12" controlId="validationFormik04">
          <Form.Label className='mb-0'>Secret code{required}</Form.Label>
          <Form.Control
            required
            type="password"
            name="secretCode"
            value={adminData.secretCode}
            onChange={(e) => handleChange(adminData, e, setAdminData)}
            className="  bg-transparent custom-input "
          />
        </Form.Group>
        <br />

        <Form.Group>
        <div className='d-flex justify-content-evenly w-100 pb-5'>
          <button className='auth-button w-50 text-light py-3' type={submitting? 'button' : 'submit'}>
            {submitting? <Spinner animation='border' size='sm' /> : 'Submit'}
          </button>
          <button className='auth-button text-light w-50 py-3' onClick={() => navigateToHome()}> Home</button>
        </div>
        </Form.Group>
      </Form>
      <br/>

      <ErrorMessage message={errorMessage} />
      <AuthOption route={'/'} title={'a'} buttonText={'Login'}/>
    </div>

  );
};

export default AdminSignUpForm;