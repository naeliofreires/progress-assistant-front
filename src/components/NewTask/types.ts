import { PROMISE_STATUS } from '/src/store/types';

export type Props = {
  onSubmitCallback?(status?: PROMISE_STATUS): void;
  onCancelCallback?(status?: PROMISE_STATUS): void;
};
