import React from 'react';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

const Autocomplete = ({ onClick, suggestions, displayProperty }) => (
    <ul className="autocomplete">
        {suggestions.map(suggestion => (
            <li
                key={suggestion.get('id')}
                onClick={() => onClick(suggestion.get('id'))}
            >
                {suggestion.get(displayProperty)}
            </li>
        ))}
    </ul>
);

Autocomplete.defaultProps = {
    onClick: () => { },
};

Autocomplete.propTypes = {
    onClick: propTypes.func,
    suggestions: immutablePropTypes.list.isRequired,
    displayProperty: propTypes.string.isRequired,
};

export default Autocomplete;
