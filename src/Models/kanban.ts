export type KanbanStatus = 'OPEN' | 'DONE';
export type Kanban = {
  name: string;
  _id: string;
  status: KanbanStatus;
};
