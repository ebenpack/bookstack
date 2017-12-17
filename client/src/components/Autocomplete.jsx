import React from 'react';

export default function Autocomplete({onClick, suggestions, displayProperty}) {
    onClick = onClick ? onClick : () => {
    };
    return (
        <ul className="autocomplete">
            {suggestions.map(function (suggestion) {
                const id = suggestion.get('id');
                return (
                    <li
                        key={id}
                        onClick={e => onClick(id)}>
                        {suggestion.get(displayProperty)}
                    </li>
                );
            }, this)}
        </ul>
    );
};