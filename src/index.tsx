import { Header } from '/src/components/Header';
import { TaskList } from '/src/components/TaskList';
import { NewTaskForm } from '/src/components/NewTaskForm';
import { useStore } from '/src/store/StoreProvider';
import { SearchBar } from './components/SearchBar';
import { STATUS } from '/src/components/SearchBar/types';
import { useCallback } from 'react';

export const App = () => {
  const { actions, filter } = useStore();

  const onSelectState = useCallback(
    async (value: STATUS) => {
      actions.onSelectFilterStatus({ ...filter, status: value });
    },
    [actions, filter]
  );

  const onSearch = useCallback(
    async (title: string) => {
      actions.onSelectFilterStatus({ ...filter, title });
    },
    [actions, filter]
  );

  return (
    <>
      <Header />
      <SearchBar onSelect={onSelectState} onSearch={onSearch} />
      <NewTaskForm />
      <TaskList />
    </>
  );
};
