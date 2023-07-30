import React, { useState } from "react";
import './styles.css'
import InputComponent from "../Input";
import Button from "../Button";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, db, provider, } from '../../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from "react-router";

function SignupSignin() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [conPass, setConPass] = useState('')
    const [login, setLogin] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function signupWithEmail() {
        setLoading(true)
        if (name.length != '' && email.length != '' && pass.length != '' && conPass.length != '') {
            if (pass == conPass) {
                createUserWithEmailAndPassword(auth, email, pass)
                    .then((userCrenditial) => {
                        const user = userCrenditial.user;
                        toast.success("Account Created Successfully")
                        setLoading(false)
                        setConPass('')
                        setEmail('')
                        setName('')
                        setPass('')
                        createDoc(user)
                        navigate("/dashboard")
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        toast.error(errorMessage)
                        setLoading(false)
                    })
            }
            else {
                toast.error("Password doesn't match")
                setLoading(false)
            }
        }
        else {
            toast.error("All fields are mandatory.")
            setLoading(false)
        }
    }
    function loginWithEmail() {
        setLoading(true)
        if (email != '' && pass != '') {
            signInWithEmailAndPassword(auth, email, pass)
                .then((userCrenditial) => {
                    const user = userCrenditial.user;
                    toast.success("Successfully Loged in")
                    setLoading(false)
                    navigate("/dashboard")
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    toast.error(errorMessage)
                    setLoading(false)
                })
        } else {
            toast.error("All fields are mandatory.")
            setLoading(false)
        }
    }
    async function createDoc(user) {
        setLoading(true)
        //create a doc
        if (!user) return;

        const userRef = doc(db, "users", user.uid)
        const userData = await getDoc(userRef)

        if (!userData.exists()) {
            try {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName ? user.displayName : name,
                    email: user.email,
                    photoURL: user.photoURL ? user.photoURL : "",
                    createdAt: new Date(),
                })
                toast.success("Doc created")
                setLoading(false)
                
            }
            catch (e) {
                toast.error(e.message);
                setLoading(false)
            }
        } else {
            // toast.error("Doc already exists.")
            setLoading(false)
        }
    }

    function googleAuth() {
        setLoading(true)
        try{
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("User>>>",user)
                createDoc(user)
                navigate("/dashboard")
                toast.success('User Authenticated')
                // console.log('user--',user)
                setLoading(false)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage)
                setLoading(false)
            });
        }
        catch(e){
            toast.error(e.message);
            setLoading(false)
        }
    }

    return (
        <div className="main-body">
            {login ? <>
                <div className="signup-container">
                    <h2 className="title">Login on <span style={{ color: 'var(--theme)' }}>Financely.</span></h2>
                    <form>

                        <InputComponent
                            placeholder={'johndoe@gmail.com'}
                            label={'Email'}
                            state={email}
                            type={'email'}
                            setState={setEmail}
                        />
                        <InputComponent
                            placeholder={'Example123'}
                            label={'Password'}
                            state={pass}
                            type={'password'}
                            setState={setPass}
                        />
                        <Button
                            disabled={loading}
                            text={loading ? 'Loading...' : 'Log in With Email and Password'}
                            blue={false}
                            onClick={loginWithEmail}
                        />

                        <p style={{ textAlign: 'center', fontSize: '0.8rem', margin: 0 }}>or</p>
                        <Button
                            onClick={googleAuth}
                            text={loading ? 'Loading...' : 'Log in With Google'}
                            blue={true}
                        />
                        <p onClick={() => setLogin(!login)} style={{ textAlign: 'center', fontSize: '0.8rem', margin: 0, cursor: 'pointer' }}>Or Don't Have An Account? Click Here</p>
                    </form>
                </div>
            </>
                :
                <div className="signup-container">
                    <h2 className="title">Sign Up on <span style={{ color: 'var(--theme)' }}>Financely.</span></h2>
                    <form>
                        <InputComponent
                            placeholder={'John Doe'}
                            label={'Full Name'}
                            state={name}
                            type={'text'}
                            setState={setName}
                        />
                        <InputComponent
                            placeholder={'johndoe@gmail.com'}
                            label={'Email'}
                            state={email}
                            type={'email'}
                            setState={setEmail}
                        />
                        <InputComponent
                            placeholder={'Example123'}
                            label={'Password'}
                            state={pass}
                            type={'password'}
                            setState={setPass}
                        />
                        <InputComponent
                            placeholder={'Example123'}
                            label={'Confirm Password'}
                            state={conPass}
                            type={'password'}
                            setState={setConPass}
                        />

                        <Button
                            disabled={loading}
                            text={loading ? 'Loading...' : 'Sign Up With Email and Password'}
                            blue={false}
                            onClick={signupWithEmail}
                        />

                        <p style={{ textAlign: 'center', fontSize: '0.8rem', margin: 0 }}>or</p>
                        <Button
                            onClick={googleAuth}
                            text={loading ? 'Loading...' : 'Sign Up With Google'}
                            blue={true}
                        />
                        <p onClick={() => setLogin(!login)} style={{ textAlign: 'center', fontSize: '0.8rem', margin: 0, cursor: 'pointer' }}>Or Have An Account Already? Click Here</p>
                    </form>
                </div>}

        </div>
    )
}

export default SignupSignin;