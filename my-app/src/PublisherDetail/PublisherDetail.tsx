import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as propTypes from 'prop-types';
import * as immutablePropTypes from 'react-immutable-proptypes';

import Book from '../Book/Book';

import { initializePublisher } from './publisherDetailModule';
import { List } from 'immutable';
import { IBook } from '../Book/types';
import { AppState } from '../store';

interface StateFromProps {
    name: string;
    books: List<IBook>;
}

interface StateFromDispatch {
    initializePublisher: typeof initializePublisher;
}

type PublisherDetailProps = StateFromProps & StateFromDispatch;

export class PublisherDetail extends React.Component<PublisherDetailProps> { 
    render() {
        const { name, books, initializePublisher } = this.props;
        useEffect(() => {
            initializePublisher()
        }, [])
        return (
            <div className="author">
                <h2>{name}</h2>
                {books.map(book => (<Book key={book.id} book={book} />))}
            </div>
        );
    };
}

const mapStateToProps = (state: AppState) => ({
    name: state.publisherDetailStore.name,
    books: state.publisherDetailStore.books,
});

const mapDispatchToProps = {
    initializePublisher
}

export default connect(mapStateToProps, mapDispatchToProps)(PublisherDetail);
