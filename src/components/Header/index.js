import React, { useEffect, useState } from "react";
import './styles.css'
import { auth } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { Tooltip } from '@mui/material';
import UserSvg from '../../assests/user.svg'
// import PersonIcon from '@mui/icons-material/Person';

function Header() {
    
    const [user, loading] = useAuthState(auth);
    const [photoUrl, setPhotoUrl] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            setPhotoUrl(user.photoURL)
            console.log('user>>', user)
            console.log('photo>>', user.photoURL)
            navigate('/dashboard')
        }
    }, [user, loading])

    function logoutFun() {
        try {
            signOut(auth)
                .then(() => {
                    toast.success("User Log Out")
                    navigate("/")
                })
                .catch((error) => {
                    toast.error(error.message)
                })
        } catch (e) {
            toast.error(e.message)
        }
    }

    return (
        <div className="navbar">
            <p className="logo">Financly.</p>
            
            {user && (<div class='logout-logo'>
                {user.photoURL ?
                    <Tooltip placement="bottom-start" title={user.displayName}>
                        <img src={user.photoURL} className="user-img" alt='Profile pic' onClick={logoutFun} />
                    </Tooltip>
                    :
                    <Tooltip placement="bottom-start" title={user.email}>
                        <img src={UserSvg} onClick={logoutFun} />
                    </Tooltip>
                }
                <p className="logo link" onClick={logoutFun}><i>Logout</i></p></div>)}

        </div>
    )
}

export default Header;