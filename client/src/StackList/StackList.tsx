import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import Stack from '../Stack/Stack';

export const StackList = ({ staticPath, stackList }) => (
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
