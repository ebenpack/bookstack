import React from 'react';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import Author from '../Author/Author';
import Publisher from '../Publisher/Publisher';

const Book = ({ staticPath, book }) => (
    <div className="columns">
        <div className="column">
            <img
                src={book.get('img', `${staticPath}bookstack/images/defaultbook.jpg`)}
                alt={`${book.get('title')} Cover`}
            />
            <div className="title">{book.get('title')}</div>
        </div>
        <div className="column">
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
            Publshed by:
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
};

Book.propTypes = {
    staticPath: propTypes.string,
    book: immutablePropTypes.map.isRequired,
};

export default Book;
