import React from 'react';

function Footer() {
    return (
        <div class="w-4/4">
            <div class="text-[11px] space-y-5 mt-6 text-[rgba(0,0,0,0.3)]">
                <div class="flex items-center gap-x-2 flex-wrap font-bold leading-loose">
                    <p class="cursor-pointer">Information</p>
                    <p class="cursor-pointer">Help</p>
                    <p class="cursor-pointer">Presse</p>
                    <p class="cursor-pointer">API</p>
                    <p class="cursor-pointer">Job</p>
                    <p class="cursor-pointer">Privacy</p>
                    <p class="cursor-pointer">Terms</p>
                    <p class="cursor-pointer">Locations</p>
                    <p class="cursor-pointer">Accounts</p>
                    <p class="cursor-pointer">featured</p>
                    <p class="cursor-pointer">Hashtags</p>
                    <p class="cursor-pointer">Language</p>
                </div>
                <p class="uppercase">
                    © 2022 Instagram from Meta
                </p>
            </div>
        </div>
    )
}

export default Footer;