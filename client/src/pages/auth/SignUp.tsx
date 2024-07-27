import React from 'react'   
import SignUpForm from '../../features/auth /layout/SignUpForm'
import AuthOption, { GoogleButton } from '../../features/auth /components/AuthOption'



const SignUp = ()=>{
    return(
        <div>
            <AuthOption route={'login'} title={'Already have an account?'} buttonText={'Login'}/>

            <GoogleButton/>
            <SignUpForm/>
        </div>
    )
}
export default SignUp