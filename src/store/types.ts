import { TaskType } from '/src/components/Task/types';
import { PaginationArg, TaskInput } from '/src/graphql/services/types';
import { STATUS } from '/src/components/SearchBar/types';

export type StoreProviderType = {
  tasks: TaskType[];
  pagination: Omit<PaginationArg, 'limit' | 'start'>;
  filter: { title: string; status: STATUS };
  actions: {
    reload(): Promise<void>;
    loadNextPage(): Promise<void>;
    loadPreviousPage(): Promise<void>;
    add(task: TaskInput): Promise<void>;
    update(task: TaskType): Promise<void>;
    remove(id: number | string): Promise<void>;
    onSelectFilterStatus(value: { status: STATUS; title: string }): void;
  };
};
