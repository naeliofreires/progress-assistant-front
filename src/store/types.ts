import { TaskType } from '/src/components/Task/types';
import { PaginationArg, TaskInput } from '/src/graphql/services/types';
import { STATUS } from '/src/components/SearchBar/types';

export enum PROMISE_STATUS {
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  CANCELED = 'CANCELED',
}

export type PromiseResult = {
  message?: string;
  status: PROMISE_STATUS;
};

export type ErrorTypeOverlap = {
  message: string;
};

export type StoreProviderType = {
  tasks: TaskType[];
  pagination: Omit<PaginationArg, 'limit' | 'start'>;
  filter: { title: string; status: STATUS };
  actions: {
    reload(): Promise<void>;
    loadNextPage(): Promise<void>;
    loadPreviousPage(): Promise<void>;
    add(task: TaskInput): Promise<PromiseResult>;
    update(task: TaskType): Promise<void>;
    remove(id: number | string): Promise<PromiseResult>;
    onSelectFilterStatus(value: { status: STATUS; title: string }): void;
  };
};
