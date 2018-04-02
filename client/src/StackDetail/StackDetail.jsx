import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import BookStack from '../BookStack/BookStack';
import AddBook from '../AddBook/AddBook';

import {
    stackDetail as stackDetailActions,
    position,
    readState,
    removeBook,
    removeCategory,
} from '../StackDetail/stackDetailModule';

const mapStateToProps = state => ({
    staticPath: state.appStore.get('staticPath'),
    stackDetail: state.stackDetailStore.get('stackDetail'),
    books: state.stackDetailStore.getIn(['stackDetail', 'books']),
    editing: state.stackDetailStore.get('editing'),
});

const mapDispatchToProps = {
    loadStack: stackDetailActions.request,
    unloadStack: stackDetailActions.clear,
    toggleEditing: stackDetailActions.editing,
    updateReadState: readState.request,
    deleteBook: removeBook.request,
    deleteCategory: removeCategory.request,
    updatePosition: position.request,
};

const StackDetail = ({
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
}) => {
    const { id } = match.params;
    const addBook = editing ?
        (
            <div>
                <div onClick={toggleEditing}>Close -</div>
                <AddBook stackId={id} />
            </div>
        ) :
        (
            <div>
                <div onClick={toggleEditing}>Add book +</div>
            </div>
        );
    return (
        <div className="stack row">
            <h1 className="stackName">{stackDetail.get('name')}</h1>
            <div className="user">{stackDetail.get('user')}</div>
            <div className="creationDate">{stackDetail.get('creation_date')}</div>
            <div className="addBook">
                {addBook}
            </div>
            {books.map(bookStack =>
                (<BookStack
                    key={bookStack.get('id')}
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

StackDetail.propTypes = {
    staticPath: propTypes.string.isRequired,
    match: propTypes.shape({
        params: propTypes.shape({
            id: propTypes.string,
        }),
    }).isRequired,
    books: immutablePropTypes.list.isRequired,
    editing: propTypes.bool.isRequired,
    toggleEditing: propTypes.func.isRequired,
    stackDetail: immutablePropTypes.map.isRequired,
    updateReadState: propTypes.func.isRequired,
    deleteBook: propTypes.func.isRequired,
    deleteCategory: propTypes.func.isRequired,
    updatePosition: propTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(StackDetail);
