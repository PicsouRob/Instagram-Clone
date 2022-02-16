import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { EmailAuthProvider } from 'firebase/auth';

import { firebaseApp } from '../../lib/firebase.js';

const validate = yup.object().shape({
    password: yup.string().required().required(),
    newPassword: yup.string().min(6).required(),
    confirmPassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'New Passwords must match')
        .required(),
});

function ChangePassword({ user }) {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const submitNewPassword = async (values) => {
        const newPassword = values.newPassword;
        const currentUser = await firebaseApp.auth().currentUser;
        const credentials = await EmailAuthProvider.credential(user.emailAddress, values.password);
        await currentUser.reauthenticateWithCredential(credentials).then(() => {
            currentUser.updatePassword(newPassword).then(() => {
                navigate('/');
            }).catch((error) => setError(error.message));
        }).catch((error) => setError(error.message));
    }

    return (
        <motion.div class="relative w-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
        >
            <div class="relative text-[#4b4b4b] w-full">
                {!user.avatar ? (
                    <Skeleton count={1} width={40} height={40} circle />
                ) : (
                    <div class="space-y-6 w-full">
                        <div class="relative flex items-center gap-x-5 md:gap-x-10">
                            <div class="w-auto md:w-1/4">
                                <img alt="" src={user.avatar}
                                    class="w-12 h-12 float-left md:float-right rounded-full"
                                />
                            </div>
                            <div class="w-3/4">
                                <p class="font-bold">
                                    {user.username}
                                </p>
                            </div>
                        </div>
                        <Formik
                            initialValues={{ password: '', newPassword: '', confirmPassword: '' }}
                            validationSchema={validate}
                            onSubmit={(values) => submitNewPassword(values)}
                        >
                            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                <form class="w-full space-y-4">
                                    <div class="flex flex-col md:flex-row gap-y-2 gap-x-10">
                                        <div class="w-full md:w-1/4">
                                            <p class="font-bold text-sm text-left md:text-right">Old Password</p>
                                        </div>
                                        <div class="w-full md:w-3/4">
                                            <input type="password" value={values.password || ""}
                                                name="password" placeholder="Old Password"
                                                class="border border-gray-primary text-sm p-1 bg-gray-background w-full rounded-sm"
                                                onChange={handleChange}
                                            />
                                            {touched.password && errors.password && (
                                                <p class="text-[12px] text-red-primary">{errors.password}</p>
                                            )}
                                            {error.includes('The password is invalid') && (
                                                <p class="text-[12px] text-red-primary">
                                                    The password is invalid
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div class="flex flex-col md:flex-row gap-y-2 gap-x-10">
                                        <div class="w-full md:w-1/4">
                                            <p class="font-bold text-sm text-left md:text-right">New Password</p>
                                        </div>
                                        <div class="w-full md:w-3/4">
                                            <input type="password" value={values.newPassword} name="newPassword"
                                                placeholder="New Password"
                                                class="border border-gray-primary text-sm p-2 bg-gray-background w-full rounded-sm"
                                                onChange={handleChange}
                                            />
                                            {touched.newPassword && errors.newPassword && (
                                                <p class="text-[12px] text-red-primary">{errors.newPassword}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div class="flex flex-col md:flex-row gap-y-2 gap-x-10">
                                        <div class="w-full md:w-1/4">
                                            <p class="font-bold text-sm text-left md:text-right">Confirm New Password</p>
                                        </div>
                                        <div class="w-full md:w-3/4">
                                            <input type="password" value={values.confirmPassword} name="confirmPassword"
                                                placeholder="Confirm New Password"
                                                class="border border-gray-primary text-sm p-2 bg-gray-background w-full rounded-sm"
                                                onChange={handleChange}
                                            />
                                            {touched.confirmPassword && errors.confirmPassword && (
                                                <p class="text-[12px] text-red-primary">{errors.confirmPassword}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div class="relative flex flex-col md:flex-row gap-x-5 md:gap-x-10">
                                        <div class="w-auto md:w-1/4">
                                            <p class="hidden md:block font-bold text-sm text-left md:text-right text-white select-none">New Password</p>
                                        </div>
                                        <div class="w-full md:w-3/4">
                                            <button type="button" class={`${errors && "opacity-80"} text-white bg-blue-medium text-sm font-bold px-3 py-1 rounded-md mt-5`}
                                                onClick={() => handleSubmit()}
                                            >
                                                Change Password
                                            </button>
                                            <div class="w-full md:w-3/4 mt-3">
                                                <button class="text-sm font-bold text-blue-medium py-3">
                                                    Forgot Password
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

ChangePassword.propTypes = {
    user: PropTypes.object,
}

export default ChangePassword;