import React from 'react';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import Book from '../Book/Book';
import AddCategory from '../AddCategory/AddCategory';

class BookStack extends React.Component {
    static handleDragOver(e) {
        e.preventDefault();
    }

    static handleDragEnd(e) {
        e.preventDefault();
    }

    constructor() {
        super();
        this.state = {
            editing: false,
            removeConfirm: false,
            addingCategory: false,
        };
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

    toggleRead(e) {
        this.props.updateReadState(this.props.bookStack.get('id'), e.target.checked);
    }

    updatePosition(id, fromPosition, toPosition) {
        if (fromPosition !== toPosition) {
            this.props.updatePosition(id, fromPosition, toPosition);
        }
    }

    moveUp() {
        const fromPosition = this.props.bookStack.get('position');
        const toPosition = fromPosition - 1;
        const id = this.props.bookStack.get('id');
        if (toPosition > 0) {
            this.updatePosition(id, fromPosition, toPosition);
        }
    }

    moveDown() {
        const fromPosition = this.props.bookStack.get('position');
        const toPosition = fromPosition + 1;
        const id = this.props.bookStack.get('id');
        this.updatePosition(id, fromPosition, toPosition);
    }

    handleBlur(e) {
        const toPosition = parseInt(e.target.value, 10);
        const fromPosition = this.props.bookStack.get('position');
        const id = this.props.bookStack.get('id');
        this.setEditingStateOff();
        this.updatePosition(id, fromPosition, toPosition);
    }

    handleDragStart(e) {
        e.dataTransfer.setData('text', JSON.stringify({
            id: this.props.bookStack.get('id'),
            position: this.props.bookStack.get('position'),
        }));
    }

    handleDrop(e) {
        const { id, position: fromPosition } = JSON.parse(e.dataTransfer.getData('text'));
        const toPosition = this.props.bookStack.get('position');
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
        const id = this.props.bookStack.get('id');
        this.props.deleteBook(id);
        this.setState({
            removeConfirm: false,
        });
    }

    toggleAddingCategory() {
        this.setState({
            addingCategory: !this.state.addingCategory,
        });
    }

    removeCategory(categoryId) {
        const bookstackId = this.props.bookStack.get('id');
        this.props.removeCategory(bookstackId, categoryId);
    }

    render() {
        const { staticPath } = this.props;
        let classString = 'bookstack row';
        if (this.props.bookStack.get('read')) {
            classString += ' isRead';
        }
        const position = (
            this.state.editing ?
                (
                    <div>
                        <input
                            autoFocus
                            ref={input => (input !== null) && input.select()}
                            className="position"
                            onBlur={e => this.handleBlur(e)}
                            defaultValue={this.props.bookStack.get('position')}
                            onMouseOut={e => this.setEditingStateOff(e)}
                        />
                    </div>
                ) :
                (
                    <div
                        onClick={e => this.setEditingStateOn(e)}
                    >
                        {this.props.bookStack.get('position')}
                    </div>
                )
        );
        const remove = (
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
        const addCategory = (
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
                onDragOver={e => this.handleDragOver(e)}
            >
                <div className="position one column">
                    {position}
                </div>
                <div>
                    <div className="moveArrow" onClick={e => this.moveUp(e)}>↑</div>
                    <div className="moveArrow" onClick={e => this.moveDown(e)}>↓</div>
                </div>
                <Book book={this.props.bookStack.get('book')} staticPath={staticPath} />
                <div className="info seven columns">
                    <div className="categories">
                        <h5>Categories</h5>
                        <ul>
                            {this.props.bookStack.get('categories').map(category =>
                                (
                                    <li
                                        key={category.get('id')}
                                    >
                                        {category.getIn(['detail', 'category'])} -
                                        <span onClick={() => this.removeCategory(category.get('id'))}>
                                            Remove
                                        </span>
                                    </li>
                                ))}
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

BookStack.defaultProps = {
    updateReadState: () => {},
    staticPath: '',
};

BookStack.propTypes = {
    updateReadState: propTypes.func,
    bookStack: immutablePropTypes.map.isRequired,
    updatePosition: propTypes.func.isRequired,
    deleteBook: propTypes.func.isRequired,
    removeCategory: propTypes.func.isRequired,
    staticPath: propTypes.string,
};

export default BookStack;
