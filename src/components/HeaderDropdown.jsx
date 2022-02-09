import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';

import FirebaseContext from '../context/firebase';

function HeaderDropdown({ setDropdown, user }) {
    const navigate = useNavigate();
    const { firebaseApp } = useContext(FirebaseContext);

    const userSignOut = async () => {
        await firebaseApp.auth().signOut();
        navigate('/login');
        window.location.reload(true);
    }

    return (
        <motion.div
            class="absolute -right-4 mt-5 bg-white z-30 w-52 rounded-md shadow-lg float-left after:w-4 after:h-6 after:bg-white after:absolute after:-top-2 after:right-4 after:-rotate-45"
            initial={{ y: "-10vh" }}
            animate={{ y: 0 }}
        >
            <div class="p-3 space-y-4">
                <Link to={`/p/${user.username}`}
                    class="flex items-center gap-x-3 text-[#333333] text-sm cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="">Profile</p>
                </Link>
                <div class="flex items-center gap-x-3 text-[#333333] text-sm cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <p class="">Saved</p>
                </div>
                <div class="flex items-center gap-x-3 text-[#333333] text-sm cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p class="">Setting</p>
                </div>
                <div class="flex items-center gap-x-3 text-[#333333] text-sm cursor-pointer"
                    onClick={userSignOut}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <p class="">Switch account</p>
                </div>
            </div>
            <div
                class="text-sm text-left text-[#333333] w-full cursor-pointer"
                onClick={userSignOut}
            >
                <p class="border-t-2 border-gray-background px-3 py-2">Sign out</p>
            </div>
        </motion.div>
    )
}

HeaderDropdown.propTypes = {
    setDropdown: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}

export default HeaderDropdown;