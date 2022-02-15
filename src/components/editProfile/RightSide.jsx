import React from 'react';
import PropTypes from 'prop-types';

import EditCurrentUser from './EditCurrentUser';
import ChangePassword from './ChangePassword';

function RightSide({ indexSide, setIndexSide, user }) {
    return (
        <div class="w-full md:w-11/12 flex justify-center py-6">
            <div class="w-full md:w-10/12 px-5 md:px-0 mx-auto">
                {indexSide === 0 && (
                    <EditCurrentUser user={user} />
                )}
                {indexSide === 1 && (
                    <ChangePassword user={user} />
                )}
            </div>
        </div>
    )
}

RightSide.propTypes = {
    indexSide: PropTypes.number.isRequired,
    setIsShow: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}

export default RightSide;