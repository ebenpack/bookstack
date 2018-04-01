import React from 'react';
import immutablePropTypes from 'react-immutable-proptypes';

import { Link } from 'react-router';

const Stack = (props) => {
    const id = props.stack.get('id');
    const name = props.stack.get('name');
    const user = props.stack.get('user');
    const creationDate = props.stack.get('creation_date');
    return (
        <div className="stack">
            <h1 className="stackName">
                <Link to={`/list/${id}`}>{name}</Link>
            </h1>
            <div className="user">{user}</div>
            <div className="creationDate">{creationDate}</div>
        </div>
    );
};

Stack.propTypes = {
    stack: immutablePropTypes.map.isRequired,
};

export default Stack;
