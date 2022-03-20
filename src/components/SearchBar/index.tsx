import React, {
  ChangeEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import search from '/public/search.svg';
import { Button } from '/src/components/Button';
import { useStore } from '/src/store/StoreProvider';
import { PlusButton } from '/src/components/PlusButton';
import { NewTaskForm, useNewTaskFormModal } from '/src/components/AddTaskForm';

import * as S from './styles';
import { Props, STATUS } from './types';

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
          <Button
            title="all"
            onClick={() => onSelect(STATUS.ALL)}
            selected={STATUS.ALL === filter.status}
          />

          <Button
            title="in progress"
            selected={STATUS.IN_PROGRESS === filter.status}
            onClick={() => onSelect(STATUS.IN_PROGRESS)}
          />

          <Button
            title="done"
            selected={STATUS.DONE === filter.status}
            onClick={() => onSelect(STATUS.DONE)}
          />
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
