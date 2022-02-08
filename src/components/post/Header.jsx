import React, { } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ username }) {
    return (
        <div class="flex items-center justify-between border-b border-gray-primary px-4 py-8 h-4">
            <div class="flex items-center">
                <Link to={`/p/${username}`} class="flex items-center  gap-x-4">
                    <img alt="" src={`/images/avatars/${username}.jpg`}
                        class="w-8 h-8 rounded-full"
                    />
                    <p class="font-bold text-base lg:text-sm text-[#404040]">{username}</p>
                </Link>
            </div>
            <div class="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
            </div>
        </div>
    )
}

Header.propTypes = {
    username: PropTypes.string.isRequired,
}

export default Header;