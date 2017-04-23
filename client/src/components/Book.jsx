import React from 'react';

import Author from './Author.jsx';
import Publisher from './Publisher.jsx';

export default function Book({staticPath, className, book}) {
    className = (className === undefined) ?
        "book four columns" :
        className;
    return (
        <div className={className}>
            <img src={
                book.has('img') ?
                    book.get('img') :
                    staticPath + 'bookstack/images/defaultbook.jpg'}
            />
            <div className="info">
                <div className="title">{book.get('title')}</div>
                By:
                <ul className="authors">{book.get('authors').map(function (author, i) {
                    return (<Author key={i} author={author}/>);
                })}</ul>
                {book.get('publishers').map(function (publisher, i) {
                    return (<Publisher key={i} publisher={publisher}/>);
                })}
                <div className="pages">{book.get('pages')} pages</div>
                <div className="isbn">ISBN: {book.get('isbn')}</div>
            </div>
        </div>
    )
};