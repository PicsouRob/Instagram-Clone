import React, { useContext } from 'react';

import LoggedInUserContext from '../../context/loggedInUserContext';
import Suggestions from './Suggestions';
import User from './User';
import Footer from './Footer';

function Sidebar() {
    const { user: { username, fullName, userId,
        fallowing, docId, avatar }
    } = useContext(LoggedInUserContext);

    return <div class="relative">
        <div class="">
            <div class="fixed w-fit">
                <User username={username} avatar={avatar} fullName={fullName} />
                <div class="w-3/5 inline-block">
                    <Suggestions userId={userId} fallowing={fallowing} loggedInUserDocId={docId} />
                </div>
                <div class="w-3/5 inline-block">
                    <Footer />
                </div>
            </div>
        </div>
    </div>;
}

export default Sidebar;