import * as React from 'react';
import * as immutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';

import { IStackRecord } from './types';
import { makeStackDetailPath } from '../StackDetail/StackDetailRoute';

interface StackProps {
    stack: IStackRecord
}

const Stack = ({ stack }: StackProps) => (
    <div className="stack">
        <h1 className="stackName">
            <Link to={makeStackDetailPath(stack.get('id'))}>{stack.get('name')}</Link>
        </h1>
        <div className="user">{stack.get('user')}</div>
        <div className="creationDate">{stack.get('creation_date')}</div>
    </div>
);

Stack.propTypes = {
    stack: immutablePropTypes.map.isRequired,
};

export default Stack;
