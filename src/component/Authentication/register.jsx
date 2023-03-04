import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../configs/firebase';
import React, { useContext, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore';
import { redirect } from 'react-router-dom';
import './styles.css';
import ModalPortal from '../Modal';
import UserContext from '../../globalStore/UserContext';
import { types } from '../../globalStore/UserReducer';
import Login from '.';

const INITIAL_STATE = {
    name: '',
    phone: '',
    email: '',
    password: ''
}

const Register = ({ onClose }) => {
    const [user, setUser] = useState(INITIAL_STATE);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);
    const [login, setLogin] = useState(false);
    const [ userContext, dispatch] = useContext(UserContext);

    const handleChanges = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handleRegister = (e) => {
        e.preventDefault();
        const { email, password, name, phone } = user;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                addDoc(collection(db, "users"), {
                    name: name,
                    email: email,
                    phone: phone,
                    password: password,
                    cart: [],
                    uid: user.uid
                }).then(() => {
                    setMessage('New user added succesfully');
                    setUser(INITIAL_STATE);
                    setError(false);
                    dispatch({
                        type: types.login,
                        payload: {uid: user.uid, name: name, cart:[]}
                    })
                    setTimeout(() => {
                        setMessage('');
                        redirect('/')
                    }, 4000)
                }).catch((error) => {
                    setMessage(error.message)
                    setError(true);
                })
            }).catch((error) => {
                setMessage(error.message)
                setError(true);
            })
    }

    if (login) return <Login onClose={onClose} />

  return (
    <ModalPortal onClose={onClose} title='Create Account'>
        <div className='signup-container'>
            <form className='signup-form' onSubmit={handleRegister}>
                {message && <>
                <div className={error ? 'error-msg' : 'success-msg'}>{message}</div>
                </>}

                <label htmlFor='name'>Name</label>
                <input 
                    onChange={handleChanges} 
                    name='name' 
                    value={user.name} 
                    type='text' 
                    placeholder='Cosme Fulanito'
                    required
                />

                <label htmlFor='email'>Email</label>
                <input 
                    onChange={handleChanges} 
                    name='email' 
                    value={user.email} 
                    type='text' 
                    placeholder='name@example.com' 
                    required
                />

                <label htmlFor='phone'>Phone</label>
                <input 
                    onChange={handleChanges} 
                    name='phone' 
                    value={user.phone} 
                    type='number' 
                    placeholder='44444444' 
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

                <button>Register</button>
                <pre>Already have an account? <span onClick={()=>setLogin(true)}>Sign in</span></pre>
            </form>
        </div>
    </ModalPortal>
  )
}

export default Register