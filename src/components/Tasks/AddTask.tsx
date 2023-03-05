import { AddIcon, CalendarIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
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
        <>
          <CalendarIcon />
          <p>Nouvelle tache</p>
          <CustomIconButton
            size="sm"
            onClick={setIsAddingTask.on}
            icon={<AddIcon />}
          />
        </>
      )}
    </>
  );
};

export default Addtask;
