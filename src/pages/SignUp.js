import React from 'react'
import SignupSignin from '../components/SignupSignin'
import Header from '../components/Header'

function SignUp() {
    return (
        <div>
            <Header />
            <div className="wrapper">
                <SignupSignin />
            </div>
        </div>
    )
}

export default SignUp
