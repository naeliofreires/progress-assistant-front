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
import { STATUS } from '/src/components/SearchBar/types';
import { deleteOne, getAll, save, updateOne } from '/src/graphql/services';

import { StoreProviderType } from './types';

const StoreContext = createContext({} as StoreProviderType);

export const useStore = () => useContext(StoreContext);

export const StoreProvider: React.FC = ({ children }) => {
  const [store, setStore] = useState<StoreProviderType>({
    pagination: { page: 1, pageSize: 5 },
    filter: { title: '', status: STATUS.ALL },
    tasks: [] as TaskType[],
  } as StoreProviderType);

  const load = async () => {
    let tasks = await getAll(store.pagination);

    switch (store.filter.status) {
      case STATUS.DONE:
        tasks = tasks.filter((task) => task.attributes.completed);
        break;
      case STATUS.IN_PROGRESS:
        tasks = tasks.filter((task) => !task.attributes.completed);
        break;
    }

    if (store.filter.title) {
      tasks = tasks.filter((item) =>
        item.attributes.title.includes(store.filter.title)
      );
    }

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

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, [store.filter]); // eslint-disable-line

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

  const onSelectFilterStatus = useCallback(
    (filter: { status: STATUS; title: string }) => {
      setStore(
        produce((draftStore) => {
          draftStore.filter.title = filter.title;
          draftStore.filter.status = filter.status;
        })
      );
    },
    []
  );

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
        actions: {
          add,
          remove,
          update,
          reload,
          loadNextPage,
          loadPreviousPage,
          onSelectFilterStatus,
        },
      } as StoreProviderType),
    [store] // eslint-disable-line
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
