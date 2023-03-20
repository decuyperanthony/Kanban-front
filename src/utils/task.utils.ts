import { Task } from '../Models/task';

const sortItemsByOrderIndex = (items: Task[]) => {
  const copy = items.slice();
  return copy.sort((a, b) => a.orderIndex - b.orderIndex);
};

export default sortItemsByOrderIndex;
