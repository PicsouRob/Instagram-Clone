import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
    updateFallowedUserFallowers, updateLoggedInUserFallowing
} from '../../services/firebase';

function SuggestedProfiles(props) {
    const { username, userId, profileId, profileDocId, loggedInUserDocId } = props;
    const [fallowed, setFallowed] = useState(false);

    const handleFallowSuggestedUser = async () => {
        setFallowed(true);
        await updateLoggedInUserFallowing(loggedInUserDocId, profileId, false);
        await updateFallowedUserFallowers(profileDocId, userId, false);
    }

    return !fallowed ? (
        <div class="flex items-center justify-between">
            <Link to={`/p/${username}`}
                class="flex items-center justify-between gap-x-3"
            >
                <img alt="" class="h-8 w-8 rounded-full border border-gray-primary"
                    src={`/images/avatars/${username}.jpg`}
                />
                <p class="text-sm font-bold">{username}</p>
            </Link>
            <div class="flex items-center justify-between">
                <button class="text-blue-medium text-sm"
                    onClick={() => handleFallowSuggestedUser()}
                >
                    Follow
                </button>
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