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
import { NewTaskForm } from '/src/components/AddTaskForm';
import { Modal, useModalRef } from '/src/components/Modal';

import * as S from './styles';
import { Props, STATUS } from './types';

export const SearchBar = ({ onSearch, onSelect }: Props) => {
  const ref = useModalRef();
  const { filter, tasks } = useStore();
  const amount = useMemo(() => tasks.length, [tasks]);
  const [searchTitle, setSearchTitle] = useState(filter.title || '');

  const onChangeText = useRef((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTitle(value);
    onSearch(value).then(null);
  }).current;

  const openModal = useCallback(() => {
    ref.current?.open();
  }, [ref]);

  const closeModal = useCallback(() => {
    ref.current?.close();
  }, [ref]);

  const setFocus = useRef(() => {
    document.getElementById('search')?.focus();
  }).current;

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
            <S.Image onClick={setFocus} src={search} width={20} height={20} />
            <input
              className="transparent"
              type="text"
              name="search"
              id="search"
              placeholder="title..."
              value={searchTitle}
              onChange={onChangeText}
            />
          </div>

          <PlusButton amount={amount} onClick={openModal} />
        </div>
      </S.Container>

      <Modal ref={ref}>
        <NewTaskForm
          onSubmitCallback={closeModal}
          onCancelCallback={closeModal}
        />
      </Modal>
    </>
  );
};
