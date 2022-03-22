export enum STATUS {
  ALL = 'all',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export type Props = {
  onSearch(value: string): Promise<void>;
  onSelect(value: STATUS): Promise<void>;
};
