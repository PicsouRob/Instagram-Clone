import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

import { getUserById } from '../../services/firebase';
import Action from './Action';
import AddComment from './AddComment';

function ViewComments({ content, setViewComments,
    handleFocus, inputComment
}) {
    const [userView, setUserView] = useState({});
    const { username, avatar } = userView;
    const { docId, likes, isUserlikePhotos, comments: allComments
    } = content;
    const [comments, setComments] = useState(allComments);

    useEffect(() => {
        const getUser = async () => {
            const [user] = await getUserById(content.userId);
            setUserView(user);
        }

        if (content.userId) {
            getUser();
        }
    }, [content.userId]);

    const cancleEvent = (event) => {
        if (event.target.classList.contains('cancle')) {
            setViewComments(false);
        }
    }

    return (
        <motion.div
            class="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.3)] z-40 w-full grid place-items-center px-0 md:px-6 cancle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={cancleEvent}
        >
            <motion.div
                class="bg-white w-3/4 h-5/6 mx-auto rounded-lg shadow grid grid-cols-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
            >
                <div class="col-span-1 overflow-hidden">
                    <img alt="" src='/images/users/raphael/1.jpg'
                        class="w-full h-full rounded-l-lg object-fill"
                    />
                </div>
                <div class="col-span-1 text-[#4d4d4d]">
                    <div class="p-3 flex items-center justify-between">
                        <div class="flex items-center gap-x-4">
                            {!avatar ? (
                                <Skeleton count={1} width={40} height={40}
                                    circle />
                            ) : (
                                <img alt="" src={avatar}
                                    class="w-12 h-12 rounded-full"
                                />
                            )}
                            <p class="font-bold text-sm">{username}</p>
                            <button class="text-[12px] font-bold">
                                Fallow
                            </button>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                    </div>
                    <div class=""></div>
                    <div class="">
                        <Action docId={docId} totalLikes={likes.length}
                            likedPhoto={isUserlikePhotos}
                            handleFocus={() => handleFocus()}
                        />
                    </div>
                    <div class="">
                        <AddComment docId={docId} comments={comments}
                            setComments={setComments} inputComment={inputComment}
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

ViewComments.propTypes = {
    setViewComments: PropTypes.func.isRequired,
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        caption: PropTypes.string.isRequired,
        dateCreated: PropTypes.number.isRequired,
        isUserlikePhotos: PropTypes.bool,
        imageSrc: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
    }),
    inputComment: PropTypes.func.isRequired,
    handleFocus: PropTypes.func.isRequired,

}

export default ViewComments;