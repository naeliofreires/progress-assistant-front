import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ToastUtil } from '/src/utils/toast';
import { StorageUtil } from '/src/utils/storage';
import { TaskType } from '/src/components/Task/types';
import { TaskInput } from '/src/graphql/services/types';
import { deleteOne, getAll, save, updateOne } from '/src/graphql/services';

import { StoreProviderType } from './types';

const StoreContext = createContext({} as StoreProviderType);

export const useStore = () => useContext(StoreContext);

export const StoreProvider: React.FC = ({ children }) => {
  const [store, setStore] = useState<StoreProviderType>({
    pagination: {
      page: 1,
      pageSize: 5,
    },
    tasks: [] as TaskType[],
  } as StoreProviderType);

  const load = async () => {
    const tasks = await getAll(store.pagination);
    setStore((state) => ({ ...state, tasks }));
  };

  useEffect(() => {
    (async () => {
      const storage = await StorageUtil.getStorage();

      if (storage) {
        const pagination = JSON.parse(storage).pagination;
        const tasks = JSON.parse(storage).tasks ?? [];

        if (pagination.page === 1 && tasks.length === 0) {
          await load();
        }

        setStore((state) => ({ ...state, ...JSON.parse(storage) }));
      } else {
        await load();
      }
    })();
  }, []); // eslint-disable-line

  const add = async (item: TaskInput) => {
    try {
      await save(item);
      await load();
      ToastUtil.success();
    } catch (e) {
      ToastUtil.handleErrorEvent(e as string | string[]);
    }
  };

  const remove = async (id: number) => {
    try {
      await deleteOne(id);
      await load();
      ToastUtil.success('deleted!');
    } catch (e) {
      ToastUtil.handleErrorEvent(e as string | string[]);
    }
  };

  const update = async (data: TaskType) => {
    try {
      const updatedTask = await updateOne(data);

      if (updatedTask) {
        setStore((prevState: StoreProviderType) => ({
          ...prevState,
          tasks: prevState.tasks.map((item) => {
            if (item.id === data.id) {
              return updatedTask;
            }

            return item;
          }),
        }));
      }

      ToastUtil.success('updated!');
    } catch (e) {
      ToastUtil.handleErrorEvent(e as string | string[]);
    }
  };

  const loadPreviousPage = async () => {
    const page = Number(store.pagination.page - 1);

    if (page === 0) return;

    const pagination = { ...store.pagination, page };
    const tasks = await getAll(pagination);
    setStore((state) => ({
      ...state,
      tasks,
      pagination,
    }));
  };

  const loadNextPage = async () => {
    const page = Number(store.pagination.page + 1);
    const pagination = { ...store.pagination, page };

    const tasks = await getAll(pagination);
    setStore((state) => ({ ...state, tasks, pagination }));
  };

  useEffect(() => {
    setTimeout(async () => {
      /**
       * @Info
       * - this function will be dispatched every time that store suffer a change
       */
      await StorageUtil.setStorage(JSON.stringify(store));
    }, 1500);
  }, [store]);

  const value = useMemo(
    () =>
      ({
        ...store,
        actions: { add, remove, update, loadPreviousPage, loadNextPage },
      } as StoreProviderType),
    [store] // eslint-disable-line
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
