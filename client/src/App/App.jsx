import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import propTypes from 'prop-types';

import { initialize, logoff } from './appModule';
import { bookSearch } from '../BookSearch/bookSearchModule';

const mapStateToProps = state => ({
    searchFocus: state.appStore.get('searchFocus'),
    token: state.appStore.get('token'),
});

const mapDispatchToProps = {
    initialize,
    logoff,
    bookSearch,
};

class App extends React.Component {
    componentDidMount() {
        this.props.initialize();
    }

    render() {
        const login = (
            this.props.token ?
                <li><a onClick={this.props.logoff} href="#">Logoff</a></li> :
                <li><Link to="/login">Login</Link></li>
        );
        return (
            <div className="container">
                <ul className="row menu">
                    <li><Link to="/list">View Stacks</Link></li>
                    <li><Link to="/booksearch">Search Books</Link></li>
                    {login}
                </ul>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    initialize: propTypes.func.isRequired,
    token: propTypes.string.isRequired,
    logoff: propTypes.func.isRequired,
    children: propTypes.node.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
