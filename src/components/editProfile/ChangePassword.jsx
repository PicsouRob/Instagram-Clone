import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import { Formik } from 'formik';
import * as yup from 'yup';

const validate = yup.object().shape({

});

function ChangePassword({ user }) {
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
                            onSubmit={(values) => console.log(values)}
                        >
                            {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                <form onSubmit={handleSubmit} class="w-full space-y-4">
                                    <div class="flex flex-col md:flex-row gap-y-2 gap-x-10">
                                        <div class="w-full md:w-1/4">
                                            <p class="font-bold text-sm text-left md:text-right">Old Password</p>
                                        </div>
                                        <div class="w-full md:w-3/4">
                                            <input type="password" value={user.username}
                                                name="password"
                                                class="border border-gray-primary text-sm p-1 bg-gray-background w-full rounded-sm"
                                                onChange={handleChange}
                                            />
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
                                        </div>
                                    </div>
                                    <div class="relative flex flex-col md:flex-row gap-x-5 md:gap-x-10">
                                        <div class="w-auto md:w-1/4">
                                            <p class="hidden md:block font-bold text-sm text-left md:text-right text-white select-none">New Password</p>
                                        </div>
                                        <div class="w-full md:w-3/4">
                                            <button type="submit" class={`${errors && "opacity-80"} text-white bg-blue-medium text-sm font-bold px-3 py-1 rounded-md mt-5`}>
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