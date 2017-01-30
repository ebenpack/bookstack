import React from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import BookStack from './BookStack.jsx';
import AddBook from './AddBook.jsx';

import * as StackDetailActions from '../actions/StackDetailActions';

function mapStateToProps(state) {
    return {
        stackDetail: state.stackDetailStore.get('stackDetail'),
        books: state.stackDetailStore.getIn(['stackDetail', 'books']),
        error: state.stackDetailStore.get('error'),
        loading: state.stackDetailStore.get('loading'),
        editing: state.stackDetailStore.get('editing'),
        apiUrl: state.appStore.get('apiUrl'),
        token: state.appStore.get('token'),
    };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(StackDetailActions, dispatch)}
}

class StackDetail extends React.Component {

    componentDidMount() {
        this.props.actions.loadStack(this.props.apiUrl, this.props.params.id);
    }

    componentWillUnmount() {
        this.props.actions.unloadStack();
    }

    toggleEditing() {
        this.props.actions.toggleEditing();
    }

    render() {
        let staticPath = this.props.route.staticPath;
        let id = this.props.params.id;
        let addBook = this.props.editing ?
            (<div>
                <div onClick={this.toggleEditing}>Close -</div>
                <AddBook stackId={id}/>
            </div>) :
            (<div>
                <div onClick={e => this.toggleEditing()}>Add book +</div>
            </div>);
        let apiUrl = this.props.apiUrl;
        let token = this.props.token;
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
                        setReadState={(id, checked) =>
                            this.props.actions.setReadState(apiUrl, token, id, checked)}
                        removeBook={id =>
                            this.props.actions.removeBook(apiUrl, token, id)}
                        removeCategory={(bookstackId, categoryId) =>
                            this.props.actions.removeCategory(apiUrl, token, bookstackId, categoryId)}
                        setPosition={(id, from, to) =>
                            this.props.actions.setPosition(apiUrl, token, id, from, to, this.props.books.size)}
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
