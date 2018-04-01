import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';


import { stack } from '../actions/StackList';

import Stack from './Stack';


function mapStateToProps(state) {
    return {
        stackList: state.stackListStore,
        apiUrl: state.appStore.get('apiUrl'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadStackList: () => dispatch(stack.request()),
        unloadStackList: () => dispatch(stack.clear()),
    };
}

class StackList extends React.Component {
    componentDidMount() {
        this.props.loadStackList();
    }

    componentWillUnmount() {
        this.props.unloadStackList();
    }

    render() {
        const { staticPath, stackList } = this.props;
        return (
            <div className="stacklist">
                {stackList.map(stck => (
                    <Stack
                        key={stck.get('id')}
                        stack={stck}
                        staticPath={staticPath}
                    />
                ))}
            </div>
        );
    }
}

StackList.defaultProps = {
    staticPath: '',
};

StackList.propTypes = {
    loadStackList: propTypes.func.isRequired,
    unloadStackList: propTypes.func.isRequired,
    staticPath: propTypes.string,
    stackList: immutablePropTypes.list.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StackList);
