import { AddIcon, CalendarIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, HStack } from '@chakra-ui/react';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { initTaskState, useAppContext } from '../../context/AppContext';
import { Task } from '../../Models/task';

import CustomIconButton from '../../ui/CustomIconButton';
import CustomInput from '../../ui/CustomInput';

type Props = {
  setIsAddingTask: {
    on: () => void;
    off: () => void;
  };
  isAddingTask: boolean;
};

const Addtask: FC<Props> = ({ isAddingTask, setIsAddingTask }) => {
  const { addTask } = useAppContext();

  const [newTask, setNewTask] = useState<Omit<Task, '_id'>>(initTaskState);

  const onAddTaskInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewTask({ ...newTask, name: e.target.value });
    },
    []
  );

  const onResetAddTaskState = () => setNewTask(initTaskState);

  return (
    <>
      {isAddingTask ? (
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
      ) : (
        <HStack cursor="pointer" onClick={setIsAddingTask.on}>
          <CalendarIcon />

          <CustomIconButton size="sm" icon={<AddIcon />} />
        </HStack>
      )}
    </>
  );
};

export default Addtask;
