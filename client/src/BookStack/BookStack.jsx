import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import * as stackDetailActions from '../StackDetail/stackDetailModule';
import Book from '../Book/Book';
import AddCategory from '../AddCategory/AddCategory';

const preventDefault = e => e.preventDefault();

const Position = ({
    id,
    editing,
    fromPosition,
    newPosition,
    setEditing,
    move,
    setNewPosition,
}) => (
    editing ?
        (
            <div>
                <input
                    autoFocus
                    type="text"
                    onChange={e =>
                        e.target.value && setNewPosition(id, parseInt(e.target.value, 10))
                    }
                    value={newPosition}
                    className="position"
                    onBlur={(e) => {
                        const toPosition = parseInt(e.target.value, 10);
                        setEditing(id, false);
                        move(id, fromPosition, toPosition);
                        setNewPosition(id, null);
                    }}
                    onMouseOut={() => setEditing(id, false)}
                />
            </div>
        ) :
        (
            <div
                onClick={() => {
                    setNewPosition(id, fromPosition);
                    setEditing(id, true);
                }}
            >
                {fromPosition}
            </div>
        )
);

Position.defaultProps = {
    newPosition: 0,
};

Position.propTypes = {
    id: propTypes.number.isRequired,
    fromPosition: propTypes.number.isRequired,
    editing: propTypes.bool.isRequired,
    setEditing: propTypes.func.isRequired,
    setNewPosition: propTypes.func.isRequired,
    move: propTypes.func.isRequired,
    newPosition: propTypes.number,
};

const RemoveBook = ({
    id,
    removeConfirm,
    setRemoveConfig,
    deleteBook,
}) => (
    removeConfirm ?
        (
            <div className="remove">
                <button
                    className="cancel"
                    onClick={() => setRemoveConfig(id, false)}
                >
                    Cancel
                </button>
                <button
                    className="confirm"
                    onClick={() => {
                        deleteBook(id);
                        setRemoveConfig(id, false);
                    }}
                >
                    Remove
                </button>
            </div>
        ) :
        (
            <div className="remove">
                <a onClick={() => setRemoveConfig(id, true)}>Remove</a>
            </div>
        )
);


RemoveBook.propTypes = {
    id: propTypes.number.isRequired,
    removeConfirm: propTypes.bool.isRequired,
    setRemoveConfig: propTypes.func.isRequired,
    deleteBook: propTypes.func.isRequired,
};

const AddNewCategory = ({
    id,
    addingCategory,
    setAddingCategory,
}) => (
    addingCategory ?
        (
            <div>
                <div
                    className="addCategory"
                    onClick={() =>
                        setAddingCategory(id, !addingCategory)}
                >- Cancel
                </div>
                <AddCategory
                    id={id}
                />
            </div>
        ) :
        (
            <div>
                <div
                    className="addCategory"
                    onClick={() => setAddingCategory(id, !addingCategory)}
                >+ Add category
                </div>
            </div>
        )
);

AddNewCategory.propTypes = {
    id: propTypes.number.isRequired,
    addingCategory: propTypes.bool.isRequired,
    setAddingCategory: propTypes.func.isRequired,
};

const mapDispatchToProps = {
    setEditing: stackDetailActions.setEditing,
    setRemoveConfig: stackDetailActions.setRemoveConfig,
    setAddingCategory: stackDetailActions.setAddingCategory,
    setNewPosition: stackDetailActions.setNewPosition,
};

const BookStack = ({
    bookStack,
    staticPath,
    setEditing,
    updatePosition,
    setNewPosition,
    removeCategory,
    setAddingCategory,
    setRemoveConfig,
    deleteBook,
    setReadState,
}) => {
    const editing = bookStack.get('editing');
    const removeConfirm = bookStack.get('removeConfirm');
    const addingCategory = bookStack.get('addingCategory');
    const newPosition = bookStack.get('newPosition');
    const position = bookStack.get('position');
    const id = bookStack.get('id');
    const move = (moveId, fromPosition, toPosition) => {
        if (toPosition > 0 && toPosition < bookStack.size && toPosition !== fromPosition) {
            updatePosition(moveId, fromPosition, toPosition);
        }
    };
    const moveUp = () => move(id, position, position - 1);
    const moveDown = () => move(id, position, position + 1);
    let classString = 'bookstack row';
    if (bookStack.get('read')) {
        classString += ' isRead';
    }
    return (
        <div
            draggable="true"
            className={classString}
            onDragStart={(e) => {
                e.dataTransfer.setData('text', JSON.stringify({
                    id,
                    position,
                }));
            }}
            onDragEnd={preventDefault}
            onDrop={(e) => {
                const { id: movedId, position: fromPosition } = JSON.parse(e.dataTransfer.getData('text'));
                move(movedId, fromPosition, position);
            }}
            onDragOver={preventDefault}
        >
            <div className="position one column">
                <Position
                    id={id}
                    editing={editing}
                    fromPosition={position}
                    newPosition={newPosition}
                    setEditing={setEditing}
                    move={move}
                    setNewPosition={setNewPosition}
                />
            </div>
            <div>
                <div className="moveArrow" onClick={e => moveUp(e)}>↑</div>
                <div className="moveArrow" onClick={e => moveDown(e)}>↓</div>
            </div>
            <Book book={bookStack.get('book')} staticPath={staticPath} />
            <div className="info seven columns">
                <div className="categories">
                    <h5>Categories</h5>
                    <ul>
                        {bookStack.get('categories').map(category =>
                            (
                                <li key={category.get('id')}>
                                    {category.getIn(['detail', 'category'])} -
                                    <span onClick={() =>
                                        removeCategory(bookStack.get('id'), category.get('id'))}
                                    >
                                        Remove
                                    </span>
                                </li>
                            ))}
                    </ul>
                    <AddNewCategory
                        id={id}
                        addingCategory={addingCategory}
                        setAddingCategory={setAddingCategory}
                    />
                </div>
                <div className="read">
                    Read:
                    <input
                        onChange={e => setReadState(bookStack.get('id'), Boolean(e.target.checked))}
                        type="checkbox"
                        checked={bookStack.get('read')}
                    />
                </div>
                <RemoveBook
                    id={id}
                    removeConfirm={removeConfirm}
                    setRemoveConfig={setRemoveConfig}
                    deleteBook={deleteBook}
                />
            </div>
        </div>
    );
};

BookStack.defaultProps = {
    updateReadState: () => {},
    staticPath: '',
};

BookStack.propTypes = {
    setEditing: propTypes.func.isRequired,
    setNewPosition: propTypes.func.isRequired,
    setAddingCategory: propTypes.func.isRequired,
    bookStack: immutablePropTypes.map.isRequired,
    updatePosition: propTypes.func.isRequired,
    deleteBook: propTypes.func.isRequired,
    removeCategory: propTypes.func.isRequired,
    setRemoveConfig: propTypes.func.isRequired,
    staticPath: propTypes.string,
    setReadState: propTypes.func.isRequired,
};

export default connect(
    null,
    mapDispatchToProps,
)(BookStack);
