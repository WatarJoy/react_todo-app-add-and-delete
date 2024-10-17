import { Todo } from './Todo';
import { FilterStates } from '../types/enums';

export interface ErrorNotificationProps {
  error: string | null;
  onHideError: () => void;
}

export interface FooterProps {
  todos: Todo[];
  filter: FilterStates;
  setFilter: React.Dispatch<React.SetStateAction<FilterStates>>;
  onClearCompleted: () => void;
}

export interface HeaderProps {
  allCompleted: boolean;
  onAddTodo: (title: string) => Promise<void>;
  isLoading: boolean;
  setError: (error: string | null) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

export interface TodoItemProps {
  todo: Todo;
  onDelete: (todoId: number) => Promise<void>;
  isLoading: boolean;
}

export interface TodoListProps {
  todos: Todo[];
  onDelete: (todoId: number) => Promise<void>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleting: boolean;
}
