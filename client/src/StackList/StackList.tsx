import * as React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import Stack from '../Stack/Stack';
import { initializeStack } from './stackListModule';
import { AppState } from '../store';

import { IStackDetail } from '../StackDetail/types';

interface PropsFromState {
    stackList: List<IStackDetail>,
    apiUrl: string,
    staticPath: string,
}

interface PropsFromDispatch {
    initializeStack: typeof initializeStack
}

type StackListProps = PropsFromState & PropsFromDispatch;

export class StackList extends React.Component<StackListProps> {
    componentDidMount() {
        const { initializeStack } = this.props;
        initializeStack();
    }
    render() {
        const { stackList } = this.props;
        return (
            <div className="stacklist">
                {stackList.map((stack: IStackDetail) => {
                    return (
                    <Stack
                        key={stack.id}
                        stack={stack}
                    />
                )})}
            </div>
        );
    };
}

const mapStateToProps = (state: AppState) => ({
    stackList: state.stackListStore,
    apiUrl: state.appStore.apiUrl,
    staticPath: state.appStore.staticPath,
});

const mapDispatchToProps = {
    initializeStack
}

export default connect(mapStateToProps, mapDispatchToProps)(StackList);
