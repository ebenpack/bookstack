var React = require('react');
var Reflux = require('reflux');

var BookStack = require('./BookStack.jsx');

var StackDetailStore = require('../stores/StackDetailStore.js');

function getAppState() {
    return StackDetailStore.viewStack();
}

var StackDetail = React.createClass({
    mixins: [Reflux.connect(StackDetailStore)],
    getInitialState: function() {
        return {
            error: false,
            loading: false,
            stackDetail: {
                name: "",
                user: "",
                creation_date: "",
                books: []
            }
        };
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
        StackDetailStore.fetchStack(this.props.params.id);
    },
    componentWillUnmount: function() {
        StackDetailStore.unloadStack();
    },
    render: function() {
        var staticPath = this.props.route.staticPath;
        var id = this.props.params.id;
        return (
            <div className="stack">
                <h1 className="stackName">{this.state.stackDetail.name}</h1>
                <div className="user">{this.state.stackDetail.user}</div>
                <div className="creationDate">{this.state.stackDetail.creation_date}</div>
                {this.state.stackDetail.books.map(function(bookStack, i) {
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