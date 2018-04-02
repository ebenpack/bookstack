import React from 'react';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import Author from '../Author/Author';
import Publisher from '../Publisher/Publisher';

const Book = ({ staticPath, className, book }) => (
    <div className={className}>
        <img
            src={
                book.has('img') ?
                    book.get('img') :
                    `${staticPath}bookstack/images/defaultbook.jpg`}
            alt={`${book.get('title')} Cover`}
        />
        <div className="info">
            <div className="title">{book.get('title')}</div>
            By:
            <ul className="authors">{book.get('authors').map(author => (
                <Author
                    key={
                        author.get('id', `${book.get('title')}|${author.get('name')}`)
                    }
                    author={author}
                />
            ))}
            </ul>
            {book.get('publishers').map(publisher => (
                <Publisher
                    key={
                        publisher.get('id', `${book.get('title')}|${publisher.get('name')}`)
                    }
                    publisher={publisher}
                />
            ))}
            <div className="pages">{book.get('pages')} pages</div>
            <div className="isbn">ISBN: {book.get('isbn')}</div>
        </div>
    </div>
);

Book.defaultProps = {
    staticPath: '',
    className: 'book four columns',
};

Book.propTypes = {
    staticPath: propTypes.string,
    className: propTypes.string,
    book: immutablePropTypes.map.isRequired,
};

export default Book;
