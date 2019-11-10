import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { path as listPath } from '../StackList/StackListRoute';
import { path as bookSearchPath } from '../BookSearch/BookSearchRoute';
import { path as loginPath } from '../Login/LoginRoute';

import { logoff as logoffAction } from './appModule';
import { AppState } from '../store';


interface StateFromProps{
    token: string;
}

interface StateFromProps  {
    logoff: typeof logoffAction;
};

type AppProps = StateFromProps & StateFromProps;

export class App extends React.Component<AppProps> {
    render() {
        const { token, logoff, children } = this.props;
        return (
            <div className="container">
                <nav className="navbar" aria-label="main navigation">
                    <li className="navbar-item"><Link to={listPath}>View Stacks</Link></li>
                    <li className="navbar-item"><Link to={bookSearchPath}>Search Books</Link></li>
                    {token ?
                        <li className="navbar-item"><button onClick={logoff}>Logoff</button></li> :
                        <li className="navbar-item"><Link to={loginPath}>Login</Link></li>}
                </nav>
                {children}
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    token: state.appStore.token,
});

const mapDispatchToProps = {
    logoff: logoffAction,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
