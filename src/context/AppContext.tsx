import { FC, ChangeEvent, useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

import React, { createContext, useContext, useMemo } from 'react';
import fetcher, { instance } from '../service/config';
import { LIST_URL, TASK_URL } from '../service/endPoint';
import { List } from '../Models/list';
import { Task, TaskStatus } from '../Models/task';
import { useBoolean } from '@chakra-ui/react';

type ResTaskAPI = {
  ok: true;
  data: Task[];
};

const initTaskState = {
  name: '',
  status: 'OPEN' as TaskStatus,
};
const initListState = {
  title: '',
};

type ResListAPI = {
  ok: true;
  data: List[];
};

type Context = {
  lists: List[];
  isLoading: boolean;
  tasks: Task[];
  updatedTask: Omit<Task, '_id'>;
  addTask: () => Promise<void>;
  addList: () => Promise<void>;
  newTask: Omit<Task, '_id'>;
  newList: Omit<List, '_id'>;
  onAddTaskInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddListInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateTask: (id: string) => void;
  setSelectedListId: React.Dispatch<React.SetStateAction<string | undefined>>;
  setUpdatedTask: React.Dispatch<React.SetStateAction<Omit<Task, '_id'>>>;
  onUpdateTaskInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteTask: (taskId: string) => Promise<void>;
  updateTaskStatus: (
    taskId: string,
    name: string,
    status: TaskStatus
  ) => Promise<void>;
};

const AppContext = createContext<Context>({} as Context);

export const useAppContext = (): Context => useContext(AppContext);

type Props = {
  children: React.ReactNode;
};

// todo les loaders
// todo les errors

const AppContextWrapper: FC<Props> = ({ children }) => {
  const [lists, setLists] = useState<List[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedListId, setSelectedListId] = useState<string>();

  const [isFecthing, setIsFetching] = useBoolean();

  const [updatedTask, setUpdatedTask] =
    useState<Omit<Task, '_id'>>(initTaskState);
  const [newTask, setNewTask] = useState<Omit<Task, '_id'>>(initTaskState);
  const [newList, setNewList] = useState<Omit<List, '_id'>>(initListState);

  const { data: resLists, isLoading: isFetchindList } = useSWR<ResListAPI>(
    LIST_URL,
    fetcher
  );

  const { data: resTask, isLoading: isFetchindTask } = useSWR<ResTaskAPI>(
    selectedListId ? LIST_URL + selectedListId + TASK_URL : null,
    fetcher
  );

  const onUpdateTaskInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUpdatedTask({ ...updatedTask, name: e.target.value });
    },
    []
  );

  const onAddListInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewList({ ...updatedTask, title: e.target.value });
    },
    []
  );

  const onAddTaskInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewTask({ ...newTask, name: e.target.value });
    },
    []
  );

  const onResetUpdatedTaskState = () => setUpdatedTask(initTaskState);
  const onResetAddTaskState = () => setNewTask(initTaskState);
  const onResetAddListState = () => setNewList(initListState);

  const addList = useCallback(async () => {
    if (newList.title === '') return;
    setIsFetching.on();
    try {
      const res = await instance().post(LIST_URL, newList);
      if (res.data?.ok) {
        const updatedLists = [...lists];
        updatedLists.push(res.data.data);
        setLists(updatedLists);
        onResetAddListState();
      }
    } catch (error) {
      // todo trait error
      console.log('error :>> ', error);
    } finally {
      setIsFetching.off();
    }
  }, [newList]);

  const addTask = useCallback(async () => {
    if (newTask.name === '') return;
    setIsFetching.on();
    try {
      const res = await instance().post(
        TASK_URL + LIST_URL + selectedListId,
        newTask
      );
      if (res.data?.ok) {
        const updatedTasks = [...tasks];
        updatedTasks.push(res.data.data);
        setTasks(updatedTasks);
        onResetAddTaskState();
      }
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
        const res = await instance().delete(TASK_URL + taskId);

        if (res.status === 204)
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
        const res = await instance().put(TASK_URL + taskId, updatedTask);

        if (res.data?.ok)
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
      await instance().put(TASK_URL + taskId, {
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

  const isLoading = isFetchindList || isFecthing || isFetchindTask;
  console.log({ isLoading, isFecthing });
  useEffect(() => {
    if (resLists?.data) {
      setSelectedListId(resLists.data[0]._id);
      setLists(resLists.data);
    }
  }, [resLists?.data]);
  useEffect(() => {
    if (resTask?.data) setTasks(resTask.data);
  }, [resTask?.data]);

  const contextValue = useMemo(
    () => ({
      isLoading,
      lists,
      tasks,
      newList,
      newTask,
      updatedTask,
      addTask,
      addList,
      deleteTask,
      updateTask,
      updateTaskStatus,
      onAddListInputChange,
      onAddTaskInputChange,
      onUpdateTaskInputChange,
      setUpdatedTask,
      setSelectedListId,
    }),
    [
      isLoading,
      lists,
      tasks,
      newList,
      newTask,
      updatedTask,
      isLoading,
      addTask,
      addList,
      deleteTask,
      updateTask,
      updateTaskStatus,
      onAddListInputChange,
      onAddTaskInputChange,
      onUpdateTaskInputChange,
      setUpdatedTask,
      setSelectedListId,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContextWrapper;
