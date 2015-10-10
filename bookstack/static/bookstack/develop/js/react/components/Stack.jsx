var React = require('react');

var Link = require('react-router').Link;

var StackListActions = require('../actions/StackListActions.js');
var StackDetailActions = require('../actions/StackDetailActions.js');

var Stack = React.createClass({
    render: function() {
        var staticPath = this.props.staticPath;
        var id = this.props.data.id;
        return (
            <div className="stack">
                <h1 className="stackName">
                    <Link to={"/list/" + id}>{this.props.data.name}</Link>
                </h1>
                <div className="user">{this.props.data.user}</div>
                <div className="creationDate">{this.props.data.creation_date}</div>
            </div>
        );
    }
});

module.exports = Stack;