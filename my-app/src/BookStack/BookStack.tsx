import * as React from 'react';
import { connect } from 'react-redux';
import * as propTypes from 'prop-types';
import * as immutablePropTypes from 'react-immutable-proptypes';

import { IBookStack } from './types';
import * as stackDetailActions from '../StackDetail/stackDetailModule';
import Book from '../Book/Book';
import ConnectedAddCategory from '../AddCategory/AddCategory';

const preventDefault = (e: React.MouseEvent) => e.preventDefault();

interface PositionProps {
    id: number,
    editing: boolean,
    fromPosition: number,
    newPosition: number,
    setEditing: (id: number, editing: boolean) => void,
    move: (id: number, fromPosition: number, toPosition: number) => void,
    setNewPosition: (id: number, position: number | null) => void,
}

const Position = ({
    id,
    editing,
    fromPosition,
    newPosition,
    setEditing,
    move,
    setNewPosition,
}: PositionProps) => (
    editing ?
        (
            <div>
                <input
                    className="input position"
                    autoFocus
                    type="text"
                    onChange={e =>
                        e.target.value && setNewPosition(id, parseInt(e.target.value, 10))
                    }
                    value={newPosition}
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

interface RemoveBookProps {
    id: number,
    removeConfirm: boolean,
    setRemoveConfig: (id: number, remove: boolean) => void,
    deleteBook: (id: number) => void,
}

const RemoveBook = ({
    id,
    removeConfirm,
    setRemoveConfig,
    deleteBook,
}: RemoveBookProps) => (
    removeConfirm ?
        (
            // TODO: MAKE MODAL
            <div className="remove">
                <button
                    className="cancel button is-warning"
                    onClick={() => setRemoveConfig(id, false)}
                >
                    Cancel
                </button>
                <button
                    className="confirm button"
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
                <button
                    onClick={() =>
                        setRemoveConfig(id, true)}
                    className="button is-centered"
                >
                    Remove
                </button>
            </div>
        )
);


RemoveBook.propTypes = {
    id: propTypes.number.isRequired,
    removeConfirm: propTypes.bool.isRequired,
    setRemoveConfig: propTypes.func.isRequired,
    deleteBook: propTypes.func.isRequired,
};

interface AddNewCategoryProps {
    id: number,
    addingCategory: boolean,
    setAddingCategory: (id: number, remove: boolean) => void,
}

const AddNewCategory = ({
    id,
    addingCategory,
    setAddingCategory,
}: AddNewCategoryProps) => (
    addingCategory ?
        (
            <div>
                <div
                    className="addCategory"
                    onClick={() =>
                        setAddingCategory(id, !addingCategory)}
                >- Cancel
                </div>
                <ConnectedAddCategory
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

interface BookStackProps {
    bookStack: IBookStack,
    staticPath: string,
    setEditing: (id: number, editing: boolean) => void,
    updatePosition: (id: number, fromPosition: number, toPosition: number) => void,
    setNewPosition: (id: number, position: number | null) => void,
    removeCategory: (id: number, categoryId: number) => void,
    setAddingCategory: (id: number, remove: boolean) => void,
    setRemoveConfig: (id: number, remove: boolean) => void
    deleteBook: (id: number) => void,
    setReadState: (id: number, readState: boolean) => void,
}

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
}: BookStackProps) => {
    const editing = bookStack.editing;
    const removeConfirm = bookStack.removeConfirm;
    const addingCategory = bookStack.addingCategory;
    const newPosition = bookStack.newPosition;
    const position = bookStack.position;
    const id = bookStack.id;
    const move = (moveId: number, fromPosition: number, toPosition: number) => {
        if (toPosition > 0 && toPosition < bookStack.size && toPosition !== fromPosition) {
            updatePosition(moveId, fromPosition, toPosition);
        }
    };
    const moveUp = () => move(id, position, position - 1);
    const moveDown = () => move(id, position, position + 1);
    let classString = 'bookstack columns';
    if (bookStack.read) {
        classString += ' is-read';
    }
    return (
        <div
            draggable={true}
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
            <div className="media-left position">
                <div className="centered">
                    <div className="is-pulled-left">
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
                    <div className="is-pulled-left">
                        <div className="move-arrow" onClick={moveUp}>↑</div>
                        <div className="move-arrow" onClick={moveDown}>↓</div>
                    </div>
                </div>
                <div className="">
                    <button
                        onClick={() =>
                            setReadState(bookStack.id, !bookStack.read)}
                        className={`button is-centered${bookStack.read ? ' is-info is-active' : ''}`}
                    >
                        Read
                    </button>
                    <RemoveBook
                        id={id}
                        removeConfirm={removeConfirm}
                        setRemoveConfig={setRemoveConfig}
                        deleteBook={deleteBook}
                    />
                </div>
            </div>
            <Book book={bookStack.book} staticPath={staticPath} />
            <div className="categories column">
                <h5>Categories</h5>
                <ul>
                    {bookStack.categories.map(category =>
                        (
                            <li key={category.id}>
                                {category.detail.category} -
                                <span onClick={() =>
                                    removeCategory(bookStack.id, category.id)}
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

const mapDispatchToProps = {
    setEditing: stackDetailActions.setEditing,
    setRemoveConfig: stackDetailActions.setRemoveConfig,
    setAddingCategory: stackDetailActions.setAddingCategory,
    setNewPosition: stackDetailActions.setNewPosition,
};

export default connect(
    null,
    mapDispatchToProps,
)(BookStack);
