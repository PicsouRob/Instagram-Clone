import { useState, useEffect } from 'react';

import { getPhotos} from '../services/firebase';

export function usePhotos(user) {
    const [photos, setPhotos] =  useState(null);

    useEffect(() => {
        async function getTimelinePhotos() {
            if(user?.fallowing?.length > 0) {
                const fallowingUserPhotos = await getPhotos(user?.userId, user.fallowing);
                fallowingUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
                setPhotos(fallowingUserPhotos);
            }
        }

        getTimelinePhotos();
    }, [user?.userId, user?.fallowing]);

    return { photos };
}