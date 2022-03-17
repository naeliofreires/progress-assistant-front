const KEY = "@storage/tasks";

const getStorage = (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    try {
      resolve(localStorage.getItem(KEY));
    } catch (error) {
      reject(error);
    }
  });
};

const setStorage = (value: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!value) reject("null value");

    localStorage.setItem(KEY, value);

    resolve("success");
  });
};

export const StorageUtil = {
  getStorage,
  setStorage,
};
