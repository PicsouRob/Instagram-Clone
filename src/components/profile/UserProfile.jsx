import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Photos from './Photos';
import { getUserPhotosByUsername } from '../../services/firebase';

function UserProfile({ user }) {
    const reducer = (state, newState) => ({ ...state, ...newState });
    const initialValue = {
        profile: {}, photosCollection: [], fallowersCount: 0
    }
    const [{ profile, photosCollection, fallowersCount
    }, dispatch] = useReducer(reducer, initialValue);
    
    useEffect(() => {
        async function getUserPhotosAndInfo() {
            const photos = await getUserPhotosByUsername(user);
            
            dispatch({
                profile: user, photosCollection: photos,
                fallowersCount: user.fallowers.length
            });
        }

        if (user.username) {
            getUserPhotosAndInfo();
        }
    }, [user]);

    return <div>
        <Header
            photosCount={photosCollection ? photosCollection.length : 0}
            profile={profile}
            fallowersCount={fallowersCount}
            setFallowerCount={dispatch}
            fallowingCount={user.fallowing.length}
        />
        <Photos photos={photosCollection} />
    </div>;
}

UserProfile.propTypes = {
    user: PropTypes.shape({
        emailAddress: PropTypes.string,
        fallowers: PropTypes.array,
        fallowing: PropTypes.array,
        dateCreated: PropTypes.number,
        fullName: PropTypes.string,
        username: PropTypes.string,
        userId: PropTypes.string,
    })
}

export default UserProfile;