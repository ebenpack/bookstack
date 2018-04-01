import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import BookStack from './BookStack';
import AddBook from './AddBook';

import {
    stackDetail,
    position,
    readState,
    removeBook,
    removeCategory,
} from '../actions/StackDetail';

const mapStateToProps = state => ({
    staticPath: state.appStore.get('staticPath'),
    stackDetail: state.stackDetailStore.get('stackDetail'),
    books: state.stackDetailStore.getIn(['stackDetail', 'books']),
    editing: state.stackDetailStore.get('editing'),
});

const mapDispatchToProps = {
    loadStack: stackDetail.request,
    unloadStack: stackDetail.clear,
    toggleEditing: stackDetail.editing,
    updateReadState: readState.request,
    deleteBook: removeBook.request,
    deleteCategory: removeCategory.request,
    updatePosition: position.request,
};

class StackDetail extends React.Component {
    componentDidMount() {
        this.props.loadStack(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.unloadStack();
    }

    render() {
        const { staticPath } = this.props.route;
        const { id } = this.props.params;
        const addBook = this.props.editing ?
            (
                <div>
                    <div onClick={this.props.toggleEditing}>Close -</div>
                    <AddBook stackId={id} />
                </div>
            ) :
            (
                <div>
                    <div onClick={this.props.toggleEditing}>Add book +</div>
                </div>
            );
        return (
            <div className="stack row">
                <h1 className="stackName">{this.props.stackDetail.get('name')}</h1>
                <div className="user">{this.props.stackDetail.get('user')}</div>
                <div className="creationDate">{this.props.stackDetail.get('creation_date')}</div>
                <div className="addBook">
                    {addBook}
                </div>
                {this.props.books.map(bookStack =>
                    (<BookStack
                        key={bookStack.get('id')}
                        bookStack={bookStack}
                        staticPath={staticPath}
                        setReadState={this.props.updateReadState}
                        deleteBook={this.props.deleteBook}
                        removeCategory={this.props.deleteCategory}
                        updatePosition={this.props.updatePosition}
                    />))}
            </div>
        );
    }
}

StackDetail.propTypes = {
    loadStack: propTypes.func.isRequired,
    params: propTypes.shape({
        id: propTypes.string,
    }).isRequired,
    unloadStack: propTypes.func.isRequired,
    books: immutablePropTypes.list.isRequired,
    route: propTypes.shape({
        staticPath: propTypes.string,
    }).isRequired,
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
