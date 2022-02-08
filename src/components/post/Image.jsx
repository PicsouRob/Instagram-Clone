import React from 'react';
import PropTypes from 'prop-types';

function Image({ src, caption }) {
    return <div>
        <img alt="" src={src} />
    </div>;
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
}

export default Image;