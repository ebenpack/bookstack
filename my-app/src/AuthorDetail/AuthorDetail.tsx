import * as React from 'react';
import { connect } from 'react-redux';

import Book from '../Book/Book';
import { initializeAuthor } from './authorDetailModule';
import { AppState } from '../store';
import { List } from 'immutable';
import { IBook } from '../Book/types';

interface PropsFromState {
    name: string;
    books: List<IBook>;
    staticPath: string;
}

interface PropsFromDispatch {
    initializeAuthor: typeof initializeAuthor
}

type AuthorDetailProps = PropsFromState & PropsFromDispatch;

export class AuthorDetail extends React.Component<AuthorDetailProps> { 
    componentDidMount() {
        const { initializeAuthor } = this.props;
        initializeAuthor();
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
};


const mapStateToProps = (state: AppState) => ({
    name: state.authorDetailStore.name,
    books: state.authorDetailStore.books,
    staticPath: state.appStore.staticPath,
});

const mapDispatchToProps = {
    initializeAuthor
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDetail);
