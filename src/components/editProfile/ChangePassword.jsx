import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';

function ChangePassword({ user }) {
    return (
        <motion.div class="relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
        >
            <Skeleton count={1} width={40} height={40} circle />
            ChangePassword
        </motion.div>
    )
}

ChangePassword.propTypes = {
    user: PropTypes.object,
}

export default ChangePassword;