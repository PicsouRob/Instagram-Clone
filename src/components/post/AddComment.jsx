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
        <form class="flex justify-between items-center gap-x-1">
            <svg aria-label="Emoji" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>
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