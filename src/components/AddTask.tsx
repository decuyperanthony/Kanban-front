import { Box, useBoolean } from '@chakra-ui/react';
import { FC } from 'react';
import { AddCircleSvgIcon, ArrowLeftSvgIcon } from '../assets/svg/icons';
import { useAppContext } from '../context/AppContext';

import CustomButton from '../ui/CustomButton';
import CustomInput from '../ui/CustomInput';

const Addtask: FC = () => {
  const { addTask, newTask, onAddTaskInputChange } = useAppContext();
  const [isAdding, setIsAdding] = useBoolean();

  return (
    <>
      {isAdding ? (
        <>
          <Box cursor="pointer" onClick={setIsAdding.off}>
            <ArrowLeftSvgIcon fill="#122" />
          </Box>
          <CustomInput
            value={newTask.name}
            onChange={(e) => onAddTaskInputChange(e)}
          />
          <CustomButton onClick={addTask}>OK</CustomButton>
        </>
      ) : (
        <>
          <p>Add task</p>
          <Box px={4} cursor="pointer" onClick={setIsAdding.on}>
            <AddCircleSvgIcon fill="#122" />
          </Box>
        </>
      )}
    </>
  );
};

export default Addtask;
