import React from 'react';

import {Link} from 'react-router';



export default function Stack(props) {
    let id = props.stack.get('id');
    let name = props.stack.get('name');
    let user = props.stack.get('user');
    let creation_date = props.stack.get('creation_date');
    return (
        <div className="stack">
            <h1 className="stackName">
                <Link to={"/list/" + id}>{name}</Link>
            </h1>
            <div className="user">{user}</div>
            <div className="creationDate">{creation_date}</div>
        </div>
    );
}