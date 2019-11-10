import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import Book from '../Book/Book';
import { authorRequest } from './authorDetailModule';
import { AppState } from '../store';
import { List } from 'immutable';
import { IBook } from '../Book/types';

interface IUrlParams {
    id: string;
}

interface PropsFromState {
    name: string;
    books: List<IBook>;
    staticPath: string;
}

interface PropsFromDispatch {
    authorRequest: typeof authorRequest
}

interface OwnProps extends RouteComponentProps<IUrlParams> {}

type AuthorDetailProps = PropsFromState & PropsFromDispatch & OwnProps;


export class AuthorDetail extends React.Component<AuthorDetailProps> {
    componentDidMount() {
        const { authorRequest, match } = this.props;
        const { id } = match.params;
        authorRequest(id);
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
    authorRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDetail);
