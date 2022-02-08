import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { usePhotos } from '../hooks/usePhotos';
import Post from './post/Post';

function Timeline() {
    const { photos } = usePhotos();

    return (
        <div class="col-span-2 pb-5">
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