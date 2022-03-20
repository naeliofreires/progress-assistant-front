import React, {
  ChangeEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useStore } from '/src/store/StoreProvider';
import { PlusButton } from '/src/components/PlusButton';
import { NewTaskForm, useNewTaskFormModal } from '/src/components/NewTaskForm';

import * as S from './styles';
import { Props, STATUS } from './types';
import search from '/public/search.svg';

export const SearchBar = ({ onSearch, onSelect }: Props) => {
  const ref = useNewTaskFormModal();

  const { filter, tasks } = useStore();
  const amount = useMemo(() => tasks.length, [tasks]);
  const [searchTitle, setSearchTitle] = useState(filter.title || '');

  const onChangeText = useRef((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
  }).current;

  const openModal = useCallback(() => {
    ref.current?.open();
  }, [ref]);

  return (
    <>
      <S.Container id="search-bar-container">
        <div className="actions-view">
          <button
            onClick={() => onSelect(STATUS.ALL)}
            className={STATUS.ALL === filter.status ? 'selected' : 'unselected'}
          >
            <span>all</span>
          </button>

          <button
            onClick={() => onSelect(STATUS.IN_PROGRESS)}
            className={
              STATUS.IN_PROGRESS === filter.status ? 'selected' : 'unselected'
            }
          >
            <span>in progress</span>
          </button>

          <button
            onClick={() => onSelect(STATUS.DONE)}
            className={
              STATUS.DONE === filter.status ? 'selected' : 'unselected'
            }
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
            <button
              className="transparent"
              onClick={() => onSearch(searchTitle)}
            >
              <S.Image src={search} width={25} height={25} />
            </button>
          </div>

          <PlusButton amount={amount} onClick={openModal} />
        </div>
      </S.Container>

      <NewTaskForm ref={ref} />
    </>
  );
};
