import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

import AddComment from './AddComment';

function Comments({ docId, comments: allComments, posted, inputComment }) {
    const [comments, setComments] = useState(allComments);

    return <div class="px-4 text-sm pb-3 pt-1">
        {comments.length >= 3 && (
            <p class="text-gray-base cursor-pointer mb-1">
                View all {comments.length} comments
            </p>
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
    comments: PropTypes.array.isRequired,
    posted: PropTypes.number.isRequired,
    inputComment: PropTypes.object.isRequired
}

export default Comments;