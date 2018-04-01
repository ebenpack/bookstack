import React from 'react';
import { Link } from 'react-router';
import immutablePropTypes from 'react-immutable-proptypes';

const Author = ({ author }) => {
    const id = author.get('id');
    const name = author.get('name');
    return (
        <li className="author">
            {id ? (
                <Link to={`/author/${id}`}>
                    {name}
                </Link>) :
                name
            }
        </li>
    );
};

Author.propTypes = {
    author: immutablePropTypes.map.isRequired,
};

export default Author;
