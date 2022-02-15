import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

function ChangePhotoModal({ setModal, user }) {
  const cancleEvent = (event) => {
    if (event.target.classList.contains('cancle')) {
      setModal(false);
    }
  }

  return (
    <motion.div
      class="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] z-40 w-full grid place-items-center px-0 md:px-6 cancle"
      onClick={cancleEvent}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        class="bg-white  w-[320px] md:w-[400px] h-auto shadow text-[#3d3d3d] text-center rounded-lg"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      >
        <div class="py-7 grid place-items-center gap-y-1">
          <img alt="" src={user.avatar} class="w-12 h-12 rounded-full" />
          <p class="font-bold">
            Synced profile photo
          </p>
          <p class="text-[15px] text-[#6e6e6e]">
            Instagram
          </p>
        </div>
        <div class="grid divide-y divide-gray-primary text-sm">
          <div class="text-blue-medium font-bold cursor-pointer py-3">
            <p class="">Upload Photo</p>
          </div>
          <div class="cursor-pointer py-3">
            <p class="">Menage Sync Settings</p>
          </div>
          <div class="text-red-primary font-bold cursor-pointer py-3">
            <p class="">Remove Current Photo</p>
          </div>
          <div class="cursor-pointer py-3"
            onClick={() => setModal(false)}
          >
            <p class="">Cancle</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

ChangePhotoModal.propTypes = {
  setModal: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default ChangePhotoModal;