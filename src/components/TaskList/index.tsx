import { useStore } from '/src/store/StoreProvider';
import { Task } from '/src/components/Task';
import { TaskType } from '/src/components/Task/types';
import { Pagination } from '/src/components/Pagination';

import * as S from './styles';

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
        {store.tasks?.map((task) => (
          <Task
            key={task.id}
            attributes={{ ...task.attributes }}
            onToggleStatus={() => onToggleStatus(task)}
            onDelete={() => onDeleteTask(task.id ?? 0)}
          />
        ))}
      </S.ListView>

      <Pagination />
    </>
  );
};
