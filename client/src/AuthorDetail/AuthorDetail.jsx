import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import Book from '../Book/Book';

export const AuthorDetail = ({ name, books }) => (
    <div className="author">
        <h2>{name}</h2>
        {books.map(book => (<Book key={book.get('id')} book={book} />))}
    </div>
);

AuthorDetail.propTypes = {
    name: propTypes.string.isRequired,
    books: immutablePropTypes.list.isRequired,
};

const mapStateToProps = state => ({
    apiUrl: state.appStore.get('apiUrl'),
    name: state.authorDetailStore.get('name'),
    books: state.authorDetailStore.get('books'),
});

export default connect(mapStateToProps)(AuthorDetail);
