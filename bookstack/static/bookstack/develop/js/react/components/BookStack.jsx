var React = require('react');

var Book = require('./Book.jsx');
var Category = require('./Category.jsx');

var StackDetailActions = require('../actions/StackDetailActions');

var BookStack = React.createClass({
    getInitialState: function() {
        return {
            editing: false,
        };
    },
    toggleRead: function(e) {
        StackDetailActions.setReadState(this.props.data.id, e.target.checked);
    },
    setEditingStateOn: function() {
        this.setState({
            editing: true,
        });
    },
    setEditingStateOff: function() {
        this.setState({
            editing: false,
        });
    },
    updatePosition: function(e) {
        var position = parseInt(e.target.value, 10);
        this.setEditingStateOff();
        if (position && this.props.data.position !== position) {
            StackDetailActions.setPosition(this.props.data.id, this.props.data.position, position);
        }
    },
    render: function() {
        var context = this;
        var staticPath = this.props.staticPath;
        var classString = 'bookstack';
        if (this.props.data.read) {
            classString += ' isRead';
        }
        var categories = (this.props.data.categories && this.props.data.categories.length > 0);
        var position = (
            this.state.editing ?
                (
                    <input
                        className="position"
                        onBlur={this.updatePosition}
                        defaultValue={this.props.data.position}
                        onMouseOut={this.setEditingStateOff} />
                ) :
                (
                    <div
                        className="position"
                        onClick={this.setEditingStateOn}>
                        {this.props.data.position}
                    </div>
                )
        );
        return (
            <div className={classString} >
                {position}
                <Book data={this.props.data.book} staticPath={staticPath} />
                <div className="info">
                    {categories ? 'Categories: ' : ''}
                    <ul className="categories">
                        {this.props.data.categories.map(function(category, i) {
                            return (<Category key={i} data={category} />);
                        })}
                    </ul>
                    <div className="read">
                        Read: <input onChange={this.toggleRead} type="checkbox" checked={this.props.data.read}  />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = BookStack;