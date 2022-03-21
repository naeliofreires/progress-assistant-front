import React, { useCallback, useRef, useState } from 'react';
import { useStore } from '/src/store/StoreProvider';
import { TaskInput } from '/src/graphql/services/types';

import * as S from './styles';
import { Props } from './types';

export const NewTaskForm = ({ onSubmitCallback, onCancelCallback }: Props) => {
  const store = useStore();

  const [task, setTask] = useState({} as TaskInput);

  const setField = useRef((field: string, value: string | boolean) => {
    setTask((previousState: TaskInput) => ({
      ...previousState,
      [field]: value,
    }));
  });

  const onChange = useCallback((event) => {
    setField?.current(event.target.name, event.target.value);
  }, []);

  const onCancel = useCallback(() => {
    setTask({} as TaskInput);

    onCancelCallback?.();
  }, [onCancelCallback]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await store.actions.add(task);
      setTask({} as TaskInput);

      onSubmitCallback?.();
    },
    [onSubmitCallback, store.actions, task]
  );

  return (
    <S.Container>
      <div className="inner-container">
        <form onSubmit={onSubmit}>
          <input
            value={task.title}
            required
            type="text"
            name="title"
            placeholder="title"
            onChange={onChange}
          />
          <input
            required
            type="text"
            value={task.description}
            name="description"
            placeholder="description"
            onChange={onChange}
          />
          <input
            required
            type="date"
            name="date"
            value={task.date}
            placeholder="date"
            onChange={onChange}
          />
          <div className="form-actions">
            <button className="save" type="submit" name="add">
              <span>add</span>
            </button>
            <button type="button" name="cancel" onClick={onCancel}>
              <span>cancel</span>
            </button>
          </div>
        </form>
      </div>
    </S.Container>
  );
};
