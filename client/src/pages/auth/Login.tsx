import React from 'react'   
import LoginForm from '../../features/auth /layout/LoginForm'
import AuthOption, { GoogleButton } from '../../features/auth /components/AuthOption'
import './styles/auth.page.css'
import MiniFooter from '../../common/components/MiniFooter'




const Login = ()=>{
    return(
        <div className='d-flex flex-column align-items-center'>
        <div className='sign-up mb-5'>
            <AuthOption route={'login'} title={'Already have an account?'} buttonText={'Login'}/>

            <GoogleButton/>
            <LoginForm/>
          
        </div>
        <MiniFooter/>
        </div>
    )
}
export default Login