import React from 'react';
import {connect} from 'react-redux';

import {loadStackList, unloadStackList} from '../actions/StackList';

import Stack from './Stack.jsx';


function mapStateToProps(state) {
    return {
        stackList: state.stackListStore,
        apiUrl: state.appStore.get('apiUrl')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadStackList: () => dispatch(loadStackList()),
        unloadStackList: () => dispatch(unloadStackList()),
    }
}

class StackList extends React.Component {
    componentDidMount() {
        this.props.loadStackList();
    }

    componentWillUnmount() {
        this.props.unloadStackList();
    }

    render() {
        const staticPath = this.props.staticPath;
        return (
            <div className="stacklist">
                {this.props.stackList.map((stack, i) =>
                    <Stack key={i} stack={stack} staticPath={staticPath}/>
                )}
            </div>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StackList);