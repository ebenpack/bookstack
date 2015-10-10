var React = require('react');

var Link = require('react-router').Link;

var StackListActions = require('../actions/StackListActions.js');
var StackDetailActions = require('../actions/StackDetailActions.js');

var Stack = React.createClass({
    handleClick: function(event) {
        event.preventDefault();
        StackDetailActions.loadStack(event.target.dataset.id);
    },
    render: function() {
        var staticPath = this.props.staticPath;
        var id = this.props.data.id;
        return (
            <div className="stack">
                <h1 className="stackName">
                    <a onClick={this.handleClick}>
                        <Link to={"/list/" + id}>{this.props.data.name}</Link>
                    </a>
                </h1>
                <div className="user">{this.props.data.user}</div>
                <div className="creationDate">{this.props.data.creation_date}</div>
            </div>
        );
    }
});

module.exports = Stack;