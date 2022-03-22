import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import produce from 'immer';
import { StorageUtil } from '/src/utils/storageUtil';
import { TaskType } from '/src/components/Task/types';
import { TaskInput } from '/src/graphql/services/types';
import { STATUS } from '/src/components/SearchBar/types';
import { deleteOne, getAll, save, updateOne } from '/src/graphql/services';

import { ErrorTypeOverlap, PROMISE_STATUS, StoreProviderType } from './types';
import { TaskUtil } from '/src/utils/taskUtil';

const StoreContext = createContext({} as StoreProviderType);

export const useStore = () => useContext(StoreContext);

export const StoreProvider: React.FC = ({ children }) => {
  const [store, setStore] = useState<StoreProviderType>({
    pagination: { page: 1, pageSize: 5 },
    filter: { title: '', status: STATUS.ALL },
    tasks: [] as TaskType[],
  } as StoreProviderType);

  const load = async () => {
    const response = await getAll();

    const tasks = TaskUtil.applyFilterOptions(response, store.filter);

    setStore(
      produce((draft) => {
        draft.tasks = tasks;
      })
    );
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

  async function add(data: TaskInput) {
    try {
      await save(data);

      await load();

      return { status: PROMISE_STATUS.SUCCESS };
    } catch (error) {
      return {
        status: PROMISE_STATUS.FAILURE,
        message: (error as ErrorTypeOverlap[])[0].message as string,
      };
    }
  }

  async function remove(id: number) {
    try {
      await deleteOne(id);

      await load();

      return { status: PROMISE_STATUS.SUCCESS };
    } catch (e) {
      return { status: PROMISE_STATUS.FAILURE, message: e };
    }
  }

  async function update(data: TaskType) {
    try {
      await updateOne(data);

      await load();

      return { status: PROMISE_STATUS.SUCCESS };
    } catch (e) {
      return { status: PROMISE_STATUS.FAILURE, message: e };
    }
  }

  useEffect(() => {
    getAll(store.pagination).then((response) => {
      setStore((previous) => ({
        ...previous,
        tasks: TaskUtil.applyFilterOptions(response, store.filter),
      }));
    });
  }, [store.filter, store.pagination]);

  const loadPreviousPage = async () => {
    setStore((previous) => {
      const { pagination } = previous;

      return {
        ...previous,
        pagination: {
          ...pagination,
          page: pagination.page - 1,
        },
      };
    });
  };

  const loadNextPage = async () => {
    setStore((previous) => {
      const { pagination } = previous;

      const increment = previous.tasks.length ? 1 : 0;

      return {
        ...previous,
        pagination: {
          ...pagination,
          page: pagination.page + increment,
        },
      };
    });
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

  const value = {
    ...store,
    actions: {
      add,
      load,
      remove,
      update,
      reload,
      onSelectFilterStatus,
      loadNextPage,
      loadPreviousPage,
    },
  } as unknown as StoreProviderType;

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
