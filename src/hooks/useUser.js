import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/user';

import { getUserById } from '../services/firebase';

export function useUser() {
    const [activeUser, setActiveUser] = useState({});
    const { user } =  useContext(UserContext);
    const userId = user.uid;

    useEffect(() => {
        async function getUserObjByUserId(userId) {
            const [user] = await getUserById(userId);
            setActiveUser(user || {});
        }
    
        if (userId) {
            getUserObjByUserId(userId);
        }
    }, [userId]);

    return { user: activeUser, setActiveUser };
}