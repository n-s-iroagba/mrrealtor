import React from 'react'   
import SignUpForm from '../../features/auth /layout/SignUpForm'
import AuthOption, { GoogleButton } from '../../features/auth /components/AuthOption'
import './styles/auth.page.css'
import MiniFooter from '../../features/common/components/MiniFooter'





const SignUp = ()=>{
    return(
        <div className='d-flex flex-column align-items-center'>
        <div className='sign-up mb-5'>
            <AuthOption route={'login'} title={'Already have an account?'} buttonText={'Login'}/>

            <GoogleButton/>
            <SignUpForm/>
          
        </div>
        <MiniFooter/>
        </div>
    )
}
export default SignUp