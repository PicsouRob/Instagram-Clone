import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ModalCommentsViews({ docId, comments: allComments }) {
    return (
        <div class=" text-[12px]">
            {allComments.map((item, index) => (
                <div key={index} class="flex items-start md:items-center justify-between text-[#262626]">
                    <div class="flex gap-x-4 py-1">
                        <Link to={`/p/${item.displayName}`}>
                            <img alt="" src={item.avatar ? item.avatar : "/images/avatars/default.png"}
                                class="w-8 h-8 rounded-full"
                            />
                        </Link>
                        <div class="flex items-start md:items-center flex-wrap gap-x-2">
                            <Link to={`/p/${item.displayName}`}>
                                <p class="font-bold">{item.displayName}</p>
                            </Link>
                            <p class="">{item.comment}</p>
                        </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
            ))}
            <p class="text-gray-base text-center mt-4 text-[11px] uppercase font-bold">
                No more comments.....
            </p>
        </div>
    )
}

ModalCommentsViews.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array,
}

export default ModalCommentsViews;