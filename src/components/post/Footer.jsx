import React from 'react';
import PropTypes from 'prop-types';

function Footer({ caption, username }) {
    return <div class="flex gap-1 px-4 text-sm">
        <p class="font-bold">{username}</p>
        <p class="">{caption}</p>
    </div>;
}

Footer.propTypes = {
    caption: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
}

export default Footer;