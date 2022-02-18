import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Image({ src, caption, docId }) {
    return <Link to={`/post/${docId}`}>
        <img alt={caption} src={src} />
    </Link>;
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
}

export default Image;