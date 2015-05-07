var React = require('react');

var StackListStore = require('../stores/StackListStore.js');

var Stack = require('./Stack.jsx');

function getAppState(){
    return StackListStore.getStacks();
}

var StackList = React.createClass({
    getInitialState: function() {
        return getAppState();
    },
    componentDidMount: function() {
        StackListStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        StackListStore.removeChangeListener(this._onChange);
    },
    render: function() {
        var staticPath = this.props.staticPath;
        return (
            <div className="stacklist">
                {this.state.data.map(function(stack, i) {
                    return <Stack key={i} data={stack} staticPath={staticPath} />;
                })}
            </div>
        );
    },
    _onChange: function() {
        this.setState(getAppState());
    }
});

module.exports = StackList;