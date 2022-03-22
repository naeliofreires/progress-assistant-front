import React from 'react';
import logo from '/public/logo.svg';

import * as S from './styles';

export const Header = () => {
  return (
    <S.Container>
      <div>
        <S.NextImage src={logo} width={100} height={100} />
        <h1> Progress Escort </h1>
      </div>
    </S.Container>
  );
};
