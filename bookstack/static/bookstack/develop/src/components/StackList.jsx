import React from 'react';
import {connect} from 'react-redux';

import {loadStackList, unloadStackList} from '../actions/StackListActions';

import Stack from './Stack.jsx';


function mapStateToProps(state) {
    return {
        stackList: state.stackListStore,
        apiUrl: state.appStore.get('apiUrl')
    }
}

class StackList extends React.Component {
    componentDidMount() {
        this.props.dispatch(loadStackList(this.props.apiUrl));
    }

    componentWillUnmount() {
        this.props.dispatch(unloadStackList);
    }

    render() {
        const staticPath = this.props.staticPath;
        return (
            <div className="stacklist">
                {this.props.stackList.map(function (stack, i) {
                    return <Stack key={i} data={stack} staticPath={staticPath}/>;
                })}
            </div>
        );
    }
}
export default connect(
    mapStateToProps
)(StackList);