import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as propTypes from 'prop-types';
import * as immutablePropTypes from 'react-immutable-proptypes';
import { RouteComponentProps } from 'react-router';
import { List } from 'immutable';
import { IBook} from '../Book/types';
import { IStackRecord } from '../Stack/types';

import BookStack from '../BookStack/BookStack';
import ConnectedAddBook from '../AddBook/AddBook';

import {
    stackDetailRequest,
    stackDetailClear,
    stackDetailEditing,
    stackDetailReadStateRequest,
    stackDetailRemoveBookRequest,
    stackDetailRemoveCategoryRequest,
    stackDetailPositionRequest,
    stackDetailInitialize,
    StackDetailRecord
} from '../StackDetail/stackDetailModule';
import { AppState } from '../store';
import { render } from 'react-dom';

interface IUrlParams {
    id: string;
}

interface PropsFromState {
    staticPath: string;
    stackDetail: StackDetailRecord;
    books: List<IBook>;
    editing: boolean;
}

interface PropsFromDispatch {
    loadStack: typeof stackDetailRequest;
    unloadStack: typeof stackDetailClear;
    toggleEditing: typeof stackDetailEditing;
    updateReadState: typeof stackDetailReadStateRequest;
    deleteBook: typeof stackDetailRemoveBookRequest;
    deleteCategory: typeof stackDetailRemoveCategoryRequest;
    updatePosition: typeof stackDetailPositionRequest;
    stackDetailInitialize: typeof stackDetailInitialize;
}

interface OwnProps extends RouteComponentProps<IUrlParams> {}

type StackDetailProps = PropsFromState & PropsFromDispatch & RouteComponentProps<IUrlParams> & OwnProps;

class StackDetail extends React.Component<StackDetailProps> {
    render() {
        const {
            staticPath,
            match,
            stackDetail,
            books,
            editing,
            toggleEditing,
            updateReadState,
            deleteBook,
            deleteCategory,
            updatePosition,
            stackDetailInitialize,
        } = this.props;
        useEffect(() => {
            stackDetailInitialize()
        }, []);
        const { id } = match.params;
        const addBook = editing ?
            (
                <div>
                    <div onClick={toggleEditing}>Close -</div>
                    <ConnectedAddBook stackId={id} />
                </div>
            ) :
            (
                <div>
                    <div onClick={toggleEditing}>Add book +</div>
                </div>
            );
        return (
            <div className="stack">
                <div className="columns">
                    <div className="column">
                        <h1 className="stackName">{stackDetail.name}</h1>
                        <div className="user">{stackDetail.user}</div>
                        <div className="creationDate">{stackDetail.creation_date}</div>
                        <div className="addBook">
                            {addBook}
                        </div>
                    </div>
                </div>
                {books.map(bookStack =>
                    (<BookStack
                        key={bookStack.id}
                        bookStack={bookStack}
                        staticPath={staticPath}
                        setReadState={updateReadState}
                        deleteBook={deleteBook}
                        removeCategory={deleteCategory}
                        updatePosition={updatePosition}
                    />))}
            </div>
        );
    };
}

const mapStateToProps = (state: AppState) => ({
    staticPath: state.appStore.staticPath,
    stackDetail: state.stackDetailStore.stackDetail,
    books: state.stackDetailStore.stackDetail.books,
    editing: state.stackDetailStore.editing,
});

const mapDispatchToProps = {
    loadStack: stackDetailRequest,
    unloadStack: stackDetailClear,
    toggleEditing: stackDetailEditing,
    updateReadState: stackDetailReadStateRequest,
    deleteBook: stackDetailRemoveBookRequest,
    deleteCategory: stackDetailRemoveCategoryRequest,
    updatePosition: stackDetailPositionRequest,
    stackDetailInitialize
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StackDetail);
