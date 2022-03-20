import React from 'react';
import add from '/public/add-task.svg';

import * as S from './styles';

export const PlusButton = React.memo(
  ({ amount, onClick }: { amount: number; onClick(): void }) => {
    return (
      <S.Container>
        <div className="amount-task-view">
          <span>{amount}</span>
        </div>
        <div className="plus-button-view">
          <button onClick={onClick}>
            <S.Image src={add} width={25} height={25} />
          </button>
        </div>
      </S.Container>
    );
  }
);
