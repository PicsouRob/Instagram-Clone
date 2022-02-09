import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { getStorage, ref, deleteObject } from "firebase/storage";

function CanclePost({ setCancle, setIsShow, url, setUrl }) {
    const handleCancle = async () => {
        const storage = getStorage();
        const desertRef = await ref(storage, url);

        deleteObject(desertRef).then(() => {
            setIsShow(false);
            setUrl(null);
            console.log('successfully')
        }).catch((error) => {
            console.log(error);
            setUrl(null);
        });
    }

    const cancleEvent = (event) => {
        if (event.target.classList.contains('cancle')) {
            setCancle(false);
        }
    }

    return (
        <div
            class="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] z-50 w-full grid place-items-center px-0 md:px-6 cancle"
            onClick={cancleEvent}
        >
            <motion.div
                class="bg-white max-w-screen-lg rounded h-auto shadow"
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
            >
                <div class="py-8 text-center px-10">
                    <h3 class="text-[18px] font-bold text-[#333333]">
                        Discard post?
                    </h3>
                    <p class="">If you exit, the changes were not saved.</p>
                </div>
                <button
                    class="border-t border-[#818181] py-3 text-center w-full text-sm text-red-primary font-bold"
                    onClick={handleCancle}
                >
                    Rule Out
                </button>
                <button
                    class="border-t border-[#818181] py-3 text-center w-full text-sm text-[#333333]"
                    onClick={() => setCancle(false)}
                >
                    Cancle
                </button>
            </motion.div>
        </div>
    )
}

CanclePost.propTypes = {
    setCancle: PropTypes.func.isRequired,
    setIsShow: PropTypes.func.isRequired,
    setUrl: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
}

export default CanclePost;