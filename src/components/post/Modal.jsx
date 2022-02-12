import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

import { firebaseApp } from '../../lib/firebase';
import CanclePost from './CanclePost.jsx';

function Modal({ url, user, setIsShow, setUrl }) {
  const [value, setValue] = useState('');
  const [cancle, setCancle] = useState(false);

  const handleSubmit = async () => {
    await firebaseApp.firestore().collection('photos')
      .add({
        caption: value,
        likes: [],
        comments: [],
        userId: user.userId,
        imageSrc: url,
        dateCreated: Date.now(),
        userLatitude: '',
        userLongitude: '',
        photoId: ''
      });

    setIsShow(false);
    setUrl(null);
  }

  return <div
    class="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] z-40 w-full grid place-items-center px-0 md:px-6"
  >
    <div class="absolute top-3 right-6 text-white cursor-pointer "
      onClick={() => setCancle(!cancle)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
    {cancle && (
      <CanclePost setCancle={setCancle} url={url} setUrl={setUrl} setIsShow={setIsShow} />
    )}
    <motion.div
      class="bg-white max-w-screen-lg rounded h-auto shadow"
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
    >
      <div class="flex items-center justify-between p-2">
        <button class="px-6 text-red-primary font-bold text-sm"
          onClick={() => setCancle(!cancle)}
        >
          Cancle
        </button>
        <p class="font-bold  text-[#333333]">Create a new post</p>
        <button class="px-6 text-blue-medium font-bold text-sm"
          onClick={handleSubmit}
        >
          Share
        </button>
      </div>
      <div class="grid grid-cols-2 h-[400px]">
        <div class="flex-1 h-full">
          <hr class="text-gray-primary" />
          {url ? (
            <img alt="" src={url}
              class="h-full object-cover"
            />
          ) : (<Skeleton count={1} height={400} class="w-full" />)}
        </div>
        <div class="relative overflow-scroll text-[#333333] border border-gray-primary">
          <div class="p-4 space-y-3">
            <div class="flex items-center gap-x-3">
              <img alt="" src={`/images/avatars/${user.username}.jpg`}
                class="w-8 h-8 rounded-full"
              />
              <p class="font-bold text-sm">{user.username}</p>
            </div>
            <textarea type="texterea" class="h-32 w-full outline-none resize pb-10 "
              placeholder="Write a description"
              onChange={(e) => setValue(e.target.value)}
              multiligne="true"
            />
          </div>
          <div class="absolute bottom-0 w-full">
            <div class="border-t border-gray-primary flex items-center justify-between p-3">
              <p class="text-sm">Add location</p>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div class="border-t border-gray-primary flex items-center justify-between p-3">
              <p class="text-sm">Accessibility</p>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div class="border-t border-gray-primary flex items-center justify-between p-3">
              <p class="text-sm">Advanced settings </p>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>;
}

Modal.propTypes = {
  user: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  setIsShow: PropTypes.func.isRequired,
  setUrl: PropTypes.func.isRequired
}

export default Modal;