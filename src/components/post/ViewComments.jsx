import React, { useEffect, useState, useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import { formatDistance } from 'date-fns';
import { useParams } from 'react-router-dom';

import {
    getUserById, isUserFallowingProfile, toggleFallow, getPostByDocId
} from '../../services/firebase';
import Footer from './../Footer.jsx';
import Action from './Action';
import AddComment from './AddComment';
import ModalCommentsViews from './ModalCommentsViews';
import HeaderCommentsView from './HeaderCommentsView';
import Header from '../headers/Header';
import UserContext from '../../context/user';
import { useUser } from '../../hooks/useUser';

function ViewComments() {
    const [userView, setUserView] = useState({});
    const { photos } = useParams();
    const { user: loggedInUser } = useContext(UserContext);
    const [content, setContent] = useState({});
    console.log('content', content)
    const { user } = useUser(loggedInUser.uid);
    const { username, avatar, docId: profileDocId } = userView;
    const { docId, likes, isUserLikePhotos, comments: allComments,
        imageSrc, dateCreated, userId: userProfileId
    } = content;
    const [comments, setComments] = useState(allComments);
    const [isFallowingProfile, setIsFallowingProfile] = useState(null);
    const inputComment = useRef(null);

    const handleFocus = async () => { }

    useEffect(() => {
        const getUser = async () => {
            const [user] = await getUserById(userProfileId);
            setUserView(user);
        }

        if (userProfileId) {
            getUser();
        }
    }, [userProfileId]);

    useEffect(() => {
        const getPost = async () => {
            const post = await getPostByDocId(photos);
            setContent(post);
        }

        if (photos) {
            getPost();
        }
    }, [photos]);

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
        await toggleFallow(isFallowingProfile, user.docId, profileDocId, userProfileId, user.userId);
    }

    return (
        <div
            class=""
        >
            <Header />
            <div class="pt-[65px] md:pt-[95px] pb-12 px-0 sm:px-5 md:px-16">
                <motion.div
                    class="w-full md:w-3/4 mx-auto bg-gray-background md:bg-white border border-gray-background md:border-gray-primary grid grid-cols-1 md:grid-cols-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    <div class="col-span-1 overflow-hidden">
                        <div class="flex md:hidden">
                            <HeaderCommentsView avatar={avatar} username={username}
                                isFallowingProfile={isFallowingProfile}
                                handleFallowUser={handleFallowUser}
                                header
                            />
                        </div>
                        <img alt="" src={imageSrc}
                            class="w-full object-fill"
                        />
                    </div>
                    <div class="relative text-[#4d4d4d]">
                        <div class="hidden md:flex">
                            <HeaderCommentsView avatar={avatar} username={username}
                                isFallowingProfile={isFallowingProfile}
                                handleFallowUser={handleFallowUser}
                            />
                        </div>
                        <div class="h-[450px] md:h-3/6 px-4 -z-10 py-2 overflow-y-auto">
                            {allComments && (
                                <ModalCommentsViews docId={docId}
                                    comments={allComments}
                                />
                            )}
                        </div>
                        <div class="absolute bottom-0 h-auto z-30 border-t border-gray-primary w-full">
                            <div class="pt-1 w-full">
                                {likes && (
                                    <Action docId={docId} totalLikes={likes.length}
                                        likedPhoto={isUserLikePhotos}
                                        handleFocus={() => handleFocus()}
                                    />
                                )}
                                {dateCreated && (
                                    <p class="text-gray-base text-xs uppercase font-bold pl-4 pb-1">
                                        {formatDistance(dateCreated, new Date())} ago
                                    </p>
                                )}
                            </div>
                            <div class="py-1">
                                {allComments && (
                                    <AddComment docId={docId} comments={comments}
                                        setComments={setComments} commentView inputComment={inputComment} modal
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
                <div class="w-full md:w-3/4 mx-auto mt-8 border-t border-gray-primary">

                </div>
                <Footer />
            </div>
        </div>
    )
}

export default ViewComments;