import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';


import { stack } from './stackListModule';

import Stack from '../Stack/Stack';


const mapStateToProps = state => ({
    stackList: state.stackListStore,
    apiUrl: state.appStore.get('apiUrl'),
    staticPath: state.appStore.get('staticPath'),
});

const mapDispatchToProps = {
    loadStackList: stack.request,
    unloadStackList: stack.clear,
};

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
