

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../configs/firebase';
import React, { useContext, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { redirect } from 'react-router-dom';
import './styles.css';
import ModalPortal from '../Modal';
import UserContext from '../../globalStore/UserContext';
import { types } from '../../globalStore/UserReducer';
import Register from './register';

const INITIAL_STATE = {
    name: '',
    phone: '',
    email: '',
    password: ''
}

const Login = ({ onClose }) => {
    const [user, setUser] = useState(INITIAL_STATE);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [ , dispatch] = useContext(UserContext);
    const [register, setRegister] = useState(false);

    const handleChanges = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = user;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;            
                setMessage('Logged in successfully');
                setUser(INITIAL_STATE);
                setError(false);
                dispatch({
                    type: types.login,
                    payload: {uid: user.uid, name: userCredential.name}
                })
                setTimeout(() => {
                    onClose()
                    setMessage('');
                    redirect('/')
                }, 2000)
            
            }).catch((error) => {
                setMessage(error.message)
                setError(true);
            })
    }

    if(register) return <Register onClose={onClose} />

  return (
    <ModalPortal onClose={onClose} title='Login'>
        <div className='signup-container'>
            <form className='signup-form' onSubmit={handleLogin}>
                {message && <>
                <div className={error ? 'error-msg' : 'success-msg'}>{message}</div>
                </>}

                <label htmlFor='email'>Email</label>
                <input 
                    onChange={handleChanges} 
                    name='email' 
                    value={user.email} 
                    type='text' 
                    placeholder='name@example.com' 
                    required
                />

                <label htmlFor='password'>Password</label>
                <input 
                    onChange={handleChanges} 
                    name='password' 
                    value={user.password} 
                    type='password' 
                    placeholder='*************'
                    required
                />

                <button>Login</button>
                <pre><span onClick={()=>setRegister(true)}>Register</span></pre>
            </form>
        </div>
    </ModalPortal>
  )
}

export default Login