import React, { useState, useEffect } from 'react';
import { getUserByUsername } from '../services/firebase';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '../components/headers/Header';
import UserProfile from '../components/profile/UserProfile';

function Profile() {
    const navigate = useNavigate();
    const { username } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function checkExistUser() {
            const user = await getUserByUsername(username);

            if (user.length > 0) {
                setUser(user[0]);
            } else {
                navigate('*');
            }
        }

        checkExistUser();
    }, [username, navigate]);

    return user?.username ? (
        <div class="bg-gray-background">
            <Header />
            <div class="max-w-screen-lg mx-auto px-0 md-px-6">
                <UserProfile user={user} />
            </div>
        </div>
    ) : null;
}

export default Profile;