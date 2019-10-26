import * as React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';

import Stack from '../Stack/Stack';
import { IStackRecord } from '../Stack/types';

interface StackListProps {
    stackList: List<IStackRecord>
}

export const StackList = ({ stackList }: StackListProps) => (
    <div className="stacklist">
        {stackList.map((stack) => (
            <Stack
                key={stack.get('id')}
                stack={stack}
            />
        ))}
    </div>
);

StackList.defaultProps = {
    staticPath: '',
};

StackList.propTypes = {
    staticPath: propTypes.string,
    stackList: immutablePropTypes.list.isRequired,
};

const mapStateToProps = state => ({
    stackList: state.stackListStore,
    apiUrl: state.appStore.get('apiUrl'),
    staticPath: state.appStore.get('staticPath'),
});

export default connect(mapStateToProps)(StackList);
