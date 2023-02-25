import { Box, useBoolean } from '@chakra-ui/react';
import { FC } from 'react';
import { AddCircleSvgIcon, ArrowLeftSvgIcon } from '../assets/svg/icons';
import { Task } from '../Models/task';
import CustomButton from '../ui/CustomButton';
import CustomInput from '../ui/CustomInput';
type Props = {
  addTask: () => Promise<void>;
  newTask: Omit<Task, '_id'>;
  onTaskInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Addtask: FC<Props> = ({ addTask, newTask, onTaskInputChange }) => {
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
            onChange={(e) => onTaskInputChange(e)}
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
