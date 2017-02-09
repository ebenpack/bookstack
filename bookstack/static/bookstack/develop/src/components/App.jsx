import React from 'react';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import {initialize, logoff} from '../actions/AppActions';
import {bookSearch, addBook} from '../actions/BookSearchActions';
import {Link} from 'react-router';

function mapDispatchToProps(dispatch) {
    return {
        initialize: () => dispatch(initialize()),
        logoff: () => dispatch(logoff()),
        bookSearch: (query) => dispatch(bookSearch(query)),
        addBook: (apiUrl, token, book) => dispatch(apiUrl, token, book)
    };
}

function mapStateToProps(state) {
    return {
        token: state.appStore.get('token'),
        searchFocus: state.appStore.get('searchFocus')
    }
}

class App extends React.Component {

    componentDidMount() {
        this.props.initialize();
    }

    render() {
        let loggedIn = this.props.token !== '';
        let login = (
            loggedIn ?
                <li><a onClick={() => this.props.logoff()} href="#">Logoff</a></li> :
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

export
default

connect(mapStateToProps,
    mapDispatchToProps)

(
    App
)
;