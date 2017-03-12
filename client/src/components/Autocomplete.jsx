var React = require('react');

export default function Autocomplete(props) {
    const onClick = props.onClick ? props.onClick : ()=>{};
    return (
        <ul className="autocomplete">
            {props.suggestions.map(function (suggestion) {
                const displayProperty = props.displayProperty;
                const id = suggestion.get('id');
                return (
                    <li
                        key={id}
                        onClick={e=>onClick(id)}>
                        {suggestion.get(displayProperty)}
                    </li>
                );
            }, this)}
        </ul>
    );

};