import React from 'react';

//import Autocomplete from './Autocomplete.jsx';
import Book from './Book.jsx';
import AddCategory from './AddCategory.jsx';

class BookStack extends React.Component {
    constructor() {
        super();
        this.state = {
            editing: false,
            removeConfirm: false,
            category: "",
            addingCategory: false,
        };
    }

    toggleRead(e) {
        this.props.setReadState(this.props.bookStack.get('id'), e.target.checked);
    }

    setEditingStateOn() {
        this.setState({
            editing: true,
        });
    }

    setEditingStateOff() {
        this.setState({
            editing: false,
        });
    }

    updatePosition(id, fromPosition, toPosition) {
        if (fromPosition !== toPosition) {
            this.props.setPosition(id, fromPosition, toPosition);
        }
    }

    moveUp() {
        let fromPosition = this.props.bookStack.get('position');
        let toPosition = fromPosition - 1;
        let id = this.props.bookStack.get('id');
        if (toPosition > 0) {
            this.updatePosition(id, fromPosition, toPosition);
        }
    }

    moveDown() {
        let fromPosition = this.props.bookStack.get('position');
        let toPosition = fromPosition + 1;
        let id = this.props.bookStack.get('id');
        this.updatePosition(id, fromPosition, toPosition);
    }

    handleBlur(e) {
        let toPosition = parseInt(e.target.value, 10);
        let fromPosition = this.props.bookStack.get('position');
        let id = this.props.bookStack.get('id');
        this.setEditingStateOff();
        this.updatePosition(id, fromPosition, toPosition);
    }

    handleDragStart(e) {
        e.dataTransfer.setData('text', JSON.stringify({
            id: this.props.bookStack.get('id'),
            position: this.props.bookStack.get('position')
        }));
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDragEnd(e) {
        e.preventDefault();
    }

    handleDrop(e) {
        let dropped = JSON.parse(e.dataTransfer.getData('text'));
        let id = dropped.id;
        let fromPosition = dropped.position;
        let toPosition = this.props.bookStack.get('position');
        this.updatePosition(id, fromPosition, toPosition);
    }




    handleRemove() {
        this.setState({
            removeConfirm: true,
        });
    }

    handleCancel() {
        this.setState({
            removeConfirm: false,
        });
    }

    handleConfirm() {
        let id = this.props.bookStack.get('id');
        this.props.removeBook(id);
        this.setState({
            removeConfirm: false,
        });
    }

    toggleAddingCategory() {
        this.setState({
            addingCategory: !this.state.addingCategory,
        });
    }

    // handleCategoryChange(e) {
    //     this.setState({
    //         category: e.target.value,
    //     });
    // }
    removeCategory(categoryId) {
        let bookstackId = this.props.bookStack.get('id');
        this.props.removeCategory(bookstackId, categoryId);
    }

    render() {
        let staticPath = this.props.staticPath;
        let classString = 'bookstack row';
        if (this.props.bookStack.get('read')) {
            classString += ' isRead';
        }
        let categories = (
            this.props.bookStack.has('categories') &&
            this.props.bookStack.get('categories').length > 0
        );
        let position = (
            this.state.editing ?
                (
                    <div>
                        <input
                            autoFocus
                            ref={function (input) {
                                if (input !== null) {
                                    input.select();
                                }
                            }}
                            className="position"
                            onBlur={e=>this.handleBlur(e)}
                            defaultValue={this.props.bookStack.get('position')}
                            onMouseOut={e=>this.setEditingStateOff(e)}/>
                    </div>
                ) :
                (
                    <div
                        onClick={e=>this.setEditingStateOn(e)}>
                        {this.props.bookStack.get('position')}
                    </div>
                )
        );
        let remove = (
            this.state.removeConfirm ?
                (
                    <div className="remove">
                        <button className="cancel" onClick={e => this.handleCancel(e)}>Cancel</button>
                        <button className="confirm" onClick={e => this.handleConfirm(e)}>Remove</button>
                    </div>
                ) :
                (
                    <div className="remove">
                        <a onClick={e => this.handleRemove(e)}>Remove</a>
                    </div>
                )
        );
        let addCategory = (
            this.state.addingCategory ?
                (
                    <div>
                        <div className="addCategory" onClick={e => this.toggleAddingCategory(e)}>- Cancel</div>
                        <AddCategory
                            id={this.props.bookStack.get('id')}
                        />
                    </div>
                ) :
                (
                    <div>
                        <div className="addCategory" onClick={e => this.toggleAddingCategory(e)}>+ Add category</div>
                    </div>
                )
        );
        return (
            <div
                draggable="true"
                className={classString}
                onDragStart={e => this.handleDragStart(e)}
                onDragEnd={e => this.handleDragEnd(e)}
                onDrop={e => this.handleDrop(e)}
                onDragOver={e => this.handleDragOver(e)}>
                <div className="position one column">
                    {position}
                </div>
                <div>
                    <div className="moveArrow" onClick={e => this.moveUp(e)}>↑</div>
                    <div className="moveArrow" onClick={e => this.moveDown(e)}>↓</div>
                </div>
                <Book book={this.props.bookStack.get('book')} staticPath={staticPath}/>
                <div className="info seven columns">
                    <div className="categories">
                        <h5>Categories</h5>
                        <ul>
                            {this.props.bookStack.get('categories').map(function (category) {
                                return (
                                    <li key={category.get('id')}>
                                        {category.getIn(['detail','category'])} -
                                        <span onClick={e => this.removeCategory(category.get('id'))}>
                                            Remove
                                        </span>
                                    </li>
                                );
                            }, this)}
                        </ul>
                        {addCategory}
                    </div>
                    <div className="read">
                        Read:
                        <input
                            onChange={e => this.toggleRead(e)}
                            type="checkbox"
                            checked={this.props.bookStack.get('read')}
                        />
                    </div>
                    {remove}
                </div>
            </div>
        );
    }
}

module.exports = BookStack;