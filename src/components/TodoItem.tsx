import React, { useState } from 'react';
import classNames from 'classnames';
import { TodoItemProps } from '../types/Props';

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  isLoading,
}) => {
  const [isDeletingItem, setIsDeletingItem] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsDeletingItem(true);
    await onDelete(todo.id);
    setIsDeletingItem(false);
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label
        className="todo__status-label"
        aria-label={`Mark todo as ${todo.completed ? 'incomplete' : 'complete'}`}
      >
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          readOnly
        />
      </label>
      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleDelete}
        disabled={isDeletingItem}
      >
        ×
      </button>

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': isLoading || isDeletingItem,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
