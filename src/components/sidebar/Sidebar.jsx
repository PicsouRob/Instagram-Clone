import React from 'react';

import { useUser } from '../../hooks/useUser';
import Suggestions from './Suggestions';
import User from './User';

function Sidebar() {
    const { user: { username, fullName, userId, fallowing, docId } } = useUser();

    return <div class="w-full">
        <User username={username} fullName={fullName} />
        <Suggestions userId={userId} fallowing={fallowing} loggedInUserDocId={docId} />
    </div>;
}

export default Sidebar;