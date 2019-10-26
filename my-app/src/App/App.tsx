import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import { path as listPath } from '../StackList/StackListRoute';
import { path as bookSearchPath } from '../BookSearch/BookSearchRoute';
import { path as loginPath } from '../Login/LoginRoute';

import { logoff as logoffAction } from './appModule';

export const App = ({ token, logoff, children }) => (
    <div className="container">
        <nav className="navbar" aria-label="main navigation">
            <li className="navbar-item"><Link to={listPath}>View Stacks</Link></li>
            <li className="navbar-item"><Link to={bookSearchPath}>Search Books</Link></li>
            {token ?
                <li className="navbar-item"><a onClick={logoff} href="#">Logoff</a></li> :
                <li className="navbar-item"><Link to={loginPath}>Login</Link></li>}
        </nav>
        {children}
    </div>
);

App.propTypes = {
    token: propTypes.string.isRequired,
    logoff: propTypes.func.isRequired,
    children: propTypes.node.isRequired,
};

const mapStateToProps = state => ({
    searchFocus: state.appStore.get('searchFocus'),
    token: state.appStore.get('token'),
});

const mapDispatchToProps = {
    logoff: logoffAction,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
