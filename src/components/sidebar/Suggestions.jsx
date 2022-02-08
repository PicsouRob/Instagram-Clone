import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfiles from './SuggestedProfiles';

function Suggestions({ userId, fallowing, loggedInUserDocId }) {
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

    return !profiles ? (
        <Skeleton count={1} height={150} class="mt-5" />
    ) : profiles.length > 0 ? (
        <div class="flex flex-col rounded gap-y-3">
            <div class="pt-1">
                <p class="text-sm font-bold flex items-center">
                    Suggestions for you
                </p>
            </div>
            <div class="grid grid-cols-1 gap-y-2">
                {profiles.map((item) => (
                    <SuggestedProfiles
                        key={item.docId}
                        username={item.username}
                        userId={userId}
                        profileId={item.userId}
                        profileDocId={item.docId}
                        loggedInUserDocId={loggedInUserDocId}
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