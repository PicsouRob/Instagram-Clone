import React, { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';

import LoggedInUserContext from '../context/loggedInUserContext';
import { usePhotos } from '../hooks/usePhotos';
import Post from './post/Post';
import Stories from './stories/Stories';

function Timeline() {
    const { user } = useContext(LoggedInUserContext);
    const { photos } = usePhotos(user);

    return (
        <div class="pb-5">
            <Stories />
            {!photos ? (
                <div class="w-full">
                    {[...new Array(5)].map((_, index) => (
                        <Skeleton count={1} key={index}
                            height={400} class="w-full mb-8"
                        />
                    ))}
                </div>
            ) : photos?.length > 0 ? (
                <div class="flex flex-col gap-y-4">
                    {photos.map((photo, index) => (
                        <Post key={index} content={photo} />
                    ))}
                </div>
            ) : (
                <p class="text-2xl text-center font-bold">
                    Please! fallow people to see photos.
                </p>
            )}
        </div>
    );
}

export default Timeline;