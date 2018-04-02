import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import Book from '../Book/Book';

const mapStateToProps = state => ({
    name: state.publisherDetailStore.get('name'),
    id: state.publisherDetailStore.get('id'),
    books: state.publisherDetailStore.get('books'),
});

const PublisherDetail = ({ name, books }) =>  (
    <div className="author">
        <h2>{name}</h2>
        {books.map(book => (<Book key={book.get('id')} book={book} />))}
    </div>
);

PublisherDetail.propTypes = {
    name: propTypes.string.isRequired,
    books: immutablePropTypes.list.isRequired,
};

export default connect(mapStateToProps)(PublisherDetail);
