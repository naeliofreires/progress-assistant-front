import { TaskType } from '/src/components/Task/types';
import { PaginationArg, TaskInput } from '/src/graphql/services/types';

export type StoreProviderType = {
  tasks: TaskType[];
  pagination: Omit<PaginationArg, 'limit' | 'start'>;
  actions: {
    reload(): Promise<void>;
    loadNextPage(): Promise<void>;
    loadPreviousPage(): Promise<void>;
    add(task: TaskInput): Promise<void>;
    update(task: TaskType): Promise<void>;
    remove(id: number | string): Promise<void>;
  };
};
