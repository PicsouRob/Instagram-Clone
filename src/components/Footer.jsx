import React from 'react';
import { editFooter } from '../services/userProfilSetting';

function Footer() {
    return (
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
    )
}

export default Footer;