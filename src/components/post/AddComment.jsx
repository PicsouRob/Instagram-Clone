import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

function AddComment({ docId, setComments, comments, inputComment }) {
    const [comment, setComment] = useState('');
    const { firebaseApp, FieldValue } = useContext(FirebaseContext);
    const { user: { displayName } } = useContext(UserContext);

    const handleSubmitComment = async () => {
        const dateCreated = Date.now();
        setComments([{ comment, displayName, dateCreated }, ...comments]);
        setComment('');

        return firebaseApp.firestore().collection('photos').doc(docId)
            .update({
                comments: FieldValue.arrayUnion({
                    displayName, dateCreated, comment
                })
            });
    }

    return <div class="border-t border-gray-primary mt-2">
        <form class="flex justify-between items-center">
            <input type="text" name="add-comment"
                onChange={(event) => setComment(event.target.value)}
                class="text-sm py-3 md:py-4 px-4 text-gray-base w-full"
                placeholder="Add a comment ..." value={comment}
                ref={inputComment}
            />
            <button type="button"
                onClick={() => handleSubmitComment()}
                class={`text-sm font-bold p-2 text-blue-medium ${!comment && "opacity-50"}`}
            >
                Post
            </button>
        </form>
    </div>;
}

AddComment.propTypes = {
    docId: PropTypes.string.isRequired,
    comments: PropTypes.array.isRequired,
    setComments: PropTypes.func.isRequired,
    inputComment: PropTypes.object,
}

export default AddComment;