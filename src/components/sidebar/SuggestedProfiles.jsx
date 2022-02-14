import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

import {
    updateFallowedUserFallowers, updateLoggedInUserFallowing
} from '../../services/firebase';

function SuggestedProfiles(props) {
    const { username, userId, profileId, profileDocId, loggedInUserDocId, fullName, dateCreated, avatar, explore } = props;
    const [fallowed, setFallowed] = useState(false);
    const date = Number(formatDistance(dateCreated, new Date()).substring(0, 2));
    const day = formatDistance(dateCreated, new Date()).slice(3);

    const handleFallowSuggestedUser = async () => {
        setFallowed(true);
        await updateLoggedInUserFallowing(loggedInUserDocId, profileId, false);
        await updateFallowedUserFallowers(profileDocId, userId, false);
    }

    return !fallowed ? (
        <div class="">
            <div class="flex items-center justify-between">
                <Link to={`/p/${username}`}
                    class="flex items-center text-[#262626] justify-between gap-x-3"
                >
                    <img alt="" class={`${explore ? "h-12 w-12" : "w-8 h-8"} rounded-full border border-gray-primary`}
                        src={avatar ? avatar : `/images/avatars/default.png`}
                    />
                    <div class={`${explore ? "text-[12px] font-bold" : "text-[11px]"}`}>
                        <p class="text-[16px]">{username}</p>
                        {explore && <p class="text-[#959494]">{fullName}</p>}
                        <p class="text-[#959494]">
                            {date <= 29 && day === 'days' ? "New on instagram" : "suggestions for you"}
                        </p>
                    </div>
                </Link>
                <div class="flex items-center justify-between">
                    <button class="text-blue-medium text-sm"
                        onClick={() => handleFallowSuggestedUser()}
                    >
                        Follow
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}

SuggestedProfiles.propTypes = {
    username: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    profileDocId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired,
}

export default SuggestedProfiles;