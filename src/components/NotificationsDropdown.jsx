import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

import {
    getSuggestedProfiles
} from '../services/firebase';
import FirebaseContext from '../context/firebase';

function NotificationsDropdown({ user }) {
    const { userId, fallowing, docId: loggedInUserDocId } = user;
    const { firebaseApp, FieldValue } = useContext(FirebaseContext);
    const [profiles, setProfiles] = useState(null);
    const [fallowed, setFallowed] = useState(false);

    useEffect(() => {
        async function suggestedProfiles() {
            const res = await getSuggestedProfiles(userId, fallowing);
            setProfiles(res);
        }

        if (userId) {
            suggestedProfiles();
        }
    }, [userId, fallowing]);

    const handleFallowSuggestedUser = async (profileDocId, profileId, isFallow) => {
        setFallowed(!isFallow);

        // await firebaseApp.firestore().collection('users').doc(profileDocId)
        //     .update({
        //         fallowers: fallowed ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
        //     });

        await firebaseApp.firestore().collection('users').doc(loggedInUserDocId)
            .update({
                fallowing: fallowed ? FieldValue.arrayRemove(profileId) : FieldValue.arrayUnion(profileId)
            });
    }

    return (
        <motion.div
            class="absolute right-8 mt-6 bg-white z-30 rounded-md shadow-lg float-left after:w-4 after:h-6 after:bg-white after:absolute after:-top-2 after:right-4 after:-rotate-45 h-auto"
            initial={{ y: "-10vh" }}
            animate={{ y: 0 }}
        >
            <div class="p-3">
                {!profiles ? (
                    <Skeleton count={8} height={50} width={330} />
                ) : profiles?.length > 0 ? (
                    <div class="grid grid-cols-1 gap-y-4 w-[350px] md:w-auto">
                        {profiles.map((profile, index) => (
                            <div key={index} class="flex items-center justify-between gap-x-4 text-sm">
                                <Link to={`/p/${profile.username}`}
                                    class="flex items-center gap-x-3 cursor-pointer"
                                >
                                    <img alt="" src={`/images/avatars/${profile.username}.jpg`}
                                        class="w-12 h-12 rounded-full"
                                    />
                                    <div class="flex flex-wrap items-center gap-x-3">
                                        <p class="font-bold">{profile.username}</p>
                                        <p class="">start following you.</p>
                                        <p class="font-bold text-[#a7a7a7] -ml-2">{formatDistance(profile.dateCreated, new Date()).substring(0, 4)}</p>
                                    </div>
                                </Link>
                                <button
                                    class={`${profile.isFallowingProfile ? "border border-gray-base" : "text-white bg-blue-medium"} px-3 py-1 rounded`}
                                    onClick={() => handleFallowSuggestedUser(profile.docId, profile.userId, profile.isFallowingProfile)}
                                >
                                    {profile.isFallowingProfile ? "Unfallow" : "Fallow"}
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div class="grid place-items-center w-44 h-44">

                    </div>
                )}
            </div>
        </motion.div>
    )
}

NotificationsDropdown.propTypes = {
    setNotifDropdown: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    setDropdown: PropTypes.func.isRequired
}

export default NotificationsDropdown;