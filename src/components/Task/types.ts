export type TaskType = {
  id?: number;
  attributes: {
    title: string;
    description: string;
    completed: boolean;
    date: string;
  };
};

export type Props = TaskType & {
  onDelete(): void;
  onToggleStatus(): void;
};

/**
 * @StylesType
 */
export type CompletedViewType = {
  completed: boolean;
};
