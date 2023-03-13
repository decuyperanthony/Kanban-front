import { ChangeEvent, FC, useCallback, useState } from 'react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

import { initTaskState, useAppContext } from '../../context/AppContext';
import { Task } from '../../Models/task';

import CustomIconButton from '../../ui/CustomIconButton';
import CustomInput from '../../ui/CustomInput';

type Props = {
  setIsAddingTask: {
    on: () => void;
    off: () => void;
  };
};

const TaskForm: FC<Props> = ({ setIsAddingTask }) => {
  const { addTask } = useAppContext();

  const [newTask, setNewTask] = useState<Omit<Task, '_id'>>(initTaskState);

  const onAddTaskInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewTask({ ...newTask, name: e.target.value });
    },
    [newTask]
  );

  const onResetAddTaskState = () => setNewTask(initTaskState);

  return (
    <>
      <CustomInput
        placeholder="nom de la nouvelle tache"
        value={newTask.name}
        onChange={(e) => onAddTaskInputChange(e)}
        size="sm"
      />
      <CustomIconButton
        size={'sm'}
        onClick={setIsAddingTask.off}
        icon={<CloseIcon />}
      />
      <CustomIconButton
        onClick={() => addTask(newTask, onResetAddTaskState)}
        size={'sm'}
        icon={<CheckIcon />}
      />
    </>
  );
};

export default TaskForm;
