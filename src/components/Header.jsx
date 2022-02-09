import React, { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import { useUser } from '../hooks/useUser';
import { loggedInUserPost } from '../services/firebase';
import Modal from './post/Modal';

function Header() {
    const navigate = useNavigate();
    const { firebaseApp } = useContext(FirebaseContext);
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser.uid);
    const [url, setUrl] = useState(null);
    const [isShow, setIsShow] = useState(false);
    const postRef = useRef(null);

    const types = ["image/png", "image/jpeg"];

    const handlePost = async (event) => {
        const selected = event.target.files[0];
        if (types.includes(selected.type)) {
            await loggedInUserPost(selected, setUrl, user.userId);
            setIsShow(true);
        }
    }

    const handlePostRef = () => {
        postRef.current.click();
    }

    return <div class=" relative h-16 border-b border-gray-primary bg-white mb-4">
        <div class="container mx-auto max-w-screen-lg px-6 flex items-center justify-between h-full">
            <Link to="/">
                <img alt="" src="/images/logo.png" class="h-7" />
            </Link>
            {isShow && (<Modal url={url} user={user} setIsShow={setIsShow} setUrl={setUrl} />)}
            <form class="hidden">
                <input type="file" ref={postRef} onChange={handlePost} />
            </form>
            <div class="flex items-center justify-between text-gray-700 text-center">
                {user ? (
                    <div class="flex items-center gap-x-5">
                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </Link>
                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </Link>
                        <div class="border border-gray-base rounded cursor-pointer"
                            onClick={() => handlePostRef()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <button
                            type="button"
                            title="Sign Out"
                            onClick={() => {
                                firebaseApp.auth().signOut();
                                navigate('/login');
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    firebaseApp.auth().signOut();
                                    navigate('/login');
                                }
                            }}
                        >
                            <svg
                                className="w-6 h-6 text-black-light cursor-pointer"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                            </svg>
                        </button>
                        <Link to={`/p/${user.username}`} class="w-8 h-8 cursor-pointer">
                            <img alt="" src={`/images/avatars/${user.username}.jpg`} class="rounded-full" />
                        </Link>
                    </div>
                ) : (
                    <>
                        <Link to="/login">
                            <button
                                type="button"
                                className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                            >
                                Log In
                            </button>
                        </Link>
                        <Link to="/sign-up">
                            <button
                                type="button"
                                className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                            >
                                Sign Up
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    </div>;
}

export default Header;