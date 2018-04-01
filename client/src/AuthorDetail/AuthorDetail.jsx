import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import Book from '../Book/Book';
import { author } from './authorDetailModule';

const mapStateToProps = state => ({
    apiUrl: state.appStore.get('apiUrl'),
    name: state.authorDetailStore.get('name'),
    books: state.authorDetailStore.get('books'),
});

const mapDispatchToProps = {
    loadAuthor: author.request,
};

// TODO: Make pure?
class AuthorDetail extends React.Component {
    componentWillMount() {
        if (this.props.params.id) {
            this.props.loadAuthor(this.props.params.id);
        }
    }

    render() {
        return (
            <div className="author">
                <h2>{this.props.name}</h2>
                {this.props.books.map(book => (<Book key={book.get('id')} book={book} />))}
            </div>
        );
    }
}

AuthorDetail.propTypes = {
    params: propTypes.shape({
        id: propTypes.string,
    }).isRequired,
    loadAuthor: propTypes.func.isRequired,
    name: propTypes.string.isRequired,
    books: immutablePropTypes.list.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(AuthorDetail);
