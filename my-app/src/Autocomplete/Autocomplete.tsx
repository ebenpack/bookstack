import * as React from 'react';
import { List } from 'immutable';

export interface AutocompleteProps<T> {
    onClick: (id: number) => void,
    suggestions: List<T>,
    getDisplayProperty: (item: T) => string,
    getId: (item: T) => number,

};

function Autocomplete<T>({ onClick, suggestions, getDisplayProperty, getId }: AutocompleteProps<T>) {
    return suggestions.size <= 0 ? null :(
        <div className="autocomplete dropdown is-active">
            <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    {suggestions.map(suggestion => (
                        <button
                            className="dropdown-item"
                            key={getId(suggestion)}
                            onClick={() => onClick(getId(suggestion))}
                        >
                            {getDisplayProperty(suggestion)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Autocomplete;
