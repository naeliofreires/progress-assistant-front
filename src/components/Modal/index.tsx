import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useStore } from '/src/store/StoreProvider';
import { TaskInput } from '/src/graphql/services/types';
import { NewTaskFormRef } from '/src/components/AddTaskForm/types';

import * as S from './styles';

export const useNewTaskFormModal = () => useRef<NewTaskFormRef>(null);

export const NewTaskForm = React.forwardRef<NewTaskFormRef>((props, ref) => {
  const store = useStore();

  const [open, setOpen] = useState(false);
  const [task, setTask] = useState({} as TaskInput);

  /**
   * @Controllers
   */
  const _open = useRef(() => setOpen(true)).current;
  const _close = useRef(() => setOpen(false)).current;
  useImperativeHandle(ref, () => ({ open: _open, close: _close }));

  const setField = useRef((field: string, value: string | boolean) => {
    setTask((previousState: TaskInput) => ({
      ...previousState,
      [field]: value,
    }));
  });

  const onChange = useCallback((event) => {
    setField?.current(event.target.name, event.target.value);
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await store.actions.add(task);
      setTask({} as TaskInput);

      _close();
    },
    [_close, store.actions, task]
  );

  return (
    <React.Fragment>
      {open && (
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
                <button type="button" name="cancel" onClick={_close}>
                  <span>cancel</span>
                </button>
              </div>
            </form>
          </div>
        </S.Container>
      )}
    </React.Fragment>
  );
});
