import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

import AddComment from './AddComment';

function Comments({ docId, comments: allComments, posted,
    inputComment, setViewComments, userId
}) {
    const [comments, setComments] = useState(allComments);

    const viewComments = () => {
        setViewComments(true);
    }

    return <div class="px-4 text-sm pb-3 pt-1">
        {comments.length >= 3 && (
            <Link to={`/p/${docId}`} class="text-gray-base cursor-pointer mb-1"
                onClick={() => viewComments()}
            >
                View all {comments.length} comments
            </Link>
        )}
        {comments.slice(0, 3).map((item, index) => (
            <p class="mb-1 flex" key={index}>
                <Link to={`/p/${item.displayName}`}
                    class=""
                >
                    <p class="font-bold mr-1">{item.displayName}</p>
                </Link>
                <p class="">{item.comment}</p>
            </p>
        ))}
        <p class="text-gray-base text-xs uppercase font-bold">
            {formatDistance(posted, new Date())} ago
        </p>
        <AddComment docId={docId} comments={comments}
            setComments={setComments} inputComment={inputComment}
        />
    </div>;
}

Comments.propTypes = {
    docId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    inputComment: PropTypes.object.isRequired,
    setViewComments: PropTypes.func.isRequired,
}

export default Comments;