import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import produce from 'immer';
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
    setTimeout(async () => {
      /**
       * @Info
       * - this function will be dispatched every time that store suffer a change
       */
      await StorageUtil.setStorage(JSON.stringify(store));
    }, 1500);
  }, [store]);

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

  const reload = useCallback(async () => {
    const pagination = { page: 1, pageSize: 5 };
    const tasks = await getAll(pagination);

    setStore(
      produce((draftStore) => {
        draftStore.tasks = tasks;
        draftStore.pagination = pagination;
      })
    );
  }, []);

  async function add(item: TaskInput): Promise<void> {
    try {
      const createdTask = (await save(item)) as TaskType;

      setStore(
        produce((draftStore) => {
          draftStore.tasks.push(createdTask);
        })
      );

      ToastUtil.success();
    } catch (e) {
      ToastUtil.handleErrorEvent(e as string | string[]);
    }
  }

  async function remove(id: number): Promise<void> {
    try {
      await deleteOne(id);

      setStore(
        produce((draftStore) => {
          draftStore.tasks = draftStore.tasks.filter((item) => item.id !== id);
        })
      );

      ToastUtil.success('deleted!');
    } catch (e) {
      ToastUtil.handleErrorEvent(e as string | string[]);
    }
  }

  async function update(data: TaskType): Promise<void> {
    try {
      const updatedTask = await updateOne(data);

      if (updatedTask) {
        setStore(
          produce((draftStore) => {
            draftStore.tasks = draftStore.tasks.map((item) => {
              if (item.id === data.id) {
                return updatedTask;
              }

              return item;
            });
          })
        );
      }

      ToastUtil.success('updated!');
    } catch (e) {
      ToastUtil.handleErrorEvent(e as string | string[]);
    }
  }

  async function loadPreviousPage(): Promise<void> {
    const page = Number(store.pagination.page - 1);

    if (page === 0) return;

    const pagination = { ...store.pagination, page };
    const tasks = await getAll(pagination);

    setStore(
      produce((draftStore) => {
        draftStore.tasks = tasks;
        draftStore.pagination = pagination;
      })
    );
  }

  async function loadNextPage(): Promise<void> {
    const page = Number(store.pagination.page + 1);
    const pagination = { ...store.pagination, page };

    const tasks = await getAll(pagination);
    setStore(
      produce((draftStore) => {
        draftStore.tasks = tasks;
        draftStore.pagination = pagination;
      })
    );
  }

  const value = useMemo(
    () =>
      ({
        ...store,
        actions: {
          add,
          remove,
          update,
          reload,
          loadPreviousPage,
          loadNextPage,
        },
      } as StoreProviderType),
    [store] // eslint-disable-line
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
