var React = require('react');

var Book = require('./Book.jsx');
var Category = require('./Category.jsx');

var BookStack = React.createClass({
    render: function() {
        var staticPath = this.props.staticPath;
        var classString = 'bookstack';
        if (this.props.data.read) {
            classString += ' isRead';
        }
        var categories = (this.props.data.categories && this.props.data.categories.length > 0);
        return (
            <div className={classString} >
                <div className="position" contentEditable="true">{this.props.data.position}</div>
                <Book data={this.props.data.book} staticPath={staticPath} />
                <div className="info">
                    {categories ? 'Categories: ' : ''}
                    <ul className="categories">
                        {this.props.data.categories.map(function(category, i) {
                            return <Category key={i} data={category} />
                        })}
                    </ul>
                    <div className="read">
                        Read: <input type="checkbox" checked={this.props.data.read}  />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = BookStack;