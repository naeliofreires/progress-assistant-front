import { memo } from 'react';
import { useStore } from '/src/store/StoreProvider';

import * as S from './styles';
import { Button } from '/src/components/Button';

export const Pagination = memo(() => {
  const { pagination, actions } = useStore();

  const loadPreviousPage = async () => {
    await actions.loadPreviousPage();
  };

  const loadNextPage = async () => {
    await actions.loadNextPage();
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
});
