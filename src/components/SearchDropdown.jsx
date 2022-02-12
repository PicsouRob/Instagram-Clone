import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import {
    getRecentSearch, getSearchProfiles,
    deleteSearchRecent, deleteAllSearchRecent
} from '../services/firebase';

function SearchDropdown({ value, user, setSearchDropdown }) {
    const navigate = useNavigate();
    const [profiles, setProfiles] = useState([]);
    const [recents, setRecents] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const user = await getSearchProfiles(value);

            if (value) {
                setProfiles(user);
            } else {
                setProfiles([]);
            }
        }

        getUser();
    }, [value]);

    useEffect(() => {
        const getRecents = async () => {
            const recentUser = await getRecentSearch(user.userId);
            setRecents(recentUser);
        }

        getRecents();
    }, [user.userId, refresh]);

    const handleClick = async (userProfile, isAdd) => {
        await deleteSearchRecent(userProfile, isAdd, user.userId);
        setRefresh(!refresh);

        if (isAdd === true) {
            navigate(`/p/${user.username}`);
        }
    }

    const eraseAllRecentSearch = async () => {
        setRefresh(!refresh);
        await deleteAllSearchRecent(user.userId);
        setRecents([]);
    }

    return (
        <motion.div
            class="absolute right-0 top-[3.2rem] bg-white w-[350px] h-[350px] rounded-md shadow-lg float-left after:w-4 after:h-6 after:bg-white after:absolute after:-top-2 after:right-[155px] after:-rotate-45"
            initial={{ y: "-10vh" }}
            animate={{ y: 0 }}
        >
            <div class="text-[#262626] overflow-auto">
                {profiles?.length > 0 ? (
                    <div class="flex flex-col pt-2">
                        {
                            profiles.map((profile, index) => (
                                <div key={index}
                                    class="flex items-center gap-x-3 text-[#333333] hover:bg-[rgba(221,221,221,0.2)] group text-sm cursor-pointer z-60 px-3 py-1"
                                    onClick={() => handleClick(profile, true)}
                                >
                                    <img alt="" class="h-12 w-12 rounded-full border border-gray-primary"
                                        src={`/images/avatars/${profile.username}.jpg`}
                                    />
                                    <div class="text-left">
                                        <p class="text-[15px] font-bold">{profile.username}</p>
                                        <p class="text-[#959494]">{profile.fullName}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ) : value && profiles?.length < 1 ? (
                    <div class="text-center grid place-items-center w-full h-[350px]">
                        <p class="text-[15px] font-bold text-[rgba(0,0,0,0.3)]">
                            There are no result for <strong class="text-[rgba(0,0,0,0.8)]">{value}</strong>.
                        </p>
                    </div>
                ) : recents?.length > 0 ? (
                    <div class="flex flex-col pt-2">
                        <div class="flex items-center justify-between font-bold text-sm pl-3 pb-3">
                            <p class="text-left">Recents</p>
                            <button class="px-3 py-2 text-blue-medium"
                                onClick={() => eraseAllRecentSearch()}
                            >
                                Delete All
                            </button>
                        </div>
                        {
                            recents.map((profile, index) => (
                                <div key={index}
                                    class="flex items-center justify-between gap-x-3 text-[#333333] group text-sm z-60 px-3 py-1 hover:bg-[rgba(221,221,221,0.2)]"
                                >
                                    <div class="flex items-center gap-x-3 cursor-pointer"
                                        onClick={() => {
                                            navigate(`/p/${profile.username}`);
                                            setSearchDropdown(false);
                                        }}
                                    >
                                        <img alt="" class="h-12 w-12 rounded-full border border-gray-primary"
                                            src={`/images/avatars/${profile.username}.jpg`}
                                        />
                                        <div class="text-left">
                                            <p class="text-[15px] font-bold">{profile.username}</p>
                                            <p class="text-[#959494]">{profile.fullName}</p>
                                        </div>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        onClick={() => handleClick(profile, false)}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div class="w-full h-full font-bold  p-3">
                        <p class="text-left text-sm">Recent</p>
                        <div class="my-auto mt-20 text-center h-full">
                            <p class="text-[14px] text-[rgba(0,0,0,0.3)]">
                                There are no recent searches.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

SearchDropdown.propTypes = {
    value: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    setSearchDropdown: PropTypes.func.isRequired,
}

export default SearchDropdown;