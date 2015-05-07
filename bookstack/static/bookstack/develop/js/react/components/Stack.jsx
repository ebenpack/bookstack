var React = require('react');

var StackListActions = require('../actions/StackListActions.js');
var StackDetailActions = require('../actions/StackDetailActions.js');

var Stack =  React.createClass({
    handleClick: function(event) {
        event.preventDefault();
        StackListActions.unloadStackList();
        StackDetailActions.loadStack(event.target.dataset.id);
    },
    render: function() {
        var staticPath = this.props.staticPath;
        var id = this.props.data.id;
        var link = '/app/stack/' + id;
        return (
            <div className="stack">
                <h1 className="stackName"><a href={link} data-id={id} onClick={this.handleClick}>{this.props.data.name}</a></h1>
                <div className="user">{this.props.data.user}</div>
                <div className="creationDate">{this.props.data.creation_date}</div>
            </div>
        );
    }
});

module.exports = Stack;
