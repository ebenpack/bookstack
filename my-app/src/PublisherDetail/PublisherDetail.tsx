import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as propTypes from 'prop-types';
import * as immutablePropTypes from 'react-immutable-proptypes';

import Book from '../Book/Book';

import { initializePublisher } from './publisherDetailModule';
import { List } from 'immutable';
import { IBook } from '../Book/types';

interface PublisherDetailProps {
    name: string,
    books: List<IBook>,
    initializePublisher: () => void,
}

export const PublisherDetail = ({ name, books, initializePublisher }: PublisherDetailProps) => {
    useEffect(initializePublisher, [])
    return (
        <div className="author">
            <h2>{name}</h2>
            {books.map(book => (<Book key={book.id} book={book} />))}
        </div>
    );
};

PublisherDetail.propTypes = {
    name: propTypes.string.isRequired,
    books: immutablePropTypes.list.isRequired,
};

const mapStateToProps = state => ({
    name: state.publisherDetailStore.get('name'),
    id: state.publisherDetailStore.get('id'),
    books: state.publisherDetailStore.get('books'),
});

const mapDispatchToProps = {
    initializePublisher
}

export default connect(mapStateToProps, mapDispatchToProps)(PublisherDetail);
