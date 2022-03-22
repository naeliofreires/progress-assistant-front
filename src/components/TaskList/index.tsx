import Lottie from 'react-lottie';
import { Task } from '/src/components/Task';
import { useStore } from '/src/store/StoreProvider';
import { TaskType } from '/src/components/Task/types';
import { Pagination } from '/src/components/Pagination';
import emptyAnimation from '/src/assets/animation/empty.json';
import { AnimationUtil } from '/src/utils/animationUtil';

import * as S from './styles';

const emptyOptions = AnimationUtil.getDefaultAnimationOptions(emptyAnimation);

export const TaskList = () => {
  const store = useStore();

  const onDeleteTask = async (id: number) => {
    await store.actions.remove(id);
  };

  const onToggleStatus = async (task: TaskType) => {
    const id = task.id;
    const completed = !task.attributes.completed;

    await store.actions.update({
      id,
      attributes: { ...task.attributes, completed },
    });
  };

  return (
    <>
      <S.ListView>
        {store.tasks.length ? (
          store.tasks?.map((task) => (
            <Task
              key={task.id}
              attributes={{ ...task.attributes }}
              onToggleStatus={() => onToggleStatus(task)}
              onDelete={() => onDeleteTask(task.id ?? 0)}
            />
          ))
        ) : (
          <Lottie
            options={emptyOptions}
            width={350}
            height={350}
            isPaused={false}
          />
        )}
      </S.ListView>

      <Pagination />
    </>
  );
};
