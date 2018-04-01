import React from 'react';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

const Category = (props) => {
    const onClick = props.onClick ? e => props.onClick(e, props.category.get('id')) : () => {
    };
    return (
        <li
            key={props.category.get('id')}
            className="category"
            onClick={onClick}
        >
            {props.category.getIn(['detail', 'category'])}
        </li>
    );
};

Category.propTypes = {
    category: immutablePropTypes.map.isRequired,
    onClick: propTypes.func.isRequired,
};

export default Category;
