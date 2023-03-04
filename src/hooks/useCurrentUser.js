import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { auth, db } from '../configs/firebase';

export function useCurrentUser() {
    const [user, setUser] = useState('');

    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        if(userlogged) {
          const getUsers = async() => {
            const q = query(collection(db, "users"), where("uid","==", userlogged.uid));
            const data = await getDocs(q);
            setUser(data.docs.map(doc => ({...doc.data(), id:doc.id}))[0])
          }
          getUsers();
        } else {
          setUser(null)
        }
      })
    }, [])
    return user
  }