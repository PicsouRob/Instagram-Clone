import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

function Photos({ photos }) {
    return <div class="my-5 px-6 md:px-8">
        <hr class="border-t border-gray-primary mb-3" />
        {!photos ? (
            <Skeleton count={10} class="w-44 h-44 rounded" />
        ) : photos.length > 0 ? (
            <div class="grid grid-cols-3 gap-1 md:gap-4 my-6">
                {photos.map((photo) => (
                    <div class="relative group" key={photo.docId}>
                        {!photo.imageSrc ? (
                            <Skeleton count={1} height={200} width={230} />
                        ) : (
                            <img alt="" src={photo.imageSrc}
                                class="object-cover w-full h-full"
                            />
                        )}
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-y-2 text-white hidden group-hover:flex group-hover:flex-col ">
                            <div class="flex items-center gap-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <p class="">{photo.likes.length}</p>
                            </div>
                            <div class="flex items-center gap-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <p class="">{photo.comments.length}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div class="grid place-items-center text-[#333333]">
                <div class="border-2 border-gray-[#333333] p-2 rounded-full my-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>
                <p class="font-bold">No Post Yet</p>
            </div>
        )}
    </div>;
}

Photos.propTypes = {
    photos: PropTypes.array.isRequired
}

export default Photos;