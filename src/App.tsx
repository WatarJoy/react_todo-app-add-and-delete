import React, { useEffect, useState } from 'react';
import { getTodos, addTodo, deleteTodo, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { FilterStates } from './types/enums';
import { TodoItem } from './components/TodoItem';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStates>(FilterStates.ALL);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();

        setTodos(data);
      } catch (err) {
        setError('Unable to load todos');
        const timer = setTimeout(() => {
          setError(null);
        }, 3000);

        return () => clearTimeout(timer);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const newTempTodo: Todo = {
        id: 0,
        userId: USER_ID,
        title,
        completed: false,
      };

      setTempTodo(newTempTodo);

      const newTodo = await addTodo(title.trim());

      setTodos(prevTodos => [...prevTodos, newTodo]);
      setTempTodo(null);
      setTitle('');
    } catch {
      setError('Unable to add a todo');
      setTempTodo(null);
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        const input =
          document.querySelector<HTMLInputElement>('.todoapp__new-todo');

        input?.focus();
      }, 100);
    }
  };

  const handleDeleteTodo = async (todoId: number): Promise<void> => {
    try {
      await deleteTodo(todoId);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId));
    } catch {
      setError('Unable to delete a todo');
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);

      clearTimeout(timer);
    } finally {
      setTimeout(() => {
        const input =
          document.querySelector<HTMLInputElement>('.todoapp__new-todo');

        input?.focus();
      }, 100);
    }
  };

  const handleHideError = () => {
    setError(null);
  };

  const handleClearCompleted = async (): Promise<void> => {
    const completedTodos = todos.filter(todo => todo.completed);

    try {
      const deletionResults = await Promise.allSettled(
        completedTodos.map(todo => handleDeleteTodo(todo.id)),
      );

      const hasErrors = deletionResults.some(
        result => result.status === 'rejected',
      );

      if (hasErrors) {
        setError('Unable to delete some completed todos');
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } catch {
      setError('Unable to clear completed todos');
      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setTimeout(() => {
        const input =
          document.querySelector<HTMLInputElement>('.todoapp__new-todo');

        input?.focus();
      }, 100);
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case FilterStates.ACTIVE:
        return !todo.completed;
      case FilterStates.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  const hasTodos = todos.length > 0;
  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header
          allCompleted={allCompleted}
          onAddTodo={handleAddTodo}
          isLoading={isLoading}
          setError={setError}
          setIsLoading={setIsLoading}
          title={title}
          setTitle={setTitle}
        />
        {hasTodos && (
          <TodoList
            todos={filteredTodos}
            onDelete={handleDeleteTodo}
            isLoading={false}
            setIsLoading={setIsLoading}
            isDeleting={false}
          />
        )}
        {tempTodo && (
          <TodoItem
            todo={tempTodo}
            onDelete={handleDeleteTodo}
            isLoading={isLoading}
          />
        )}
        {hasTodos && (
          <Footer
            todos={todos}
            filter={filter}
            setFilter={setFilter}
            onClearCompleted={handleClearCompleted}
          />
        )}
      </div>
      <ErrorNotification error={error} onHideError={handleHideError} />
    </div>
  );
};
