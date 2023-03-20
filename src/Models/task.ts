export type TaskStatus = 'NONE';

export type Task = {
  name: string;
  _id: string;
  status: TaskStatus;
  done: boolean;
  isPrioritized: boolean;
  orderIndex: number;
};
