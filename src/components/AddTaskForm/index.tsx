import React, { useCallback, useRef, useState } from 'react';
import Lottie from 'react-lottie';
import { useStore } from '/src/store/StoreProvider';
import { TaskInput } from '/src/graphql/services/types';
import loadingAnimationData from '/src/assets/animation/loading-dots.json';
import successAnimationData from '/src/assets/animation/success.json';

import * as S from './styles';
import { Props } from './types';
import { AnimationUtil } from '/src/utils/animationUtil';
import { PROMISE_STATUS } from '/src/store/types';
import { ToastUtil } from '/src/utils/toastUtil';

const loadOptions =
  AnimationUtil.getDefaultAnimationOptions(loadingAnimationData);
const successOptions =
  AnimationUtil.getDefaultAnimationOptions(successAnimationData);

export const NewTaskForm = ({ onSubmitCallback, onCancelCallback }: Props) => {
  const store = useStore();
  const [task, setTask] = useState({} as TaskInput);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
      setLoading(true);

      const response = await store.actions.add(task);

      if (response.status === PROMISE_STATUS.SUCCESS) {
        setLoading(false);
        setSuccess(true);

        setTimeout(() => {
          onSubmitCallback?.();
        }, 2000);
      }

      if (response.status === PROMISE_STATUS.FAILURE) {
        ToastUtil.error(response.message);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    },
    [onSubmitCallback, store.actions, task]
  );

  return (
    <S.Container>
      <div className="inner-container">
        <h2>Add New Task</h2>

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

      <div className="lottie-loading">
        {loading && <Lottie height={80} width={100} options={loadOptions} />}
        {success && <Lottie height={50} width={100} options={successOptions} />}
      </div>
    </S.Container>
  );
};
