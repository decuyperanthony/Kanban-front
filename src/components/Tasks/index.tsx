import { CheckIcon, CloseIcon, DeleteIcon, UnlockIcon } from '@chakra-ui/icons';
import { Box, HStack, Text, useBoolean } from '@chakra-ui/react';
import { ChangeEvent, FC, useCallback, useState } from 'react';

import { initTaskState, useAppContext } from '../../context/AppContext';
import { Task } from '../../Models/task';

import CustomIconButton from '../../ui/CustomIconButton';
import CustomInput from '../../ui/CustomInput';

const Tasks: FC = () => {
  const { tasks, updateTask, deleteTask } = useAppContext();

  const [isEditing, setIsEditing] = useBoolean();
  const [editTaskId, setEditTaskId] = useState('');
  const [updatedTask, setUpdatedTask] =
    useState<Omit<Task, '_id'>>(initTaskState);

  const onResetUpdatedTaskState = () => setUpdatedTask(initTaskState);

  const onUpdateTaskInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUpdatedTask({ ...updatedTask, name: e.target.value });
    },
    [updatedTask]
  );

  return (
    <>
      {!tasks.length && (
        <Box p={1}>aucune tâches en cours pour cette liste ...</Box>
      )}
      {tasks?.map((task) => (
        <HStack
          justify="space-between"
          p={3}
          border="1px solid"
          borderColor={'#E2E8F0'}
          key={task._id}
          bg={task.status === 'DONE' ? '#E2E8F0' : undefined}
        >
          <HStack w={'100%'} align="center" minH={'40px'}>
            {isEditing && editTaskId === task._id ? (
              <HStack w={'100%'} spacing={4}>
                <Box flex={6}>
                  <CustomInput
                    onBlur={() => {
                      updateTask(updatedTask, onResetUpdatedTaskState);
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
                textDecor={task.status === 'DONE' ? 'line-through' : undefined}
                onClick={() => {
                  setIsEditing.on();
                  setUpdatedTask(task);
                  setEditTaskId(task._id);
                }}
              >
                {task.name}
              </Text>
            )}
          </HStack>
          <CustomIconButton
            size="sm"
            icon={task.status === 'OPEN' ? <CheckIcon /> : <UnlockIcon />}
            isDisabled={isEditing && task._id === editTaskId}
            onClick={() =>
              updateTask(
                {
                  _id: task._id,
                  status: task.status === 'OPEN' ? 'DONE' : 'OPEN',
                },
                onResetUpdatedTaskState
              )
            }
          />
          <CustomIconButton
            size="sm"
            icon={<DeleteIcon />}
            onClick={() => deleteTask(task._id)}
          />
        </HStack>
      ))}
    </>
  );
};

export default Tasks;
