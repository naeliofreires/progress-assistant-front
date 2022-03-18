import React from 'react';

import * as S from './styles';
import { useStore } from '/src/store/StoreProvider';

export const Header = () => {
  const store = useStore();

  return (
    <S.Container>
      <h1> ToDo </h1>
      <button onClick={() => store.actions.reload()}>
        <svg
          enableBackground="new 0 0 50 50"
          height="50px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 50 50"
          width="50px"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect fill="none" height="50" width="50" />
          <polyline
            fill="none"
            points="40,7 40,16   31,15.999 "
            stroke="#000000"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
          <path
            d="M41.999,25  c0,9.39-7.61,17-17,17s-17-7.61-17-17s7.61-17,17-17c5.011,0,9.516,2.167,12.627,5.616c0.618,0.686,1.182,1.423,1.683,2.203"
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          />
        </svg>
      </button>
    </S.Container>
  );
};
