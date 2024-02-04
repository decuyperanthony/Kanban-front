import { FC, useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';

import React, { createContext, useContext, useMemo } from 'react';
import fetcher, { instance } from '../service/config';
import { LIST_URL, TASK_URL } from '../service/endPoint';
import { List } from '../Models/list';
import { Task, TaskStatus } from '../Models/task';
import { useBoolean } from '@chakra-ui/react';
import { useImmer } from 'use-immer';
import produce from 'immer';

// todo move this in folder api
type ResListAPI = {
  ok: true;
  data: List[];
};

type ResTaskAPI = {
  ok: true;
  data: Task[];
};

// todo move in utils
export const initTaskState = {
  name: '',
  status: 'NONE' as TaskStatus,
  done: false,
  isPrioritized: false,
  orderIndex: -1,
};

type Context = {
  lists: List[];
  tasks: Task[];
  selectedListId?: string;
  isLoading: boolean;
  getPrioritizedTasks: () => void;
  updateAllTasksFromList: (field: Partial<Task>) => void;
  addTask: (
    newTask: Partial<Task>,
    onResetAddTaskState: () => void
  ) => Promise<void>;
  updateTask: (
    task: Partial<Task>,
    onResetUpdatedTaskState: () => void
  ) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  addEditList: (
    listForm: Partial<List>,
    setIsAddingOrEditingListToFalse: () => void,
    onResetListFormState: () => void
  ) => Promise<void>;
  deleteList: (onClosePopoverDeletelist: () => void) => Promise<void>;
  setSelectedListId: React.Dispatch<React.SetStateAction<string | undefined>>;
  moveTask: (startIndex: number, endIndex: number) => void;
  updateTasksOrderIndexFromList: () => void;
};

const AppContext = createContext<Context>({} as Context);

export const useAppContext = (): Context => useContext(AppContext);

type Props = {
  children: React.ReactNode;
};

const AppContextWrapper: FC<Props> = ({ children }) => {
  const [lists, setLists] = useImmer<List[]>([]);
  const [tasks, setTasks] = useImmer<Task[]>([]);
  const [selectedListId, setSelectedListId] = useState<string>();
  const [isFecthing, setIsFetching] = useBoolean();

  const { data: resLists, isLoading: isFetchindList } = useSWR<ResListAPI>(
    LIST_URL,
    fetcher
  );

  const { data: resTask, isLoading: isFetchindTask } = useSWR<ResTaskAPI>(
    selectedListId ? LIST_URL + selectedListId + TASK_URL : null,
    fetcher
  );

  const getPrioritizedTasks = useCallback(async () => {
    const res = await instance().get(TASK_URL + '?isPrioritized=true');

    if (res.data.ok) {
      setTasks(res.data.data);
    }
  }, []);

  const addEditList = useCallback(
    async (
      listForm: Partial<List>,
      setIsAddingOrEditingListToFalse: () => void,
      onResetListFormState: () => void
    ) => {
      if (listForm.title === '') return;
      try {
        setIsFetching.on();
        if (listForm?._id) {
          // EDIT MODE
          const res = await instance().put(LIST_URL + selectedListId, listForm);
          if (res.data?.ok) {
            setLists(
              lists.map((list) =>
                list._id === selectedListId ? { ...res.data.data } : { ...list }
              )
            );
            onResetListFormState();
            setIsAddingOrEditingListToFalse();
          }
        } else {
          // CREATE MODE
          const res = await instance().post(LIST_URL, listForm);
          if (res.data?.ok) {
            setLists(
              produce((draft) => {
                draft.push(res.data.data);
              })
            );
            setSelectedListId(res.data.data._id);
            onResetListFormState();
            setIsAddingOrEditingListToFalse();
          }
        }
      } catch (error) {
        // todo trait error
        console.log('error :>> ', error);
      } finally {
        setIsFetching.off();
      }
    },
    [selectedListId, lists]
  );

  const updateAllTasksFromList = useCallback(
    async (field: Partial<Task>) => {
      setIsFetching.on();
      try {
        const res = await instance().put(
          LIST_URL + 'tasks/all/' + selectedListId,
          field
        );
        if (res.data?.ok) {
          setTasks(
            tasks.map((task) => ({
              ...task,
              done: false,
            }))
          );
        }
      } catch (error) {
        // todo trait error
        console.log('error :>> ', error);
      } finally {
        setIsFetching.off();
      }
    },
    [tasks]
  );

  const deleteList = useCallback(
    async (onClosePopoverDeletelist: () => void) => {
      setIsFetching.on();
      try {
        const res = await instance().delete(LIST_URL + selectedListId);

        if (res.status === 204) {
          const updatedLists = lists?.filter(
            ({ _id }) => _id !== selectedListId
          );
          setLists(lists?.filter(({ _id }) => _id !== selectedListId));

          setSelectedListId(updatedLists[0]._id);
          onClosePopoverDeletelist();
        }
      } catch (error) {
        // todo trait error
        console.log('error :>> ', error);
      } finally {
        setIsFetching.off();
      }
    },
    [lists, selectedListId]
  );

  const addTask = useCallback(
    async (newTask: Partial<Task>, onResetAddTaskState: () => void) => {
      if (newTask.name === '') return;
      setIsFetching.on();
      try {
        const res = await instance().post(
          TASK_URL + LIST_URL + selectedListId,
          { ...newTask, orderIndex: tasks.length + 1 }
        );
        if (res.data?.ok) {
          setTasks(
            produce((draft) => {
              draft.push(res.data.data);
            })
          );
          onResetAddTaskState();
        }
      } catch (error) {
        // todo trait error
        console.log('error :>> ', error);
      } finally {
        setIsFetching.off();
      }
    },
    [selectedListId, tasks]
  );

  const updateTask = useCallback(
    async (task: Partial<Task>, onResetUpdatedTaskState: () => void) => {
      setIsFetching.on();
      try {
        const res = await instance().put(TASK_URL + '/' + task._id, task);

        if (res.data.ok) {
          const updateTask = res.data.data;
          setTasks(
            tasks.map((proj) =>
              proj._id === updateTask._id
                ? { ...proj, ...updateTask }
                : { ...proj }
            )
          );
          if (!selectedListId) getPrioritizedTasks();
        }
        onResetUpdatedTaskState();
      } catch (error) {
        // todo trait error
        console.log('error :>> ', error);
      } finally {
        setIsFetching.off();
      }
    },
    [tasks]
  );

  const deleteTask = useCallback(
    async (taskId: string) => {
      setIsFetching.on();
      try {
        const res = await instance().delete(TASK_URL + '/' + taskId);

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

  const moveTask = useCallback(
    (startIndex: number, endIndex: number) => {
      const draftTasks = Array.from(tasks);
      const [removed] = draftTasks.splice(startIndex, 1);
      draftTasks.splice(endIndex, 0, removed);
      const newTasks = draftTasks.map((task, index) => ({
        ...task,
        orderIndex: index,
      }));

      setTasks(newTasks);
    },
    [tasks]
  );

  const updateTasksOrderIndexFromList = useCallback(async () => {
    setIsFetching.on();
    try {
      // todo trait success ??
      await instance().put(LIST_URL + 'tasks/orderIndex', tasks);
    } catch (error) {
      // todo trait error
      console.log('error :>> ', error);
    } finally {
      setIsFetching.off();
    }
  }, [tasks]);

  const isLoading = isFetchindList || isFecthing || isFetchindTask;

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
      getPrioritizedTasks,
      addTask,
      addEditList,
      updateAllTasksFromList,
      updateTasksOrderIndexFromList,
      deleteList,
      deleteTask,
      updateTask,
      setSelectedListId,
      moveTask,
      selectedListId,
    }),
    [
      isLoading,
      lists,
      tasks,
      getPrioritizedTasks,
      addTask,
      addEditList,
      updateAllTasksFromList,
      updateTasksOrderIndexFromList,
      deleteList,
      deleteTask,
      updateTask,
      setSelectedListId,
      moveTask,
      selectedListId,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContextWrapper;
// 356
