import * as React from 'react';
import { connect } from 'react-redux';

import Book from '../Book/Book';

import { initializePublisher } from './publisherDetailModule';
import { List } from 'immutable';
import { IBook } from '../Book/types';
import { AppState } from '../store';

interface StateFromProps {
    name: string;
    books: List<IBook>;
    staticPath: string;
}

interface StateFromDispatch {
    initializePublisher: typeof initializePublisher;
}

type PublisherDetailProps = StateFromProps & StateFromDispatch;

export class PublisherDetail extends React.Component<PublisherDetailProps> { 
    componentDidMount() {
        const { initializePublisher } = this.props;
        initializePublisher();
    }
    render() {
        const { name, books, staticPath } = this.props;
        return (
            <div className="author">
                <h2>{name}</h2>
                {books.map(book => (<Book key={book.id} book={book} staticPath={staticPath} />))}
            </div>
        );
    };
}

const mapStateToProps = (state: AppState) => ({
    name: state.publisherDetailStore.name,
    books: state.publisherDetailStore.books,
    staticPath: state.appStore.staticPath
});

const mapDispatchToProps = {
    initializePublisher
}

export default connect(mapStateToProps, mapDispatchToProps)(PublisherDetail);
