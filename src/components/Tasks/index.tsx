import { Box, useBoolean } from '@chakra-ui/react';
import { ChangeEvent, FC, useCallback, useState } from 'react';

import { initTaskState, useAppContext } from '../../context/AppContext';
import { Task } from '../../Models/task';

import TaskCard from './TaskCard';

const Tasks: FC = () => {
  const { tasks } = useAppContext();

  const [isEditing, setIsEditing] = useBoolean();
  const [editTaskId, setEditTaskId] = useState('');
  const [updatedTask, setUpdatedTask] =
    useState<Omit<Task, '_id'>>(initTaskState);

  const onResetUpdatedTaskState = () => setUpdatedTask(initTaskState);

  const onUpdateTaskInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUpdatedTask({ ...updatedTask, name: e.target.value });
    },
    [updatedTask]
  );

  const taskProps = {
    setIsEditing,
    isEditing,
    updatedTask,
    setUpdatedTask,
    editTaskId,
    setEditTaskId,
    onResetUpdatedTaskState,
    onUpdateTaskInputChange,
  };

  return (
    <>
      {!tasks.length && (
        <Box p={1}>aucune tâches en cours pour cette liste ...</Box>
      )}
      {tasks?.map((task) => (
        <TaskCard key={task._id} task={task} {...taskProps} />
      ))}
    </>
  );
};

export default Tasks;
