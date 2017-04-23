import React from 'react';
import {connect} from 'react-redux';
import {initialize, logoff} from '../actions/App';
import {bookSearch} from '../actions/BookSearch';
import {Link} from 'react-router';

function mapDispatchToProps(dispatch) {
    return {
        initialize: () => dispatch(initialize()),
        logout: () => dispatch(logoff()),
        bookSearch: query => dispatch(bookSearch(query)),
    };
}

function mapStateToProps(state) {
    return {
        searchFocus: state.appStore.get('searchFocus'),
        token: state.appStore.get('token')
    }
}

class App extends React.Component {

    componentDidMount() {
        this.props.initialize();
    }

    render() {
        let login = (
            this.props.token ?
                <li><a onClick={this.props.logout} href="#">Logoff</a></li> :
                <li><Link to={"/login"}>Login</Link></li>
        );
        return (
            <div className="container">
                <ul className="row menu">
                    <li><Link to={"/list"}>View Stacks</Link></li>
                    <li><Link to="/booksearch">Search Books</Link></li>
                    {login}
                </ul>
                {this.props.children}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);