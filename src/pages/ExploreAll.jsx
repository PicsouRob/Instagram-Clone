import React, { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import Header from '../components/Header';
import { useUser } from '../hooks/useUser';
import UserContext from '../context/user';
import { getSuggestedProfiles } from '../services/firebase';
import SuggestedProfiles from '../components/sidebar/SuggestedProfiles';

function ExploreAll() {
    const { user: loggedInUser } = useContext(UserContext);
    const { user: { userId, fallowing, docId } } = useUser(loggedInUser.uid);
    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        async function suggestedProfiles() {
            const res = await getSuggestedProfiles(userId, fallowing);
            setProfiles(res);
        }

        if (userId) {
            suggestedProfiles();
        }
    }, [userId, fallowing]);

    return (
        <div class="">
            <Header />
            <div class="pt-24 md:pt-28 max-w-lg mx-auto md:px-0 bg-white md:bg-gray-background min-h-screen">
                <p class="text-sm px-3 pb-2 font-bold text-[#726d6d]">Suggestions</p>
                {!profiles ? (
                    <Skeleton count={12} height={60} class="mt-5" />
                ) : profiles?.length > 0 ? (
                    <div class="grid grid-cols-1 bg-white gap-y-5 px-3 py-4">
                        {profiles.map((item) => (
                            <SuggestedProfiles
                                key={item.docId}
                                username={item.username}
                                fullName={item.fullName}
                                userId={userId}
                                profileId={item.userId}
                                profileDocId={item.docId}
                                loggedInUserDocId={docId}
                                dateCreated={item.dateCreated}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default ExploreAll;