var React = require('react');
var Reflux = require('reflux');

var StackListStore = require('../stores/StackListStore.js');

var Stack = require('./Stack.jsx');

function getAppState(){
    return {stackList: StackListStore.viewStacks()};
}

var StackList = React.createClass({
    mixins: [Reflux.connect(StackListStore, 'stackList')],
    getInitialState: function() {
        return getAppState();
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