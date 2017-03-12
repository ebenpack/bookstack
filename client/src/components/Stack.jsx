import React from 'react';

import { Link } from 'react-router';


export default  function Stack(props) {
    let id = props.data.get('id');
    let name = props.data.get('name');
    let user = props.data.get('user');
    let creation_date = props.data.get('creation_date');
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