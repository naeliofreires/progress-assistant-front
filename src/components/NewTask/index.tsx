import Lottie from 'react-lottie';
import React, { useCallback, useRef, useState } from 'react';

import { ToastUtil } from '../../utils/toastUtil';
import { PROMISE_STATUS } from '../../store/types';
import { useStore } from '../../store/StoreProvider';
import { TaskInput } from '../..//graphql/services/types';
import { AnimationUtil } from '../..//utils/animationUtil';

import successAnimationData from '../../assets/animation/success.json';
import loadingAnimationData from '../../assets/animation/loading-dots.json';

import * as S from './styles';
import { Props } from './types';

const loadOptions =
  AnimationUtil.getDefaultAnimationOptions(loadingAnimationData);
const successOptions =
  AnimationUtil.getDefaultAnimationOptions(successAnimationData);

export const NewTask = ({ onSubmitCallback, onCancelCallback }: Props) => {
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

      const response = await store.actions.add(task);

      if (response.status === PROMISE_STATUS.SUCCESS) {
        setLoading(false);
        setSuccess(true);

        setTimeout(() => onSubmitCallback?.(response.status), 2000);
      }

      if (response.status === PROMISE_STATUS.FAILURE) {
        ToastUtil.error(response.message);
        setTimeout(() => setLoading(false), 2000);
      }
    },
    [onSubmitCallback, store.actions, task]
  );

  return (
    <S.Container>
      <div className="inner-container">
        <h2>Add New Task</h2>

        <form name="new-task" onSubmit={onSubmit}>
          <input
            value={task.title}
            type="text"
            required={true}
            name="title"
            placeholder="Title"
            onChange={onChange}
          />

          <input
            required={true}
            type="text"
            minLength={10}
            value={task.description}
            name="description"
            placeholder="Description"
            onChange={onChange}
          />
          <input
            required
            type="date"
            name="date"
            value={task.date}
            placeholder="Date"
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
