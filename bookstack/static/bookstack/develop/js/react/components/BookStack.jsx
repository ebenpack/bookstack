var React = require('react');

var Book = require('./Book.jsx');
var Category = require('./Category.jsx');

var StackDetailActions = require('../actions/StackDetailActions');

var BookStack = React.createClass({
    handleChange: function(e){
        StackDetailActions.setReadState(this.props.data.id, e.target.checked);
    },
    render: function() {
        var staticPath = this.props.staticPath;
        var classString = 'bookstack';
        if (this.props.data.read) {
            classString += ' isRead';
        }
        var categories = (this.props.data.categories && this.props.data.categories.length > 0);
        return (
            <div className={classString} >
                <div className="position">{this.props.data.position}</div>
                <Book data={this.props.data.book} staticPath={staticPath} />
                <div className="info">
                    {categories ? 'Categories: ' : ''}
                    <ul className="categories">
                        {this.props.data.categories.map(function(category, i) {
                            return (<Category key={i} data={category} />);
                        })}
                    </ul>
                    <div className="read">
                        Read: <input onChange={this.handleChange} type="checkbox" checked={this.props.data.read}  />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = BookStack;