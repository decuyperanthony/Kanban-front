import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import fetcher, { instance } from '../service/config';
import { Task, TaskStatus } from '../Models/task';
import { TASK_URL } from '../service/endPoint';
import { useBoolean } from '@chakra-ui/react';

type ResTaskAPI = {
  ok: true;
  data: Task[];
};

const initState = {
  name: '',
  status: 'OPEN' as TaskStatus,
};

const useTask = () => {
  const { data: res, isLoading: loading } = useSWR<ResTaskAPI>(
    TASK_URL,
    fetcher
  );

  const [tasks, setTasks] = useState<Task[]>([]);
  const [isFecthing, setIsFetching] = useBoolean();

  const [updatedTask, setUpdatedTask] = useState<Omit<Task, '_id'>>(initState);
  const [newTask, setNewTask] = useState<Omit<Task, '_id'>>(initState);

  const onUpdateTaskInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUpdatedTask({ ...updatedTask, name: e.target.value });
    },
    []
  );

  const onAddTaskInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewTask({ ...newTask, name: e.target.value });
    },
    []
  );

  const onResetUpdatedTaskState = () => setUpdatedTask(initState);
  const onResetAddTaskState = () => setNewTask(initState);

  const addTask = useCallback(async () => {
    if (newTask.name === '') return;
    setIsFetching.on();
    try {
      const res = await instance().post('/task', newTask);
      console.log('res :>> ', res);
      const updatedTasks = [...tasks];
      updatedTasks.push(res.data.data);
      setTasks(updatedTasks);
      onResetAddTaskState();
    } catch (error) {
      // todo trait error
      console.log('error :>> ', error);
    } finally {
      setIsFetching.off();
    }
  }, [newTask]);

  const deleteTask = useCallback(
    async (taskId: string) => {
      setIsFetching.on();
      try {
        await instance().delete('/task/' + taskId);

        setTasks(tasks?.filter(({ _id }) => _id !== taskId));
      } catch (error) {
        // todo trait error
        console.log('error :>> ', error);
      } finally {
        setIsFetching.off();
      }
    },
    [tasks]
  );

  const updateTask = useCallback(
    async (taskId: string) => {
      setIsFetching.on();
      try {
        await instance().put('/task/' + taskId, updatedTask);

        setTasks(
          tasks?.map((task) =>
            task._id === taskId
              ? { ...task, name: updatedTask.name }
              : { ...task }
          )
        );
        onResetUpdatedTaskState();
      } catch (error) {
        // todo trait error
        console.log('error :>> ', error);
      } finally {
        setIsFetching.off();
      }
    },
    [tasks, updatedTask]
  );
  // todo fix backend with no name
  // todo this
  const updateTaskStatus = async (
    taskId: string,
    name: string,
    status: TaskStatus
  ) => {
    setIsFetching.on();
    const updateStatus = status === 'DONE' ? 'OPEN' : 'DONE';
    try {
      await instance().put('/task/' + taskId, {
        name,
        status: updateStatus,
      });

      setTasks(
        tasks?.map((task) =>
          task._id === taskId
            ? {
                ...task,
                status: status === 'DONE' ? 'OPEN' : 'DONE',
                name: name,
              }
            : { ...task }
        )
      );
      onResetUpdatedTaskState();
    } catch (error) {
      // todo trait error
      console.log('error :>> ', error);
    } finally {
      setIsFetching.off();
    }
  };

  const isLoading = loading || isFecthing;

  useEffect(() => {
    if (res?.data) setTasks(res?.data);
  }, [res?.data]);

  return useMemo(() => {
    return {
      tasks,
      newTask,
      updatedTask,
      isLoading,
      addTask,
      deleteTask,
      updateTask,
      updateTaskStatus,
      onAddTaskInputChange,
      onUpdateTaskInputChange,
      setUpdatedTask,
    };
  }, [
    tasks,
    newTask,
    updatedTask,
    isLoading,
    addTask,
    deleteTask,
    updateTask,
    updateTaskStatus,
    onAddTaskInputChange,
    onUpdateTaskInputChange,
    setUpdatedTask,
  ]);
};

export default useTask;
