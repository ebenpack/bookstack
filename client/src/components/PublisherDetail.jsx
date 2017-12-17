import React from 'react';
import {connect} from 'react-redux';
import Book from '../components/Book.jsx';
import {publisher as publisherActions} from '../actions/PublisherDetail';

function mapDispatchToProps(dispatch) {
    return {
        loadPublisher: id => dispatch(publisherActions.request(id)),
    };
}

function mapStateToProps(state) {
    return {
        name: state.publisherDetailStore.get('name'),
        id: state.publisherDetailStore.get('id'),
        books: state.publisherDetailStore.get('books'),
    }
}

class PublisherDetail extends React.Component {
    componentDidMount() {
        if (this.props.params.id) {
            this.props.loadPublisher(this.props.params.id);
        }
    }

    render() {
        return (
            <div className="author">
                <h2>{this.props.name}</h2>
                {this.props.books.map(function (book) {
                    return (<Book key={book.id} book={book}/>);
                })}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PublisherDetail);