import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as propTypes from 'prop-types';
import * as immutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';

import Stack from '../Stack/Stack';
import { IStackRecord } from '../Stack/types';
import { initializeStack } from './stackListModule';

interface StackListProps {
    stackList: List<IStackRecord>,
    initializeStack: () => void
}

export const StackList = ({ stackList, initializeStack }: StackListProps) => {
    useEffect(() => initializeStack, []); // TODO: can this be point free, of will that weird up hook?
    return (
        <div className="stacklist">
            {stackList.map((stack) => (
                <Stack
                    key={stack.get('id')}
                    stack={stack}
                />
            ))}
        </div>
    );
};

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

const mapDispatchToProps = {
    initializeStack
}

export default connect(mapStateToProps, mapDispatchToProps)(StackList);
