import * as React from 'react';
import { Link } from 'react-router-dom';
import immutablePropTypes from 'react-immutable-proptypes';

import { makeAuthorDetailPath } from '../AuthorDetail/AuthorDetailRoute';
import { IAuthorRecord } from '../AuthorDetail/authorDetailModule';

interface AuthorProps {
    author: IAuthorRecord
}

const Author = ({ author }: AuthorProps) => (
    <li className="author">
        {author.get('id') ? (
            <Link to={makeAuthorDetailPath(author.get('id'))}>
                {author.get('name')}
            </Link>) :
            author.get('name')
        }
    </li>
);

Author.propTypes = {
    author: immutablePropTypes.map.isRequired,
};

export default Author;
