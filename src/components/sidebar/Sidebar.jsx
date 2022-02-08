import React, { useContext } from 'react';

import LoggedInUserContext from '../../context/loggedInUserContext';
import Suggestions from './Suggestions';
import User from './User';

function Sidebar() {
    const { user: { username, fullName, userId, 
        fallowing, docId } 
    } = useContext(LoggedInUserContext);

    return <div class="w-full">
        <User username={username} fullName={fullName} />
        <Suggestions userId={userId} fallowing={fallowing} loggedInUserDocId={docId} />
    </div>;
}

export default Sidebar;