import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../../context/user';
import FirebaseContext from '../../context/firebase';

function Action({ docId, totalLikes, likedPhoto, handleFocus }) {
    const { user: { uid: userId } } = useContext(UserContext);
    const { firebaseApp, FieldValue } = useContext(FirebaseContext);
    const [toggleLikePhoto, setToggleLikePhoto] = useState(likedPhoto);
    const [likes, setLikes] = useState(totalLikes);

    const handleLikePhoto = async () => {
        setToggleLikePhoto(like => !like);

        await firebaseApp.firestore().collection('photos')
            .doc(docId).update({
                likes: toggleLikePhoto ? FieldValue.arrayRemove(userId) :
                    FieldValue.arrayUnion(userId)
            });

        setLikes((likes) => toggleLikePhoto ? likes - 1 : likes + 1);
    }

    return <div class="px-4 py-2">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" class={`h-7 w-7 ${toggleLikePhoto ? "fill-red text-red-primary" : "text-[#262626]"} cursor-pointer select-none`} fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    onClick={handleLikePhoto}
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <svg aria-label="Comentar" class="_8-yf5 cursor-pointer" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"
                    onClick={handleFocus}
                >
                    <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
                <svg aria-label="Compartir publicación" class="_8-yf5 cursor-pointer" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                    <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
                </svg>
            </div>
            <div class="cursor-pointer select-none">
                <svg aria-label="Guardar" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
            </div>
        </div>
        <div class="pt-1">
            <p class="text-sm font-bold">
                {likes === 1 ? `${likes} like` : `${likes} likes`}
            </p>
        </div>
    </div>;
}

Action.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired
}

export default Action;