import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import FirebaseContext from '../context/firebase';

function Login() {
    const navigate = useNavigate();
    const { firebaseApp } = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = email === '' || password === '';

    useEffect(() => {
        document.title = 'Login | Instagram';
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await firebaseApp.auth().signInWithEmailAndPassword(email, password);
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div class="container flex items-center mx-auto max-w-screen-md min-h-screen px-6 md:px-0">
            <div class="hidden md:block w-3/5 h-full">
                <img alt="" src="/images/iphone-with-profile.jpg" class="h-[450px]" />
            </div>
            <div class="flex flex-col w-full md:w-2/5 gap-y-4">
                <div class="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary pb-6">
                    <h1 class="flex justify-center w-full">
                        <img alt="" src="/images/logo.png" class="w-6/12 mb-4 mt-2" />
                    </h1>
                    {error && (
                        <div class="bg-red-100 border border-red-primary text-red-primary text-xs px-4 py-3 mb-3 rounded relative" role="alert">
                            <span class="block sm:inline">{error}</span>
                            <span class="absolute top-0 bottom-0 right-0 px-4 py-3"
                                onClick={() => setError('')}
                            >
                                <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                            </span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} action="POST">
                        <input type="text"
                            aria-label="Enter your email address"
                            placeholder="Email address"
                            class="text-sm w-full mr-3 py-5 px-4 h-2 border text-gray-base border-gray-primary mb-2"
                            onChange={({ target }) => setEmail(target.value)}
                        />
                        <input type="password"
                            aria-label="Enter your password"
                            placeholder="Password"
                            class="text-sm w-full mr-3 py-5 px-4 h-2 border text-gray-base border-gray-primary mb-2"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <button type="submit"
                            class={`font-bold bg-blue-medium text-white rounded h-8 w-full mt-2 ${isInvalid && `opacity-50`}`}
                        >
                            Log In
                        </button>
                    </form>
                    <div class="flex flex-col items-center justify-center gap-y-4 mt-4 w-full">
                        <div class="flex items-center justify-between gap-x-4 w-8/12  py-0">
                            <hr class="w-2/5 border-1 border-gray-primary" />
                            <p class="text-xs">Or</p>
                            <hr class="w-2/5 border-1 border-gray-primary" />
                        </div>
                        <div class="flex items-center gap-x-2 cursor-pointer group">
                            <img alt="" src="/images/facebook.png" class="w-6 h-6" />
                            <p class="text-xs font-bold text-blue-medium group-hover:underline">Continue with Facebook</p>
                        </div>
                        <Link to="forgot-password" class="text-xs text-center text-blue-medium hover:underline h-2">
                            Forget your password?
                        </Link>
                    </div>
                </div>
                <div class="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
                    <p class="text-sm">
                        Don't have account? {` `}
                        <Link to="/sign-up" class="text-blue-medium font-bold">
                            sign up
                        </Link>
                    </p>
                </div>
                <div class="flex justify-center items-center flex-col gap-y-3 w-full">
                    <p class="text-xs">Download app</p>
                    <div class="flex items-center gap-x-2 px-6">
                        <a class=""
                            href="https://apps.apple.com/app/instagram/id389801252?vt=lo"
                            target="_blank" rel="noreferrer"
                        >
                            <img alt="" class="h-full" src="/images/app-store.png" />
                        </a>
                        <a class=""
                            href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb&utm_campaign=loginPage&ig_mid=82F09A14-BC63-4BDE-93A6-219DD0D8B4BC&utm_content=lo&utm_medium=badge"
                            target="_blank" rel="noreferrer"
                        >
                            <img alt="" class="" src="/images/google-play.png" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;