import React from 'react';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

const Category = ({ onClick, category }) => (
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
