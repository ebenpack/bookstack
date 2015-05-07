var React = require('react');

var BookStack = require('./BookStack.jsx');

var StackDetailStore = require('../stores/StackDetailStore.js');

function getAppState(){
    return StackDetailStore.getStack();
}

var StackDetail =  React.createClass({
    getInitialState: function() {
        return StackDetailStore.getStack();
    },
    // filterList: function(event){
    //     var updatedList = this.state.data;
    //     updatedList = updatedList.filter(function(item){
    //         return item.toLowerCase().search(
    //             event.target.value.toLowerCase()) !== -1;
    //     });
    //     this.setState({data: updatedList});
    // },
    componentDidMount: function() {
        StackDetailStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
        StackDetailStore.removeChangeListener(this._onChange);
    },
    render: function() {
        var staticPath = this.props.staticPath;
        return (
            <div className="stack">
                <h1 className="stackName">{this.props.data.name}</h1>
                <div className="user">{this.props.data.user}</div>
                <div className="creationDate">{this.props.data.creation_date}</div>
                {this.props.data.books.map(function(bookStack, i) {
                    return <BookStack key={i} data={bookStack} staticPath={staticPath} />;
                })}
            </div>
        );
    },
    _onChange: function() {
        this.setState(getAppState());
    }
});

module.exports = StackDetail;