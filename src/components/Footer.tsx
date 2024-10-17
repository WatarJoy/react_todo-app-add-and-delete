import React from 'react';
import { FooterProps } from '../types/Props';
import { FilterStates } from '../types/enums';

export const Footer: React.FC<FooterProps> = ({
  todos,
  filter,
  setFilter,
  onClearCompleted,
}) => {
  const activeTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterStates).map(state => (
          <a
            key={state}
            href={`#/${state}`}
            className={`filter__link ${filter === state ? 'selected' : ''}`}
            data-cy={`FilterLink${state.charAt(0).toUpperCase() + state.slice(1)}`}
            onClick={() => setFilter(state)}
          >
            {state.charAt(0).toUpperCase() + state.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
        onClick={onClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
