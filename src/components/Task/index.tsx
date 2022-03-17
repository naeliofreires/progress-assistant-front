import { memo } from 'react';
import * as S from './styles';
import { format, parseISO } from 'date-fns';

import { Props } from './types';

export const Task = memo(({ attributes, onDelete, onToggleStatus }: Props) => {
  return (
    <S.Container>
      <S.InnerContainerLeft>
        <S.CompletedView
          onClick={onToggleStatus}
          completed={attributes.completed}
        />
        <span>{attributes.title.slice(0, 10)}</span>
      </S.InnerContainerLeft>

      <S.InnerContainerRight>
        <span>{format(parseISO(attributes.date), 'PPP')}</span>
        <S.ActionsView>
          <button type="button" onClick={onDelete}>
            delete
          </button>
        </S.ActionsView>
      </S.InnerContainerRight>
    </S.Container>
  );
});
