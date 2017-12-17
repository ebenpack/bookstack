import React from 'react';
import {connect} from 'react-redux';
import Book from '../components/Book.jsx';
import {author} from '../actions/AuthorDetail';

function mapDispatchToProps(dispatch) {
    return {
        loadAuthor: id => dispatch(author.request(id)),
    };
}

function mapStateToProps(state) {
    return {
        apiUrl: state.appStore.get('apiUrl'),
        name: state.authorDetailStore.get('name'),
        books: state.authorDetailStore.get('books'),
    }
}

// TODO: Make pure?
class AuthorDetail extends React.Component {
    componentDidMount() {
        if (this.props.params.id) {
            this.props.loadAuthor(this.props.params.id);
        }
    }

    render() {
        return (
            <div className="author">
                <h2>{this.props.name}</h2>
                {this.props.books.map(function (book) {
                    return (<Book key={book.get('id')} book={book}/>);
                })}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthorDetail);