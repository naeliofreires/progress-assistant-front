import React, { useCallback, useRef, useState } from 'react';
import { TaskInput } from '/src/graphql/services/types';
import { useStore } from '/src/store/StoreProvider';

import * as S from './styles';

const INITIAL_STATE = {
  title: '',
  description: '',
  completed: false,
  date: '',
} as TaskInput;

export const NewTaskForm = () => {
  const store = useStore();
  const [task, setTask] = useState(INITIAL_STATE);

  const setField = useRef((field: string, value: string | boolean) => {
    setTask((state: TaskInput) => ({ ...state, [field]: value }));
  });

  const onChange = useCallback((event) => {
    if (event.target.type === 'checkbox') {
      setField?.current(event.target.name, event.target.checked);
    } else {
      setField?.current(event.target.name, event.target.value);
    }
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await store.actions.add(task);
      setTask(INITIAL_STATE);
    },
    [store, task]
  );

  return (
    <S.Container>
      <form onSubmit={onSubmit}>
        <label>
          <span>Completed:</span>
          <input
            id="completed"
            name="completed"
            type="checkbox"
            alt="is it completed?"
            onChange={onChange}
            checked={task.completed}
          />
        </label>

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
          min={10}
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
          <button type="submit" name="add">
            <span>add</span>
          </button>
          <button
            type="button"
            name="cancel"
            onClick={() => setTask(INITIAL_STATE)}
          >
            <span>cancel</span>
          </button>
        </div>
      </form>
    </S.Container>
  );
};
