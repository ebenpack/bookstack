import React from 'react'
import {connect} from 'react-redux';

import BookStack from './BookStack.jsx';
import AddBook from './AddBook.jsx';

import {
    stackDetail,
    position,
    readState,
    addBook,
    removeBook,
    addCategory,
    removeCategory,
} from '../actions/StackDetail';

function mapStateToProps(state) {
    return {
        stackDetail: state.stackDetailStore.get('stackDetail'),
        books: state.stackDetailStore.getIn(['stackDetail', 'books']),
        editing: state.stackDetailStore.get('editing'),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadStack: id => dispatch(stackDetail.request(id)),
        unloadStack: () => dispatch(stackDetail.clear()),
        toggleEditing: () => dispatch(stackDetail.editing()),
        updateReadState: (id, checked) => dispatch(readState.request(id, checked)),
        deleteBook: id => dispatch(removeBook.request(id)),
        deleteCategory: (bookstackId, categoryId) => dispatch(removeCategory.request(bookstackId, categoryId)),
        updatePosition: (id, from, to) => dispatch(position.request(id, from, to)),
    }
}

class StackDetail extends React.Component {

    componentDidMount() {
        this.props.loadStack(this.props.params.id);
    }

    componentWillUnmount() {
        this.props.unloadStack();
    }

    render() {
        let staticPath = this.props.route.staticPath;
        let id = this.props.params.id;
        let addBook = this.props.editing ?
            (<div>
                <div onClick={this.props.toggleEditing}>Close -</div>
                <AddBook stackId={id}/>
            </div>) :
            (<div>
                <div onClick={this.props.toggleEditing}>Add book +</div>
            </div>);
        return (
            <div className="stack row">
                <h1 className="stackName">{this.props.stackDetail.get('name')}</h1>
                <div className="user">{this.props.stackDetail.get('user')}</div>
                <div className="creationDate">{this.props.stackDetail.get('creation_date')}</div>
                <div className="addBook">
                    {addBook}
                </div>
                {this.props.books.map((bookStack, i) =>
                    <BookStack
                        key={i}
                        bookStack={bookStack}
                        staticPath={staticPath}
                        setReadState={this.props.updateReadState}
                        deleteBook={this.props.deleteBook}
                        removeCategory={this.props.deleteCategory}
                        updatePosition={this.props.updatePosition}
                    />
                )}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StackDetail);
