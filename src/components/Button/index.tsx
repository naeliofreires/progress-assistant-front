import React from 'react';

import * as S from './styles';
import { Props } from './types';

export const Button = React.memo(
  ({ title = '', selected = false, ...rest }: Props) => {
    return (
      <S.Container type="button" selected={selected} {...rest}>
        <span>{title}</span>
      </S.Container>
    );
  },
  (previous, next) => {
    return previous.selected === next.selected;
  }
);
