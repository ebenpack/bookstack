import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as propTypes from 'prop-types';
import * as immutablePropTypes from 'react-immutable-proptypes';
import { List } from 'immutable';

import Stack from '../Stack/Stack';
import { IStackRecord } from '../Stack/types';
import { initializeStack } from './stackListModule';
import { AppState } from '../store';

interface PropsFromState {
    stackList: List<IStackRecord>,
    apiUrl: string,
    staticPath: string,
}

interface PropsFromDispatch {
    initializeStack: typeof initializeStack
}

type StackListProps = PropsFromState & PropsFromDispatch;

export class StackList extends React.Component<StackListProps> {
    render() {
        const { stackList, initializeStack } = this.props;
        useEffect(() => {
            initializeStack();
        }, []); // TODO: can this be point free, of will that weird up hook?
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
}

const mapStateToProps = (state: AppState) => ({
    stackList: state.stackListStore,
    apiUrl: state.appStore.get('apiUrl'),
    staticPath: state.appStore.get('staticPath'),
});

const mapDispatchToProps = {
    initializeStack
}

export default connect(mapStateToProps, mapDispatchToProps)(StackList);
