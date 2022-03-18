import React, { ChangeEvent, useMemo, useRef, useState } from 'react';
import search from '/public/search.svg';
import task from '/public/task.svg';

import * as S from './styles';
import { Props, STATUS } from './types';
import { useStore } from '/src/store/StoreProvider';

export const SearchBar = ({ onSearch, onSelect }: Props) => {
  const { filter, tasks } = useStore();
  const { status, title } = filter;
  const [searchTitle, setSearchTitle] = useState(title || '');
  const amount = useMemo(() => tasks.length, [tasks]);

  const onChangeText = useRef((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
  }).current;

  return (
    <S.Container id="search-bar-container">
      <div className="actions-view">
        <button
          onClick={() => onSelect(STATUS.ALL)}
          className={STATUS.ALL === status ? 'selected' : 'unselected'}
        >
          <span>all</span>
        </button>

        <button
          onClick={() => onSelect(STATUS.IN_PROGRESS)}
          className={STATUS.IN_PROGRESS === status ? 'selected' : 'unselected'}
        >
          <span>in progress</span>
        </button>

        <button
          onClick={() => onSelect(STATUS.DONE)}
          className={STATUS.DONE === status ? 'selected' : 'unselected'}
        >
          <span>done</span>
        </button>
      </div>

      <div className="search-view">
        <div className="search-input-view">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="title..."
            value={searchTitle}
            onChange={onChangeText}
          />
          <button onClick={() => onSearch(searchTitle)} className="transparent">
            <S.Image src={search} width={25} height={25} />
          </button>
        </div>

        <div className="amount-task-view">
          <span>{amount}</span>
          <S.Image src={task} width={25} height={25} />
        </div>
      </div>
    </S.Container>
  );
};
