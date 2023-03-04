import { collection, getDocs, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { auth, db } from '../configs/firebase';

export function useFirebase() {

    const getCategories = async() => {
        const q = query(collection(db, "categories"));
        const data = await getDocs(q);
        return (data.docs.map(doc => ({...doc.data(), id:doc.id})))
    }

    const getItems = async() => {
        const q = query(collection(db, "items"));
        const data = await getDocs(q);
        return (data.docs.map(doc => ({...doc.data(), id:doc.id})))
    }

    const filterItems = async(category, setLoading = null) => {
        const q = query(collection(db, "items"), where("category","==", category));
        const data = await getDocs(q);
        setLoading(false);
        return (data.docs.map(doc => ({...doc.data(), id:doc.id})))
    }

    const getItem = async(id) => {
        const q = query(collection(db, "items"), where("uid","==", id));
        const data = await getDocs(q);
        return (data.docs.map(doc => ({...doc.data(), id:doc.id}))[0])
    }
    
    return {
        getCategories,
        getItems,
        filterItems,
        getItem
    }
  }