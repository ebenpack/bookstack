var React = require('react');

var Autocomplete = React.createClass({
    handleClick: function(id, e) {
        if (this.props.onClick) {
            this.props.onClick(id);
        }
    },
    render: function() {
        return (
            <ul className="autocomplete">
                {this.props.suggestions.map(function(suggestion){
                    var displayProperty = this.props.displayProperty;
                    return (
                        <li
                            key={suggestion.id}
                            onClick={this.handleClick.bind(this, suggestion.id)}>
                            {suggestion[displayProperty]}
                        </li>
                    );
                }, this)}
            </ul>
        );
    }
});

module.exports = Autocomplete;