import { useCallback } from 'react';

import { Header } from '/src/components/Header';
import { SearchBar } from './components/SearchBar';
import { TaskList } from '/src/components/TaskList';
import { useStore } from '/src/store/StoreProvider';
import { STATUS } from '/src/components/SearchBar/types';

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
      <TaskList />
    </>
  );
};
