export type TaskStatus = 'OPEN' | 'DONE';

export type Task = {
  name: string;
  _id: string;
  status: TaskStatus;
  done: boolean;
  isPrioritized: boolean;
};
