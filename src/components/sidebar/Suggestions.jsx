import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { faker } from '@faker-js/faker';

import { Link } from 'react-router-dom';

import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfiles from './SuggestedProfiles';

function Suggestions({ userId, fallowing, loggedInUserDocId }) {
    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        async function suggestedProfiles() {
            const res = await getSuggestedProfiles(userId, fallowing);
            const data = await [...Array(20)].map((_, i) => ({
                ...faker.helpers.contextualCard(), id: i
            }));
            const dataResp = await data.map((item) => ({
                username: item.username,
                docId: item.website,
                fullName: item.name,
                profileId: item.email,
                dateCreated: Date.now(),
                userId: item.avatar,
                avatar: item.avatar,
            }));

            setProfiles([...res, ...dataResp]);
        }

        if (userId) {
            suggestedProfiles();
        }
    }, [userId, fallowing]);

    return !profiles ? (
        <Skeleton count={12} height={50} class="mt-5" />
    ) : profiles.length > 0 ? (
        <div class="">
            <div class="flex items-center justify-between">
                <p class="text-sm font-bold flex items-center text-[#3a3a3a]">
                    Suggestions for you
                </p>
                <Link to="/explore/people"
                    class="text-[14px] font-bold text-[#262626] p-3"
                >
                    See All
                </Link>
            </div>
            <div class="grid grid-cols-1 gap-y-2">
                {profiles.slice(0, 5).map((item) => (
                    <SuggestedProfiles
                        key={item.docId}
                        username={item.username}
                        userId={userId}
                        profileId={item.userId}
                        profileDocId={item.docId}
                        loggedInUserDocId={loggedInUserDocId}
                        fullName={item.fullName}
                        dateCreated={item.dateCreated}
                        avatar={item.avatar}
                    />
                ))}
            </div>
        </div>
    ) : null;
}

Suggestions.propTypes = {
    userId: PropTypes.string,
    loggedInUserDocId: PropTypes.string,
    fallowing: PropTypes.array,
}

export default Suggestions;