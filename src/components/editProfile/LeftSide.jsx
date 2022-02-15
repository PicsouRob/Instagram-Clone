import React from 'react';
import PropTypes from 'prop-types';

import { editData } from '../../services/userProfilSetting';

function LeftSide({ indexSide, setIndexSide }) {
    const handleClick = async (item, index) => {
        setIndexSide(index);
    }

    return (
        <div class="hidden md:block w-1/4 text-[#262626]">
            <div class="flex flex-col divide-y divide-gray-primary">
                <div class="flex flex-col">
                    {editData.map((item, index) => (
                        <div key={index} class={`${indexSide === index ? "border-l-2 transition transform duration-150 border-gray-base" : ""} py-3 cursor-pointer`}
                            onClick={() => handleClick(item, index)}
                        >
                            <p class={`${indexSide === index ? "font-bold text-[#575656]  text-[0.870rem]" : ""} pl-6`}>{item.title}</p>
                        </div>
                    ))}
                    <div class="py-5 text-center">
                        <button class="text-blue-medium text-sm font-bold w-full px-6 mb-6">
                            Switch to Professional Account
                        </button>
                    </div>
                </div>
                <a href="https://accountscenter.instagram.com/profiles"
                    class="space-y-3 p-6 cursor-pointer"
                >
                    <img alt="" src="/images/meta.png" class="h-10 -mt-2 -ml-3  p-0" />
                    <span class="text-blue-medium font-bold">
                        Account Center
                    </span>
                    <p class="text-[12px]">
                        Control settings for connected experiences across Instagram, the Facebook app and Messenger, including story and post sharing and logging in.
                    </p>
                </a>
            </div>
        </div>
    )
}

LeftSide.propTypes = {
    indexSide: PropTypes.number.isRequired,
    setIsShow: PropTypes.func.isRequired,
}

export default LeftSide;