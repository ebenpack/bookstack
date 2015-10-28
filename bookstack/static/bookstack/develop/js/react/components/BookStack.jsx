var React = require('react');

var Book = require('./Book.jsx');
var Category = require('./Category.jsx');

var StackDetailActions = require('../actions/StackDetailActions');

var BookStack = React.createClass({
    getInitialState: function() {
        return {
            editing: false,
            removeConfirm: false,
            addingCategory: false,
            category: "",
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
    updatePosition: function(id, fromPosition, toPosition) {
        if (fromPosition !== toPosition) {
            StackDetailActions.setPosition(id, fromPosition, toPosition);
        }
    },
    moveUp: function() {
        var fromPosition = this.props.data.position;
        var toPosition = fromPosition - 1;
        var id = this.props.data.id;
        if (toPosition > 0) {
            this.updatePosition(id, fromPosition, toPosition);
        }
    },
    moveDown: function() {
        var fromPosition = this.props.data.position;
        var toPosition = fromPosition + 1;
        var id = this.props.data.id;
        this.updatePosition(id, fromPosition, toPosition);
    },
    handleBlur: function(e) {
        var toPosition = parseInt(e.target.value, 10);
        var fromPosition = this.props.data.position;
        var id = this.props.data.id;
        this.setEditingStateOff();
        this.updatePosition(id, fromPosition, toPosition);
    },
    handleDragStart: function(e) {
        e.dataTransfer.setData('text', JSON.stringify({
            id: this.props.data.id,
            position: this.props.data.position
        }));
    },
    handleDrop: function(e) {
        var dropped = JSON.parse(e.dataTransfer.getData('text'));
        var id = dropped.id;
        var fromPosition = dropped.position;
        var toPosition = this.props.data.position;
        this.updatePosition(id, fromPosition, toPosition);
    },
    handleDragOver: function(e) {
        e.preventDefault();
    },
    handleRemove: function() {
        this.setState({
            removeConfirm: true,
        });
    },
    handleCancel: function() {
        this.setState({
            removeConfirm: false,
        });
    },
    handleConfirm: function() {
        var id = this.props.data.id;
        StackDetailActions.removeBook(id);
        this.setState({
            removeConfirm: false,
        });
    },
    toggleAddingCategory: function() {
        this.setState({
            addingCategory: !this.state.addingCategory,
        });
    },
    handleCategoryChange: function(e) {
        this.setState({
            category: e.target.value,
        });
    },
    handleCategoryKeyUp: function(e) {
        if (e.key === "Enter") {
            var categories = this.props.data.categories.concat(this.state.category);
            var id = this.props.data.id;
            StackDetailActions.updateCategories(categories, id);
            this.setState({
                category: '',
            });
        }
    },
    render: function() {
        var context = this;
        var staticPath = this.props.staticPath;
        var classString = 'bookstack row';
        if (this.props.data.read) {
            classString += ' isRead';
        }
        var categories = (this.props.data.categories && this.props.data.categories.length > 0);
        var position = (
            this.state.editing ?
            (
                <div>
                        <input
                            autoFocus
                            ref={function(input) {
                                if (input != null) {
                                    input.select();
                                }
                            }}
                            className="position"
                            onBlur={this.handleBlur}
                            defaultValue={this.props.data.position}
                            onMouseOut={this.setEditingStateOff} />
                    </div>
            ) :
            (
                <div
                        onClick={this.setEditingStateOn}>
                        {this.props.data.position}
                    </div>
            )
        );
        var remove = (
            this.state.removeConfirm ?
            (
                <div className="remove">
                        <button className="cancel" onClick={this.handleCancel}>Cancel</button>
                        <button className="confirm" onClick={this.handleConfirm}>Remove</button>
                    </div>
            ) :
            (
                <div className="remove">
                        <a onClick={this.handleRemove}>Remove</a>
                    </div>
            )
        );
        var addCategory = (
            this.state.addingCategory ?
            (
                <div>
                    <div className="addCategory" onClick={this.toggleAddingCategory}>- Cancel</div>
                    <input
                        type="text"
                        value={this.state.category}
                        onChange={this.handleCategoryChange}
                        onKeyUp={this.handleCategoryKeyUp} />
                </div>
            ) :
            (
                <div>
                    <div className="addCategory" onClick={this.toggleAddingCategory}>+ Add category</div>
                </div>
            )
        );
        return (
            <div
                draggable="true"
                className={classString}
                onDragStart={this.handleDragStart}
                onDragEnd={this.handleDragEnd}
                onDrop={this.handleDrop}
                onDragOver={this.handleDragOver}>
                <div className="position one column">
                    {position}
                </div>
                <div>
                    <div className="moveArrow" onClick={this.moveUp}>↑</div>
                    <div className="moveArrow" onClick={this.moveDown}>↓</div>
                </div>
                <Book book={this.props.data.book} staticPath={staticPath} />
                <div className="info seven columns">
                    <div className="categories">
                        <h5>Categories</h5>
                        <ul>
                            {this.props.data.categories.map(function(category, i) {
                                return (<Category key={i} data={category} />);
                            })}
                        </ul>
                        {addCategory}
                    </div>
                    <div className="read">
                        Read: <input onChange={this.toggleRead} type="checkbox" checked={this.props.data.read}  />
                    </div>
                    {remove}
                </div>
            </div>
        );
    }
});

module.exports = BookStack;