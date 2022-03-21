import { memo } from 'react';
import { format, parseISO } from 'date-fns';
import task from '/public/task.svg';
import NextImage from 'next/image';

import { Props } from './types';
import * as S from './styles';

export const Task = memo(({ attributes, onDelete, onToggleStatus }: Props) => {
  return (
    <S.Container>
      <S.InnerContainerLeft>
        <S.IconView>
          <NextImage src={task} width={45} height={45} />
        </S.IconView>

        <span className="title">{attributes.title}</span>
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
