import React from 'react';
import search from '/public/search.svg';
import task from '/public/task.svg';

import * as S from './styles';

export const SearchBar = () => {
  return (
    <S.Container id="search-bar-container">
      <div className="actions-view">
        <button>
          <span>all</span>
        </button>

        <button>
          <span>in progress</span>
        </button>

        <button>
          <span>done</span>
        </button>
      </div>

      <div className="search-view">
        <div className="search-input-view">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Name, Date"
          />
          <button className="transparent">
            <S.Image src={search} width={25} height={25} />
          </button>
        </div>

        <div className="amount-task-view">
          <span>10</span>
          <S.Image src={task} width={25} height={25} />
        </div>
      </div>
    </S.Container>
  );
};
