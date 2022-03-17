import { RequestDocument, gql, request } from 'graphql-request';

import { TaskType } from '/src/components/Task/types';
import { CONFIG } from '/src/config';
import { ErrorType, TaskInput } from './types';

const { URL } = CONFIG;

export async function getAll(
  pagination = { page: 1, pageSize: 5 }
): Promise<TaskType[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        tasks: { data },
      } = await request(
        URL,
        gql`
          query ($pagination: PaginationArg) {
            tasks(pagination: $pagination) {
              data {
                id
                attributes {
                  title
                  description
                  date
                  completed
                }
              }
            }
          }
        `,
        { pagination }
      );

      resolve(data);
    } catch (e) {
      reject((e as ErrorType).response?.errors ?? 'an error occurred ');
    }
  });
}

export async function save(task: TaskInput): Promise<TaskType | unknown> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await request(
        URL,
        gql`
          mutation ($data: TaskInput!) {
            createTask(data: $data) {
              data {
                id
                attributes {
                  title
                  description
                  date
                  completed
                }
              }
            }
          }
        `,
        { data: task } as unknown as RequestDocument
      );

      const data = response?.createTask?.data;
      resolve(data);
    } catch (e: unknown) {
      reject((e as ErrorType).response?.errors ?? 'an error occurred ');
    }
  });
}

export async function deleteOne(id: number): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await request(
        URL,
        gql`
          mutation ($id: ID!) {
            deleteTask(id: $id) {
              data {
                id
                attributes {
                  title
                  description
                }
              }
            }
          }
        `,
        { id } as unknown as RequestDocument
      );

      const data = response?.deleteTask?.data;
      resolve(data);
    } catch (e) {
      const [error] = (e as ErrorType).response?.errors ?? [];

      reject(error.message ?? 'an error ocurred ');
    }
  });
}

export async function updateOne(task: TaskType): Promise<TaskType | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await request(
        URL,
        gql`
          mutation ($id: ID!, $data: TaskInput!) {
            updateTask(id: $id, data: $data) {
              data {
                id
                attributes {
                  title
                  description
                  completed
                  date
                }
              }
            }
          }
        `,
        {
          id: task.id,
          data: task.attributes,
        } as unknown as RequestDocument
      );

      const { data } = response?.updateTask;
      resolve(data as TaskType);
    } catch (e) {
      const [error] = (e as ErrorType).response?.errors ?? [];

      reject(error.message ?? 'an error ocurred ');
    }
  });
}
