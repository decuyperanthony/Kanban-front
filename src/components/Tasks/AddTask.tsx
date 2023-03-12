import { AddIcon, CalendarIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useAppContext } from '../../context/AppContext';

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
  const { addTask, newTask, onAddTaskInputChange } = useAppContext();

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
            onClick={addTask}
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
