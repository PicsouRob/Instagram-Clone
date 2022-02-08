import { useState, useEffect } from 'react';
import { getUserById } from '../services/firebase';

export function useUser(userId) {
    const [activeUser, setActiveUser] = useState({});

    useEffect(() => {
        async function getUserObjByUserId() {
            const [user] = await getUserById(userId);
            setActiveUser(user || {});
        }
    
        if (userId) {
            getUserObjByUserId();
        }
    }, [userId]);

    return { user: activeUser, setActiveUser };
}