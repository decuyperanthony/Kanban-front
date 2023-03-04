import { AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useBoolean } from '@chakra-ui/react';
import { FC } from 'react';
import { useAppContext } from '../../context/AppContext';

import CustomIconButton from '../../ui/CustomIconButton';
import CustomInput from '../../ui/CustomInput';

const Addtask: FC = () => {
  const { addTask, newTask, onAddTaskInputChange } = useAppContext();
  const [isAdding, setIsAdding] = useBoolean();

  return (
    <>
      {isAdding ? (
        <>
          <CustomInput
            placeholder="Ajouter une tache"
            value={newTask.name}
            onChange={(e) => onAddTaskInputChange(e)}
            size="sm"
          />
          <CustomIconButton
            size={'sm'}
            onClick={setIsAdding.off}
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
          <p>Ajouter une tache</p>
          <CustomIconButton
            size="sm"
            onClick={setIsAdding.on}
            icon={<AddIcon />}
          />
        </>
      )}
    </>
  );
};

export default Addtask;
