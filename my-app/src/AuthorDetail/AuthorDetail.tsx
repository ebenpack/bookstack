import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as propTypes from 'prop-types';
import * as immutablePropTypes from 'react-immutable-proptypes';

import { IAuthor } from './types';
import Book from '../Book/Book';
import { initializeAuthor } from './authorDetailModule';
import { AppState } from '../store';
import { List } from 'immutable';
import { IBook } from '../Book/types';

interface PropsFromState {
    name: string;
    books: List<IBook>;
}

interface PropsFromDispatch {
    initializeAuthor: typeof initializeAuthor
}

type AuthorDetailProps = PropsFromState & PropsFromDispatch;

export class AuthorDetail extends React.Component<AuthorDetailProps> { 
    render() {
        const { name, books, initializeAuthor } = this.props;
        useEffect(() => {
            initializeAuthor()
        }, []);
        return (
            <div className="author">
                <h2>{name}</h2>
                {books.map(book => (<Book key={book.id} book={book} />))}
            </div>
        );
    };
};


const mapStateToProps = (state: AppState) => ({
    name: state.authorDetailStore.name,
    books: state.authorDetailStore.books,
});

const mapDispatchToProps = {
    initializeAuthor
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDetail);
