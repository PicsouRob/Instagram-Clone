import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

function Story({ img, username }) {
    return (
        <div class="cursor-pointer">
            {!img ? (
                <Skeleton count={1} height={100} width={100} circle />
            ) : (
                <img alt="" src={img}
                    class="w-16 h-16 object-contain rounded-full p-[2px] border-2 border-red-primary hover:scale-110 transition transform duration-200 ease-in"
                />
            )}
            <p class="w-16 text-center text-[12px] truncate">{username}</p>
        </div>
    )
}

Story.propTypes = {
    img: PropTypes.string,
    username: PropTypes.string
}

export default Story;