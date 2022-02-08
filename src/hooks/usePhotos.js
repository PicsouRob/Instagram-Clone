import { useState, useEffect, useContext } from 'react';

import { getPhotos, getUserById } from '../services/firebase';
import UserContext from '../context/user';

export function usePhotos() {
    const [photos, setPhotos] =  useState();
    const { user: { uid: userId } } =  useContext(UserContext);

    useEffect(() => {
        async function getTimelinePhotos() {
            const [{ fallowing }] = await getUserById(userId);
            let fallowingUserPhotos = [];
   
            if(fallowing.length > 0) {
                fallowingUserPhotos = await getPhotos(userId, fallowing);
            }

            fallowingUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
            setPhotos(fallowingUserPhotos);
        }

        getTimelinePhotos();
    }, [userId]);

    return { photos };
}