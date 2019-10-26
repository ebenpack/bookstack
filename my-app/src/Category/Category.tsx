import * as React from 'react';
import * as propTypes from 'prop-types';
import * as immutablePropTypes from 'react-immutable-proptypes';

import { ICategoryRecord } from './types';

interface CategoryProps {
    onClick: (event: React.MouseEvent, id: number) => void,
    category: ICategoryRecord
}

const Category = ({ onClick, category }: CategoryProps) => (
    <li
        key={category.get('id')}
        className="category"
        onClick={e => onClick(e, category.get('id'))}
    >
        {category.getIn(['detail', 'category'])}
    </li>
);

Category.defaultProps = {
    onClick: () => {},
};

Category.propTypes = {
    category: immutablePropTypes.map.isRequired,
    onClick: propTypes.func,
};

export default Category;
