import React from 'react';
import {Link} from 'react-router';

export default function Author(props) {
    const id = props.author.get('id');
    const name = props.author.get('name');
    const author = id ?
        <Link to={"/author/" + id}>
            {name}
        </Link> :
        name;
    return (
        <li className="author">
            {author}
        </li>
    );
};