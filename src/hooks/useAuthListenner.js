import { useState, useEffect, useContext } from 'react';

import firebaseContext from '../context/firebase';

export function useAuthListener() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('authUser'))
    );
    const { firebaseApp } = useContext(firebaseContext);

    useEffect(() => {
        const listener = firebaseApp.auth().onAuthStateChanged((user) => {
            if(user) {
                localStorage.setItem('authUser', JSON.stringify(user));
                setUser(user);
            } else {
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });
    }, [firebaseApp]);

    return { user };
}