import React from 'react';
import PropTypes from 'prop-types';

function HeaderAction(props) {
    const { activeFallowBtn, isFallowingProfile,
        profileUsername, handleFallowUser
    } = props;

    return <div class="flex items-center justify-between">
        <h3 class="text-xl md:text-2xl text-[#333333]">{profileUsername}</h3>
        <div class="">
            {activeFallowBtn && (
                <button class="bg-blue-medium px-3 shadow-sm font-bold text-white text-xs py-2 rounded w-auto"
                    onClick={handleFallowUser}
                >
                    {isFallowingProfile ? 'Unfallow' : "Fallow"}
                </button>
            )}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer text-[#333333]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
    </div>;
}

PropTypes.propTypes = {
    activeFallowBtn: PropTypes.func,
    isFallowingProfile: PropTypes.bool,
    profileUsername: PropTypes.string,
    handleFallowUser: PropTypes.func
}

export default HeaderAction;