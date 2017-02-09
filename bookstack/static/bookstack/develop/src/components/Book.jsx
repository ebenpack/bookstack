import React from 'react';

import Author from './Author.jsx';
import Publisher from './Publisher.jsx';

export default function Book(props) {
    const staticPath = props.staticPath;
    const className = (props.className === undefined) ?
        "book four columns" :
        props.className;
    return (
        <div className={className}>
            <img src={
                props.book.has('img') ?
                    props.book.get('img') :
                    staticPath + 'bookstack/images/defaultbook.jpg'}
            />
            <div className="info">
                <div className="title">{props.book.get('title')}</div>
                By:
                <ul className="authors">{props.book.get('authors').map(function (author, i) {
                    return (<Author key={i} author={author}/>);
                })}</ul>
                {props.book.get('publishers').map(function (publisher, i) {
                    return (<Publisher key={i} publisher={publisher}/>);
                })}
                <div className="pages">{props.book.get('pages')} pages</div>
                <div className="isbn">ISBN: {props.book.get('isbn')}</div>
            </div>
        </div>
    )
};