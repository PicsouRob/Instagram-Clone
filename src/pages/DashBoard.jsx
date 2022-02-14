import React, { useEffect } from 'react';

import Header from '../components/headers/Header';
import Timeline from '../components/Timeline';
import Sidebar from '../components/sidebar/Sidebar';
import LoggedInUserContext from '../context/loggedInUserContext';
import { useUser } from '../hooks/useUser';

function Home({ user: loggedInUser }) {
    const { user, setActiveUser } = useUser(loggedInUser.uid);

    useEffect(() => {
        document.title = "Instagram"
    }, []);

    return <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
        <div class="relative w-full bg-gray-background mx-auto min-h-screen">
            <Header />
            <div class="pt-[65px] md:pt-[95px] container mx-auto max-w-screen-lg px-0 md:px-6">
                <div class="flex gap-x-6">
                    <div class="w-full lg:w-4/6">
                        <Timeline />
                    </div>
                    <div class="hidden lg:flex lg:w-2/6 h-auto">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    </LoggedInUserContext.Provider>
}

export default Home;