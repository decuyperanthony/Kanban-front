import { CheckIcon, CloseIcon, DeleteIcon, UnlockIcon } from '@chakra-ui/icons';
import { Box, HStack, Text, useBoolean } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { DeleteSvgIcon } from '../../assets/svg/icons';
import { useAppContext } from '../../context/AppContext';

import CustomButton from '../../ui/CustomButton';
import CustomIconButton from '../../ui/CustomIconButton';
import CustomInput from '../../ui/CustomInput';

const Tasks: FC = () => {
  const {
    tasks,
    updatedTask,
    updateTask,
    updateTaskStatus,
    setUpdatedTask,
    onUpdateTaskInputChange,
    deleteTask,
  } = useAppContext();

  const [isEditing, setIsEditing] = useBoolean();
  const [editTaskId, setEditTaskId] = useState('');

  return (
    <>
      {!tasks.length && (
        <Box p={1}>aucune tâches en cours pour cette liste ...</Box>
      )}
      {tasks?.map(({ name, _id, status }) => (
        <HStack
          justify="space-between"
          p={3}
          border="1px solid"
          borderColor={'#E2E8F0'}
          key={_id}
          bg={status === 'DONE' ? '#E2E8F0' : undefined}
        >
          <HStack w={'100%'} align="center" minH={'40px'}>
            {isEditing && editTaskId === _id ? (
              <HStack w={'100%'} spacing={4}>
                <Box flex={6}>
                  <CustomInput
                    onBlur={() => {
                      updateTask(_id);
                      setIsEditing.off();
                    }}
                    onChange={(e) => onUpdateTaskInputChange(e)}
                    value={updatedTask.name}
                    size="sm"
                  />
                </Box>
                <Box flex={1}>
                  <CustomIconButton
                    size="sm"
                    onClick={setIsEditing.off}
                    icon={<CloseIcon />}
                  />
                </Box>
              </HStack>
            ) : (
              <Text
                px={1}
                borderRadius="sm"
                _hover={{ bg: 'gray.100' }}
                cursor="pointer"
                textDecor={status === 'DONE' ? 'line-through' : undefined}
                onClick={() => {
                  setIsEditing.on();
                  setUpdatedTask({ name, status });
                  setEditTaskId(_id);
                }}
              >
                {name}
              </Text>
            )}
          </HStack>
          <CustomIconButton
            size="sm"
            icon={status === 'OPEN' ? <CheckIcon /> : <UnlockIcon />}
            isDisabled={isEditing && _id === editTaskId}
            onClick={() => updateTaskStatus(_id, name, status)}
          />
          <CustomIconButton
            size="sm"
            icon={<DeleteIcon />}
            onClick={() => deleteTask(_id)}
          />
        </HStack>
      ))}
    </>
  );
};

export default Tasks;
