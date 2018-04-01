import React from 'react';
import { Link } from 'react-router';
import immutablePropTypes from 'react-immutable-proptypes';

const Author = (props) => {
    const id = props.author.get('id');
    const name = props.author.get('name');
    const author = id ? (
        <Link to={`/author/${id}`}>
            {name}
        </Link>) :
        name;
    return (
        <li className="author">
            {author}
        </li>
    );
};

Author.propTypes = {
    author: immutablePropTypes.map.isRequired,
};

export default Author;
