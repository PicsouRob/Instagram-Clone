import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Image from './Image';
import Action from './Action';
import Footer from './Footer';
import Comments from './Comments';
import ViewComments from './ViewComments';

function Post({ content }) {
    const { username, caption, imageSrc, docId, comments,
        likes, dateCreated, isUserlikePhotos
    } = content;
    const inputComment = useRef(null);
    const [viewComments, setViewComments] = useState(true);

    const handleFocus = () => inputComment.current.focus();

    return (
        <div class="relative rounded bg-white border border-gray-primary">
            <Header username={username} />
            <Image caption={caption} src={imageSrc} />
            <Action docId={docId} totalLikes={likes.length}
                likedPhoto={isUserlikePhotos}
                handleFocus={() => handleFocus()}
            />
            {viewComments && (
                <ViewComments content={content} setViewComments={setViewComments}
                    handleFocus={() => handleFocus()}
                    inputComment={inputComment}
                />
            )}
            <Footer caption={caption} username={username} />
            <Comments docId={docId} comments={comments}
                inputComment={inputComment} posted={dateCreated}
            />
        </div>
    )
}

Post.propTypes = {
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
    })
}

export default Post;