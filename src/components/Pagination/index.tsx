import { Button } from '/src/components/Button';
import { useStore } from '/src/store/StoreProvider';

import * as S from './styles';

export const Pagination = () => {
  const store = useStore();
  const pagination = store.pagination;

  const loadPreviousPage = async () => {
    await store.actions.loadPreviousPage();
  };

  const loadNextPage = async () => {
    await store.actions.loadNextPage();
  };

  return (
    <S.Container>
      <div className="previous-page-button-view">
        {pagination.page > 1 && (
          <Button title="previous" onClick={loadPreviousPage} />
        )}
      </div>

      <div className="current-page-value-view">
        <span>{pagination.page}</span>
      </div>

      <div className="next-page-button-view">
        <Button title="next" onClick={loadNextPage} />
      </div>
    </S.Container>
  );
};
