import * as React from 'react';
import { connect } from 'react-redux';

import { IBookStack } from './types';
import * as stackDetailActions from '../StackDetail/stackDetailModule';
import Book from '../Book/Book';
import ConnectedAddCategory from '../AddCategory/AddCategory';

const preventDefault = (e: React.MouseEvent) => e.preventDefault();

interface PositionProps {
    id: number;
    editing: boolean;
    fromPosition: number;
    newPosition: number;
    setEditing: (id: number, editing: boolean) => void;
    move: (id: number, fromPosition: number, toPosition: number) => void;
    setNewPosition: typeof stackDetailActions.setNewPosition;
}

const Position = ({
    id,
    editing,
    fromPosition,
    newPosition,
    setEditing,
    move,
    setNewPosition,
}: PositionProps) =>
    editing ? (
        <div>
            <input
                className="input position"
                autoFocus
                type="text"
                onChange={e =>
                    e.target.value &&
                    // tslint:disable-next-line: ban
                    setNewPosition(id, parseInt(e.target.value, 10))
                }
                value={newPosition}
                onBlur={e => {
                    // tslint:disable-next-line: ban
                    const toPosition = parseInt(e.target.value, 10);
                    setEditing(id, false);
                    move(id, fromPosition, toPosition);
                    setNewPosition(id, null);
                }}
                onMouseOut={() => setEditing(id, false)}
            />
        </div>
    ) : (
        <div
            onClick={() => {
                setNewPosition(id, fromPosition);
                setEditing(id, true);
            }}
        >
            {fromPosition}
        </div>
    );

interface RemoveBookProps {
    id: number;
    removeConfirm: boolean;
    setRemoveConfig: (id: number, remove: boolean) => void;
    deleteBook: typeof stackDetailActions.stackDetailRemoveBookRequest;
}

const RemoveBook = ({
    id,
    removeConfirm,
    setRemoveConfig,
    deleteBook,
}: RemoveBookProps) =>
    removeConfirm ? (
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
    ) : (
        <div className="remove">
            <button
                onClick={() => setRemoveConfig(id, true)}
                className="button is-centered"
            >
                Remove
            </button>
        </div>
    );

interface AddNewCategoryProps {
    id: number;
    addingCategory: boolean;
    setAddingCategory: (id: number, remove: boolean) => void;
}

const AddNewCategory = ({
    id,
    addingCategory,
    setAddingCategory,
}: AddNewCategoryProps) =>
    addingCategory ? (
        <div>
            <div
                className="addCategory"
                onClick={() => setAddingCategory(id, !addingCategory)}
            >
                - Cancel
            </div>
            <ConnectedAddCategory id={id} />
        </div>
    ) : (
        <div>
            <div
                className="addCategory"
                onClick={() => setAddingCategory(id, !addingCategory)}
            >
                + Add category
            </div>
        </div>
    );

interface PropsFromDispatch {
    setEditing: typeof stackDetailActions.setEditing;
    setRemoveConfig: typeof stackDetailActions.setRemoveConfig;
    setAddingCategory: typeof stackDetailActions.setAddingCategory;
    setNewPosition: typeof stackDetailActions.setNewPosition;
}

interface OwnProps {
    bookStack: IBookStack;
    staticPath: string;
    updatePosition: typeof stackDetailActions.stackDetailPositionRequest;
    removeCategory: typeof stackDetailActions.stackDetailRemoveCategoryRequest;
    deleteBook: typeof stackDetailActions.stackDetailRemoveBookRequest;
    setReadState: (id: number, readState: boolean) => void;
}

type BookStackProps = PropsFromDispatch & OwnProps;

export class BookStack extends React.Component<BookStackProps> {
    render() {
        const {
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
        } = this.props;
        const editing = bookStack.editing;
        const removeConfirm = bookStack.removeConfirm;
        const addingCategory = bookStack.addingCategory;
        const newPosition = bookStack.newPosition;
        const position = bookStack.position;
        const id = bookStack.id;
        const move = (
            moveId: number,
            fromPosition: number,
            toPosition: number
        ) => {
            if (toPosition > 0 && toPosition !== fromPosition) {
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
                onDragStart={e => {
                    e.dataTransfer.setData(
                        'text',
                        JSON.stringify({
                            id,
                            position,
                        })
                    );
                }}
                onDragEnd={preventDefault}
                onDrop={e => {
                    const { id: movedId, position: fromPosition } = JSON.parse(
                        e.dataTransfer.getData('text')
                    );
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
                            <div className="move-arrow" onClick={moveUp}>
                                ↑
                            </div>
                            <div className="move-arrow" onClick={moveDown}>
                                ↓
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <button
                            onClick={() =>
                                setReadState(bookStack.id, !bookStack.read)
                            }
                            className={`button is-centered${
                                bookStack.read ? ' is-info is-active' : ''
                            }`}
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
                        {bookStack.categories.map(category => (
                            <li key={category.id}>
                                {category.detail.category} -
                                <span
                                    onClick={() =>
                                        removeCategory(
                                            bookStack.id,
                                            category.id
                                        )
                                    }
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
    }
}

const mapDispatchToProps = {
    setEditing: stackDetailActions.setEditing,
    setRemoveConfig: stackDetailActions.setRemoveConfig,
    setAddingCategory: stackDetailActions.setAddingCategory,
    setNewPosition: stackDetailActions.setNewPosition,
};

export default connect(null, mapDispatchToProps)(BookStack);
