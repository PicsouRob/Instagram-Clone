import React, { useState, useContext, useEffect } from 'react';

import LeftSide from '../components/editProfile/LeftSide';
import RightSide from '../components/editProfile/RightSide';
import Header from '../components/headers/Header';
import UserContext from '../context/user';
import { useUser } from '../hooks/useUser';
import { editFooter } from '../services/userProfilSetting';

function EditAccount() {
    const [indexSide, setIndexSide] = useState(0);
    const { user: loggedInUser } = useContext(UserContext);
    const { user } = useUser(loggedInUser.uid);

    useEffect(() => {
        document.title = "Edit Profile";
    }, []);

    return (
        <div class="">
            <Header />
            <div class="container mx-auto pt-[95px] max-w-screen-lg px-0 md:px-6 pb-5">
                <div class="bg-white border border-gray-primary flex divide-x divide-gray-primary">
                    <LeftSide setIndexSide={setIndexSide} indexSide={indexSide} />
                    <RightSide setIndexSide={setIndexSide} indexSide={indexSide}
                        user={user}
                    />
                </div>
                <div class=" max-w-screen-lg mx-auto py-6 grid place-items-center gap-y-3 text-[#999999]">
                    <div class="flex justify-center flex-wrap gap-x-5 text-center leading-loose">
                        {editFooter.map((item, index) => (
                            <div key={index} class="text-center cursor-pointer">
                                <p class="text-[11px] font-bold">{item.title}</p>
                            </div>
                        ))}
                    </div>
                    <div class="flex items-center gap-x-4">
                        <select class="bg-gray-background text-[12px] cursor-pointer">
                            <option value="Espanol">Espanol</option>
                        </select>
                        <p class="text-sm">
                            © 2022 Instagram from Meta
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditAccount;