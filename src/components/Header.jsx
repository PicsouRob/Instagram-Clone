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
    const [value, setValue] = useState('');
    const postRef = useRef(null);

    const types = ["image/png", "image/jpeg"];

    const handlePost = async (event) => {
        const selected = event.target.files[0];
        if (types.includes(selected.type)) {
            await loggedInUserPost(selected, setUrl, user.userId);
            setIsShow(true);
        }
    }

    return <div class="h-16 border-b border-gray-primary w-full bg-white mb-4 fixed z-30">
        <div class="relative container mx-auto max-w-screen-lg px-3 md:px-6 flex items-center justify-between h-full">
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
                    <div class="relative flex items-center gap-x-4 sm:gap-x-5">
                        <div class="hidden md:flex items-center gap-x-2 text-[#333333] bg-[rgba(0,0,0,0.1)] text-sm rounded-md w-auto py-2 px-3 mr-16">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-[rgba(0,0,0,0.3)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input type="text" placeholder="Search"
                                onChange={(e) => setValue(e.target.value)}
                                class="bg-[rgba(0,0,0,0.0)] focus:outline-none w-56"
                            />
                        </div>
                        <Link to="/">
                            <svg aria-label="Inicio" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z">
                                </path>
                            </svg>
                        </Link>
                        <Link to="/direct/inbox">
                            <svg aria-label="Messenger" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <path d="M12.003 2.001a9.705 9.705 0 110 19.4 10.876 10.876 0 01-2.895-.384.798.798 0 00-.533.04l-1.984.876a.801.801 0 01-1.123-.708l-.054-1.78a.806.806 0 00-.27-.569 9.49 9.49 0 01-3.14-7.175 9.65 9.65 0 0110-9.7z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="1.739"></path><path d="M17.79 10.132a.659.659 0 00-.962-.873l-2.556 2.05a.63.63 0 01-.758.002L11.06 9.47a1.576 1.576 0 00-2.277.42l-2.567 3.98a.659.659 0 00.961.875l2.556-2.049a.63.63 0 01.759-.002l2.452 1.84a1.576 1.576 0 002.278-.42z" fill-rule="evenodd"></path>
                            </svg>
                        </Link>
                        <div class="cursor-pointer"
                            onClick={() => setSelectPhoto(true)}
                        >
                            <svg aria-label="Nueva publicación" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
                            </svg>
                        </div>
                        <Link to="/explore">
                            <svg aria-label="Buscar personas" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <polygon fill="none" points="13.941 13.953 7.581 16.424 10.06 10.056 16.42 7.585 13.941 13.953" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon><polygon fill-rule="evenodd" points="10.06 10.056 13.949 13.945 7.581 16.424 10.06 10.056"></polygon><circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
                            </svg>
                        </Link>
                        <Link to="/">
                            <svg aria-label="Feed de actividad" class="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
                                <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
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
                                    class={`rounded-full cursor-pointer ${dropdown && "border-2 border-[#333333]"}`}
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