import { Box, HStack, Text, useBoolean } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { DeleteSvgIcon } from '../../assets/svg/icons';
import { useAppContext } from '../../context/AppContext';

import CustomButton from '../../ui/CustomButton';
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
        <Box p={1}>Vous n&rsquo;avez aucune tâches en cours ...</Box>
      )}
      {tasks?.map(({ name, _id, status }, index) => (
        <HStack
          justify="space-between"
          p={3}
          border="1px solid"
          borderTop={index === 0 ? '2px solid' : undefined}
          borderBottom={index === tasks.length - 1 ? '2px solid' : undefined}
          borderColor={'blue.500'}
          key={_id}
          bg={status === 'DONE' ? 'blue.200' : undefined}
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
                  <CustomButton onClick={setIsEditing.off} size={'sm'}>
                    Cancel
                  </CustomButton>
                </Box>
              </HStack>
            ) : (
              <Text
                px={1}
                borderRadius="sm"
                _hover={{ bg: 'gray.100' }}
                cursor="pointer"
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

          <CustomButton
            onClick={() => updateTaskStatus(_id, name, status)}
            variant="outline"
            isDisabled={isEditing && _id === editTaskId}
          >
            {status === 'DONE' ? 'ReOpen' : 'Done'}
          </CustomButton>

          <Box cursor="pointer" onClick={() => deleteTask(_id)}>
            <DeleteSvgIcon fill="#122" />
          </Box>
        </HStack>
      ))}
    </>
  );
};

export default Tasks;
