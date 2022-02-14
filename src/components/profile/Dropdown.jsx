import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { setting } from '../../services/userProfilSetting';
import { firebaseApp } from '../../lib/firebase';

function Dropdown({ setDropdown }) {
    const navigate = useNavigate();
    const cancleEvent = (event) => {
        if (event.target.classList.contains('cancle')) {
            setDropdown(false);
        }
    }

    const handleClick = async (item) => {
        if (item.title === 'Cancle') {
            setDropdown(false);
        } else if (item.title === 'Log out') {
            setDropdown(false);
            await firebaseApp.auth().signOut();
            navigate('/login');
            window.location.reload(true);
        } else {
            navigate(item.link);
        }
    }

    return (
        <motion.div
            class="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] z-40 w-full grid place-items-center px-0 md:px-6 cancle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={cancleEvent}
        >
            <motion.div class="bg-white rounded-lg w-[24rem] grid divide-y divide-gray-primary"
                initial={{ scale: 0 }}
                animate={{ scale: 1, animationDuration: 200 }}
            >
                {setting.map((item, index) => (
                    <div key={index} class="text-center text-[13px] py-[0.8rem] cursor-pointer"
                        onClick={() => handleClick(item)}
                    >
                        <p class="">{item.title}</p>
                    </div>
                ))}
            </motion.div>
        </motion.div>
    )
}

Dropdown.propTypes = {
    setDropdown: PropTypes.object.isRequired
}

export default Dropdown;