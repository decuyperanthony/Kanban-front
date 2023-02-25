import { Box, useBoolean } from '@chakra-ui/react';
import { FC } from 'react';
import { AddCircleSvgIcon, ArrowLeftSvgIcon } from '../assets/svg/icons';
import { Task } from '../hooks/useKanban';
import CustomButton from '../ui/CustomButton';
import CustomInput from '../ui/CustomInput';
type Props = {
  addKanban: () => Promise<void>;
  newKanban: Task;
  onKanbanInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Addtask: FC<Props> = ({ addKanban, newKanban, onKanbanInputChange }) => {
  const [isAdding, setIsAdding] = useBoolean();

  return (
    <>
      {isAdding ? (
        <>
          <Box cursor="pointer" onClick={setIsAdding.off}>
            <ArrowLeftSvgIcon fill="#122" />
          </Box>
          <CustomInput
            value={newKanban.name}
            onChange={(e) => onKanbanInputChange(e)}
          />
          <CustomButton onClick={addKanban}>OK</CustomButton>
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
