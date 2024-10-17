import React from 'react';
import classNames from 'classnames';
import { HeaderProps } from '../types/Props';

export const Header: React.FC<HeaderProps> = ({
  allCompleted,
  onAddTodo,
  isLoading,
  setError,
  title,
  setTitle,
}) => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      setError('Title should not be empty');
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }

    try {
      await onAddTodo(title.trim());
    } catch (error) {}
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={classNames('todoapp__toggle-all', { active: allCompleted })}
        data-cy="ToggleAllButton"
      />
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => setTitle(event.target.value)}
          disabled={isLoading}
          autoFocus
        />
      </form>
    </header>
  );
};
