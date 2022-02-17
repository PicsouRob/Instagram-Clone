import React, { useState, useContext, useEffect } from 'react';

import LeftSide from '../components/editProfile/LeftSide';
import RightSide from '../components/editProfile/RightSide';
import Footer from '../components/Footer';
import Header from '../components/headers/Header';
import UserContext from '../context/user';
import { useUser } from '../hooks/useUser';

function EditAccount() {
    const [indexSide, setIndexSide] = useState(1);
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser.uid);

    useEffect(() => {
        document.title = "Edit Profile";
    }, []);

    return (
        <div class="">
            <Header />
            <div class="container mx-auto pt-[65px] md:pt-[95px] max-w-screen-lg px-0 md:px-6 pb-5 bg-white md:bg-gray-background">
                <div class="bg-white border border-gray-primary flex divide-x divide-gray-primary">
                    <LeftSide setIndexSide={setIndexSide} indexSide={indexSide} />
                    <RightSide setIndexSide={setIndexSide} indexSide={indexSide}
                        user={user}
                    />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default EditAccount;