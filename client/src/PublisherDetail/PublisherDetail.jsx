import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import Book from '../Book/Book';
import { publisher as publisherActions } from '../PublisherDetail/publisherDetailModule';

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
    };
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
                {this.props.books.map(book => (<Book key={book.get('id')} book={book} />))}
            </div>
        );
    }
}

PublisherDetail.propTypes = {
    params: propTypes.shape({
        id: propTypes.string,
    }).isRequired,
    loadPublisher: propTypes.func.isRequired,
    name: propTypes.string.isRequired,
    books: immutablePropTypes.list.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PublisherDetail);
