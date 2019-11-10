import * as React from 'react';

import { IBook } from '../Book/types';
import Author from '../Author/Author';
import Publisher from '../Publisher/Publisher';

interface BookProps {
    staticPath: string;
    book: IBook;
}

const Book = ({ staticPath, book }: BookProps) => (
    <div className="columns">
        <div className="column">
            <img
                src={
                    book.img || `${staticPath}bookstack/images/defaultbook.jpg`
                }
                alt={`${book.title} Cover`}
            />
            <div className="title">{book.title}</div>
        </div>
        <div className="column">
            By:
            <ul className="authors">
                {book.authors.map(author => (
                    <Author
                        key={author.id || `${book.title}|${author.name}`}
                        author={author}
                    />
                ))}
            </ul>
            Publshed by:
            {book.publishers.map(publisher => (
                <Publisher
                    key={publisher.id || `${book.title}|${publisher.name}`}
                    publisher={publisher}
                />
            ))}
            <div className="pages">{book.pages} pages</div>
            <div className="isbn">ISBN: {book.isbn}</div>
        </div>
    </div>
);

export default Book;
