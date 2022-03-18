import React from 'react';
import logo from '/public/logo.svg';
import task from '/public/task.svg';

import * as S from './styles';
import { useStore } from '/src/store/StoreProvider';

export const Header = () => {
  const amount = useStore().tasks.length;

  return (
    <S.Container>
      <div>
        <S.NextImage src={logo} width={100} height={100} />
        <h1> Progress Escort </h1>
      </div>
      <div className="amount-task-view">
        <span>{amount}</span>
        <S.NextImage src={task} width={25} height={25} />
      </div>
    </S.Container>
  );
};
