import { FC, ChangeEvent, useCallback, useEffect, useState } from 'react';
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
  status: 'OPEN' as TaskStatus,
};
const initListState = {
  title: '',
};

type Context = {
  lists: List[];
  isLoading: boolean;
  tasks: Task[];
  selectedListId?: string;
  addTask: (
    newTask: Partial<Task>,
    onResetAddTaskState: () => void
  ) => Promise<void>;
  addEditList: (setIsAddingOrEditingListToFalse: () => void) => Promise<void>;
  onClickOnEditList: () => void;
  onResetListFormState: () => void;
  listForm: Omit<List, '_id'> & { _id?: string };
  onAddListInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedListId: React.Dispatch<React.SetStateAction<string | undefined>>;
  deleteTask: (taskId: string) => Promise<void>;
  deleteList: (onClosePopoverDeletelist: () => void) => Promise<void>;
  updateTask: (
    task: Partial<Task>,
    onResetUpdatedTaskState: () => void
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
  const [lists, setLists] = useImmer<List[]>([]);
  const [tasks, setTasks] = useImmer<Task[]>([]);
  const [selectedListId, setSelectedListId] = useState<string>();
  const [isFecthing, setIsFetching] = useBoolean();

  const [listForm, setListForm] = useState<
    Omit<List, '_id'> & { _id?: string }
  >(initListState);

  const { data: resLists, isLoading: isFetchindList } = useSWR<ResListAPI>(
    LIST_URL,
    fetcher
  );

  const { data: resTask, isLoading: isFetchindTask } = useSWR<ResTaskAPI>(
    selectedListId ? LIST_URL + selectedListId + TASK_URL : null,
    fetcher
  );

  const onAddListInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setListForm({ ...listForm, title: e.target.value });
    },
    [listForm]
  );

  const onClickOnEditList = useCallback(() => {
    setListForm(lists.find(({ _id }) => _id === selectedListId) as List);
  }, [lists, selectedListId]);

  const onResetListFormState = () => setListForm(initListState);

  const addEditList = useCallback(
    async (setIsAddingOrEditingListToFalse: () => void) => {
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
    [listForm]
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
          // todo au success set la liste précédente de celle delete ou si pas possible
          // set la 0
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
          newTask
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
    [selectedListId]
  );

  // todo virer le form ici pour les taches le mettre dans la vue => update task state
  // todo faire pareil pour le newTask histoire d'alléger le contexte
  // todo faire toute cette refacto pour les listes aussi
  // todo virer les onChange

  const updateTask = useCallback(
    async (task: Partial<Task>, onResetUpdatedTaskState: () => void) => {
      setIsFetching.on();
      try {
        const res = await instance().put(TASK_URL + task._id, task);

        if (res.data.ok) {
          const updateTask = res.data.data;
          setTasks(
            tasks.map((proj) =>
              proj._id === updateTask._id
                ? { ...proj, ...updateTask }
                : { ...proj }
            )
          );
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
      listForm,
      addTask,
      addEditList,
      onClickOnEditList,
      deleteList,
      deleteTask,
      updateTask,
      onAddListInputChange,
      setSelectedListId,
      onResetListFormState,
      selectedListId,
    }),
    [
      isLoading,
      lists,
      tasks,
      listForm,
      isLoading,
      addTask,
      addEditList,
      onClickOnEditList,
      deleteList,
      deleteTask,
      updateTask,
      onAddListInputChange,
      setSelectedListId,
      onResetListFormState,
      selectedListId,
    ]
  );

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppContextWrapper;
// 356
