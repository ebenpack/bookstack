import * as React from 'react';
import { Link } from 'react-router-dom';
import * as immutablePropTypes from 'react-immutable-proptypes';

import { makeAuthorDetailPath } from '../AuthorDetail/AuthorDetailRoute';
import { IAuthor } from '../AuthorDetail/types';

interface AuthorProps {
    author: IAuthor
}

const Author = ({ author }: AuthorProps) => (
    <li className="author">
        {author.id ? (
            <Link to={makeAuthorDetailPath(author.id)}>
                {author.name}
            </Link>) :
            author.name
        }
    </li>
);

Author.propTypes = {
    author: immutablePropTypes.map.isRequired,
};

export default Author;
