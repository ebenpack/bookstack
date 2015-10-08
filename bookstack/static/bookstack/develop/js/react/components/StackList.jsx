var React = require('react');
var Reflux = require('reflux');

var StackListStore = require('../stores/StackListStore');
var StackListActions = require('../actions/StackListActions');

var Stack = require('./Stack.jsx');

var StackList = React.createClass({
    mixins: [Reflux.connect(StackListStore)],
    getInitialState: function() {
        return {
            stackList: [],
            token: '',
        };
    },
    componentDidMount: function() {
        StackListActions.loadStackList();
    },
    render: function() {
        var staticPath = this.props.staticPath;
        return (
            <div className="stacklist">
                {this.state.stackList.map(function(stack, i) {
                    return <Stack key={i} data={stack} staticPath={staticPath} />;
                })}
            </div>
        );
    }
});

module.exports = StackList;