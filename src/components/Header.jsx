import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import UserContext from '../context/user';
import { useUser } from '../hooks/useUser';
import { loggedInUserPost } from '../services/firebase';
import Modal from './post/Modal';
import SelectPhoto from './post/SelectPhoto';
import HeaderDropdown from './HeaderDropdown';

function Header() {
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser.uid);
    const [url, setUrl] = useState(null);
    const [isShow, setIsShow] = useState(false);
    const [selectPhoto, setSelectPhoto] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const postRef = useRef(null);

    const types = ["image/png", "image/jpeg"];

    const handlePost = async (event) => {
        const selected = event.target.files[0];
        if (types.includes(selected.type)) {
            await loggedInUserPost(selected, setUrl, user.userId);
            setIsShow(true);
        }
    }

    return <div class=" relative h-16 border-b border-gray-primary bg-white mb-4">
        <div class="container mx-auto max-w-screen-lg px-6 flex items-center justify-between h-full">
            <Link to="/">
                <img alt="" src="/images/logo.png" class="h-7" />
            </Link>
            {selectPhoto && (
                <SelectPhoto postRef={postRef} setIsShow={setIsShow}
                    setSelectPhoto={setSelectPhoto}
                />
            )}
            {isShow && (<Modal url={url} user={user} setIsShow={setIsShow} setUrl={setUrl} />)}
            <form class="hidden">
                <input type="file" ref={postRef} onChange={handlePost} />
            </form>
            <div class="flex items-center justify-between text-gray-700 text-center">
                {user ? (
                    <div class="relative flex items-center gap-x-5">
                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </Link>
                        <div class="border-2 border-gray-base rounded cursor-pointer"
                            onClick={() => setSelectPhoto(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </Link>
                        <div class="relative w-8 h-8"
                            onClick={() => setDropdown(!dropdown)}
                        >
                            {!user.username ? (
                                <Skeleton count={1} height={30}
                                    width={30} circle
                                />
                            ) : (
                                <img alt="" src={`/images/avatars/${user.username}.jpg`}
                                    class="rounded-full focus:border-2 focus:outline-none focus:border-red-primary focus:shadow-outline cursor-pointer"
                                />
                            )}
                            {dropdown && (
                                <HeaderDropdown user={user} setDropdown={setDropdown} />
                            )}
                        </div>
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