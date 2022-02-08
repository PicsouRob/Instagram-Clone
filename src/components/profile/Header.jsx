import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

import { isUserFallowingProfile, toggleFallow } from '../../services/firebase';
import { useUser } from '../../hooks/useUser';
import HeaderAction from './HeaderAction';

function Header(props) {
    const { profile, fallowersCount, fallowingCount,
        setFallowerCount, photosCount
    } = props;
    const { username: profileUsername, docId: profileDocId,
        userId: userProfileId, fullName,
        emailAddress
    } = profile;
    const { user } = useUser();
    const [isFallowingProfile, setIsFallowingProfile] = useState(null);
    const activeFallowBtn = user.username && user.username !== profileUsername;

    useEffect(() => {
        const isLoggedUserFallowingProfile = async () => {
            const isFallowing = await isUserFallowingProfile(user.username, userProfileId);
            setIsFallowingProfile(isFallowing);
        }

        if (user.username && userProfileId) {
            isLoggedUserFallowingProfile();
        }
    }, [user.username, userProfileId]);

    const handleFallowUser = async () => {
        setIsFallowingProfile((isFallowingProfile) => !isFallowingProfile);
        setFallowerCount({
            fallowersCount: isFallowingProfile ? fallowersCount - 1 : fallowersCount + 1
        });
        await toggleFallow(isFallowingProfile, user.docId, profileDocId, userProfileId, user.userId);
    }

    return <div class="">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-6 w-full px-6 md:px-8 mt-3 py-3">
            <div class="flex items-center gap-x-5 w-full">
                {profileUsername ? (
                    <img class="rounded-full w-24 md:w-40 h-24 md:h-40" alt=""
                        src={`/images/avatars/${profileUsername}.jpg`}
                    />
                ) : (
                    <Skeleton count={1} height={120} width={120} circle />
                )}
                <div class="block md:hidden w-full">
                    <HeaderAction profileUsername={profileUsername}
                        activeFallowBtn={activeFallowBtn}
                        isFallowingProfile={isFallowingProfile}
                        handleFallowUser={handleFallowUser}
                    />
                </div>
            </div>
            <div class="col-span-1 md:col-span-1 flex flex-col gap-y-1">
                <div class="hidden md:block">
                    <HeaderAction profileUsername={profileUsername}
                        activeFallowBtn={activeFallowBtn}
                        isFallowingProfile={isFallowingProfile}
                        handleFallowUser={handleFallowUser}
                    />
                </div>
                <div class="hidden md:flex items-center justify-between mt-2">
                    <div class="flex items-center gap-1">
                        <p class="">{photosCount}</p>
                        <p class="">Photos</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="font-bold">{fallowersCount}</span>
                        <p class="text-sm">{fallowersCount > 1 ? "Fallowers" : "Fallower"}</p>
                    </div>
                    <div class="flex items-center gap-1">
                        <span class="font-bold">{fallowingCount}</span>
                        <p class="text-sm">Fallowing</p>
                    </div>
                </div>
                <p class="text-[#333333] text-sm font-bold mt-2">{fullName}</p>
                <p class="text-sm">{emailAddress}</p>
            </div>
        </div>
        <div class="mt-10 py-2 border-t border-gray-primary px-6 md:px-8 block md:hidden">
            <div class="flex items-center justify-between text-[#333333]">
                <div class="text-center">
                    <span class="font-bold">{photosCount}</span>
                    <p class="text-sm">Photos</p>
                </div>
                <div class="text-center">
                    <span class="font-bold">{fallowersCount}</span>
                    <p class="text-sm">{fallowersCount > 1 ? "Fallowers" : "Fallower"}</p>
                </div>
                <div class="text-center">
                    <span class="font-bold">{fallowingCount}</span>
                    <p class="text-sm">Fallowing</p>
                </div>
            </div>
        </div>
    </div>;
}

Header.propTypes = {
    fallowersCount: PropTypes.number,
    photosCollection: PropTypes.array,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        fullName: PropTypes.string,
        userId: PropTypes.string,
        fallowing: PropTypes.array,
        fallowers: PropTypes.array,
    }).isRequired,
    fallowingCount: PropTypes.number,
    setFallowerCount: PropTypes.func
}

export default Header;