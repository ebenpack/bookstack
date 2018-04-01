import React from 'react';
import immutablePropTypes from 'react-immutable-proptypes';

import { Link } from 'react-router';

const Stack = ({ stack }) => (
    <div className="stack">
        <h1 className="stackName">
            <Link to={`/list/${stack.get('id')}`}>{stack.get('name')}</Link>
        </h1>
        <div className="user">{stack.get('user')}</div>
        <div className="creationDate">{stack.get('creation_date')}</div>
    </div>
);

Stack.propTypes = {
    stack: immutablePropTypes.map.isRequired,
};

export default Stack;
