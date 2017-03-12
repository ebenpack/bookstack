import React from 'react';
import {Link} from 'react-router';

export default function Publisher(props) {
    const id = props.publisher.get('id');
    const name = props.publisher.get('name');
    return (
        <div className="publisher">
            <Link to={"/publisher/" + id}>
                {name}
            </Link>
        </div>
    );
}