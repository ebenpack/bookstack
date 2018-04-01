import React from 'react';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

const Autocomplete = ({ onClick, suggestions, displayProperty }) => (
    <ul className="autocomplete">
        {suggestions.map((suggestion) => {
            const id = suggestion.get('id');
            return (
                <li
                    key={id}
                    onClick={() => onClick(id)}
                >
                    {suggestion.get(displayProperty)}
                </li>
            );
        }, this)}
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
