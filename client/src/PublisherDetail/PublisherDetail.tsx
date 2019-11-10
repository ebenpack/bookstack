import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import Book from '../Book/Book';

import { publisherRequest } from './publisherDetailModule';
import { List } from 'immutable';
import { IBook } from '../Book/types';
import { AppState } from '../store';

interface IUrlParams {
    id: string;
}

interface StateFromProps {
    name: string;
    books: List<IBook>;
    staticPath: string;
}

interface StateFromDispatch {
    publisherRequest: typeof publisherRequest;
}

interface OwnProps extends RouteComponentProps<IUrlParams> {}

type PublisherDetailProps = StateFromProps & StateFromDispatch & OwnProps;

export class PublisherDetail extends React.Component<PublisherDetailProps> {
    componentDidMount() {
        const { publisherRequest, match } = this.props;
        const { id } = match.params;
        publisherRequest(id);
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
    publisherRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(PublisherDetail);
