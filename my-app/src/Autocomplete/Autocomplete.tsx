import * as React from 'react';
import * as propTypes from 'prop-types';
import * as immutablePropTypes from 'react-immutable-proptypes';
import { List, Map } from 'immutable';

export interface AutocompleteProps {
    onClick: (id: number) => void,
    suggestions: List<Map<string, any>>,
    displayProperty: string
};

const Autocomplete = ({ onClick, suggestions, displayProperty }: AutocompleteProps) => (
    suggestions.size ? null : (
        <div className="autocomplete dropdown is-active">
            <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    {suggestions.map(suggestion => (
                        <a
                            href="#"
                            className="dropdown-item"
                            key={suggestion.get('id')}
                            onClick={() => onClick(suggestion.get('id'))}
                        >
                            {suggestion.get(displayProperty)}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
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
