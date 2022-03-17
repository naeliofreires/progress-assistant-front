import { memo } from 'react';
import { useStore } from '/src/store/StoreProvider';

import * as S from './styles';

export const Pagination = memo(() => {
  const store = useStore();

  const loadPreviousPage = async () => {
    await store.actions.loadPreviousPage();
  };

  const loadNextPage = async () => {
    await store.actions.loadNextPage();
  };

  return (
    <S.Container>
      <div className="previous-page-button-view">
        {store.pagination.page > 1 && (
          <button onClick={loadPreviousPage}>
            <span>previous</span>
          </button>
        )}
      </div>

      <div className="current-page-value-view">
        <span>{store.pagination.page}</span>
      </div>

      <div className="next-page-button-view">
        <button onClick={loadNextPage}>
          <span>next</span>
        </button>
      </div>
    </S.Container>
  );
});
