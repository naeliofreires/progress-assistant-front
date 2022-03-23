import { TaskType } from '../../components/Task/types';
import { STATUS } from '../../components/SearchBar/types';

const applyFilterOptions = (
  tasks: TaskType[],
  filter: { title: string; status: STATUS }
) => {
  let response = tasks;
  switch (filter.status) {
    case STATUS.DONE:
      response = tasks.filter((task) => task.attributes.completed);
      break;
    case STATUS.IN_PROGRESS:
      response = tasks.filter((task) => !task.attributes.completed);
      break;
  }

  if (filter.title) {
    response = tasks.filter((item) =>
      item.attributes.title.includes(filter.title)
    );
  }

  return response;
};

export const TaskUtil = {
  applyFilterOptions,
};
