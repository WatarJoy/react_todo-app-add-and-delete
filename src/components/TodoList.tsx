import React from 'react';
import { TodoListProps } from '../types/Props';
import { TodoItem } from '../components/TodoItem';

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onDelete,
  isLoading,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          isLoading={isLoading}
        />
      ))}
    </section>
  );
};
