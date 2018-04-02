import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import immutablePropTypes from 'react-immutable-proptypes';

import * as bookStackActions from './bookStackModule';
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
    editing === id ?
        (
            <div>
                <input
                    autoFocus
                    onChange={e =>
                        e.target.value && setNewPosition(parseInt(e.target.value, 10))
                    }
                    value={newPosition}
                    className="position"
                    onBlur={(e) => {
                        const toPosition = parseInt(e.target.value, 10);
                        setEditing(null);
                        move(id, fromPosition, toPosition);
                        setNewPosition(null);
                    }}
                    defaultValue={fromPosition}
                    onMouseOut={() => setEditing(null)}
                />
            </div>
        ) :
        (
            <div
                onClick={() => {
                    setNewPosition(fromPosition);
                    setEditing(id);
                }}
            >
                {fromPosition}
            </div>
        )
);

Position.defaultProps = {
    newPosition: null,
    editing: null,
};

Position.propTypes = {
    id: propTypes.number.isRequired,
    fromPosition: propTypes.number.isRequired,
    editing: propTypes.number,
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
                    onClick={() => setRemoveConfig(false)}
                >
                    Cancel
                </button>
                <button
                    className="confirm"
                    onClick={() => {
                        deleteBook(id);
                        setRemoveConfig(false);
                    }}
                >
                    Remove
                </button>
            </div>
        ) :
        (
            <div className="remove">
                <a onClick={() => setRemoveConfig(true)}>Remove</a>
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
                        setAddingCategory(!addingCategory)}
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
                    onClick={() => setAddingCategory(!addingCategory)}
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

const mapStateToProps = state => ({
    editing: state.bookStackStore.get('editing'),
    removeConfirm: state.bookStackStore.get('removeConfirm'),
    addingCategory: state.bookStackStore.get('addingCategory'),
    newPosition: state.bookStackStore.get('newPosition'),
});

const mapDispatchToProps = {
    setEditing: bookStackActions.setEditing,
    setRemoveConfig: bookStackActions.setRemoveConfig,
    setAddingCategory: bookStackActions.setAddingCategory,
    setNewPosition: bookStackActions.setNewPosition,
};

const BookStack = ({
    bookStack,
    staticPath,
    editing,
    newPosition,
    setEditing,
    updatePosition,
    setNewPosition,
    removeCategory,
    addingCategory,
    setAddingCategory,
    removeConfirm,
    setRemoveConfig,
    deleteBook,
    setReadState,
}) => {
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
    newPosition: null,
    editing: null,
};

BookStack.propTypes = {
    editing: propTypes.number,
    removeConfirm: propTypes.bool.isRequired,
    addingCategory: propTypes.bool.isRequired,
    setEditing: propTypes.func.isRequired,
    setNewPosition: propTypes.func.isRequired,
    setAddingCategory: propTypes.func.isRequired,
    bookStack: immutablePropTypes.map.isRequired,
    updatePosition: propTypes.func.isRequired,
    deleteBook: propTypes.func.isRequired,
    removeCategory: propTypes.func.isRequired,
    setRemoveConfig: propTypes.func.isRequired,
    staticPath: propTypes.string,
    newPosition: propTypes.number,
    setReadState: propTypes.func.isRequired,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BookStack);
