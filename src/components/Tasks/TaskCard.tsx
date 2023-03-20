import type { Identifier } from 'dnd-core';

import { ChangeEvent, forwardRef, ForwardRefRenderFunction } from 'react';
import {
  CheckIcon,
  CloseIcon,
  DeleteIcon,
  StarIcon,
  UnlockIcon,
} from '@chakra-ui/icons';
import { Box, HStack, Text } from '@chakra-ui/react';

import { useAppContext } from '../../context/AppContext';
import { Task } from '../../Models/task';

import CustomIconButton from '../../ui/CustomIconButton';
import CustomInput from '../../ui/CustomInput';

type DraggableProps = {
  handlerId?: Identifier | null;
  isDragging?: boolean;
};

export type TaskCardProps = {
  task: Task;
  setIsEditing: {
    on: () => void;
    off: () => void;
  };
  isEditing: boolean;
  updatedTask: Omit<Task, '_id'>;
  setUpdatedTask: React.Dispatch<React.SetStateAction<Omit<Task, '_id'>>>;
  editTaskId: string;
  setEditTaskId: React.Dispatch<React.SetStateAction<string>>;
  onResetUpdatedTaskState: () => void;
  onUpdateTaskInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
} & DraggableProps;

const TaskCard: ForwardRefRenderFunction<HTMLDivElement, TaskCardProps> = (
  { handlerId, isDragging, ...taskProps },
  ref
) => {
  const { updateTask, deleteTask } = useAppContext();

  const {
    task,
    setIsEditing,
    isEditing,
    updatedTask,
    setUpdatedTask,
    editTaskId,
    setEditTaskId,
    onResetUpdatedTaskState,
    onUpdateTaskInputChange,
  } = taskProps;

  return (
    <HStack
      ref={ref}
      data-handler-id={handlerId}
      opacity={isDragging ? 0.2 : 1}
      justify="space-between"
      cursor={'grab'}
      p={3}
      border="1px solid"
      borderColor={'#E2E8F0'}
      bg={task.done ? '#E2E8F0' : undefined}
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
            textDecor={task.done ? 'line-through' : undefined}
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
        icon={task.done ? <UnlockIcon /> : <CheckIcon />}
        isDisabled={isEditing && task._id === editTaskId}
        onClick={() =>
          updateTask(
            {
              _id: task._id,
              done: !task.done,
            },
            onResetUpdatedTaskState
          )
        }
      />
      <CustomIconButton
        size="sm"
        icon={task.isPrioritized ? <StarIcon color={'orange'} /> : <StarIcon />}
        isDisabled={isEditing && task._id === editTaskId}
        onClick={() =>
          updateTask(
            {
              _id: task._id,
              isPrioritized: !task.isPrioritized,
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
  );
};
export default forwardRef(TaskCard);
