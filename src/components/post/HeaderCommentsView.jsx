import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

function HeaderCommentsView({ avatar, username, isFallowingProfile, handleFallowUser, header }) {
    return (
        <div class="border-b border-gray-primary w-full">
            <div class={`${header ? "h-auto p-3" : "h-auto p-4"} flex items-center justify-between`}>
                <div class="flex items-center gap-x-2 md:gap-x-4">
                    {!avatar ? (
                        <Skeleton count={1} width={40} height={40}
                            circle />
                    ) : (
                        <img alt="" src={avatar}
                            class="w-8 md:w-12 h-8 md:h-12 rounded-full"
                        />
                    )}
                    <div class="flex items-center gap-x-[8px]">
                        <p class="font-bold text-sm">{username}</p>
                        <strong>&#46;</strong>
                        <button class={`${!isFallowingProfile && "text-blue-medium"} text-[12px] font-bold`}
                            onClick={() => handleFallowUser()}
                        >
                            {isFallowingProfile ? "Unfallow" : "Fallow"}
                        </button>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
            </div>
        </div>
    )
}

HeaderCommentsView.propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string,
    isFallowingProfile: PropTypes.bool,
    handleFallowUser: PropTypes.func,
}

export default HeaderCommentsView