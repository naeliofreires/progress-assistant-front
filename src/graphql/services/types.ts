export type TaskInput = {
  title: string;
  description: string;
  completed: boolean;
  date: string;
};

export type PaginationArg = {
  page: number;
  pageSize: number;
  start: number;
  limit: number;
};

export type Sort = string[];

export type ErrorType = {
  response: {
    errors: [
      {
        message: string;
      }
    ];
  };
};
