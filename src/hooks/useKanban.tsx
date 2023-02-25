import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import fetcher, { instance } from '../service/config';
import { Kanban, KanbanStatus } from '../Models/kanban';
import { KANBAN_URL } from '../service/endPoint';
import { useBoolean } from '@chakra-ui/react';

type ResKanbanAPI = {
  ok: true;
  data: Kanban[];
};

const initState = {
  name: '',
  status: 'OPEN',
};

export type Task = {
  name: string;
  status: string;
};

const useKanban = () => {
  const { data: res, isLoading: loading } = useSWR<ResKanbanAPI>(
    KANBAN_URL,
    fetcher
  );

  const [kanbans, setKanbans] = useState<Kanban[]>([]);
  const [isFecthing, setIsFetching] = useBoolean();

  const [updatedKanban, setUpdatedKanban] = useState<Task>(initState);
  const [newKanban, setNewKanban] = useState<Task>(initState);

  const onUpdateKanbanInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUpdatedKanban({ ...updatedKanban, name: e.target.value });
    },
    []
  );

  const onAddKanbanInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewKanban({ ...newKanban, name: e.target.value });
    },
    []
  );

  const onResetUpdatedKanbanState = () => setUpdatedKanban(initState);
  const onResetAddKanbanState = () => setNewKanban(initState);

  const addKanban = useCallback(async () => {
    if (newKanban.name === '') return;
    setIsFetching.on();
    try {
      const res = await instance().post('/kanban', newKanban);
      const updatedKanbans = [...kanbans];
      updatedKanbans.push(res.data.data);
      setKanbans(updatedKanbans);
      onResetAddKanbanState();
    } catch (error) {
      // todo trait error
      console.log('error :>> ', error);
    } finally {
      setIsFetching.off();
    }
  }, [updatedKanban]);

  const deleteKanban = useCallback(
    async (kanbanId: string) => {
      setIsFetching.on();
      try {
        await instance().delete('/kanban/' + kanbanId);

        setKanbans(kanbans?.filter(({ _id }) => _id !== kanbanId));
      } catch (error) {
        // todo trait error
        console.log('error :>> ', error);
      } finally {
        setIsFetching.off();
      }
    },
    [kanbans]
  );

  const updateKanban = useCallback(
    async (kanbanId: string) => {
      setIsFetching.on();
      try {
        await instance().put('/kanban/' + kanbanId, updatedKanban);

        setKanbans(
          kanbans?.map((kanban) =>
            kanban._id === kanbanId
              ? { ...kanban, name: updatedKanban.name }
              : { ...kanban }
          )
        );
        onResetUpdatedKanbanState();
      } catch (error) {
        // todo trait error
        console.log('error :>> ', error);
      } finally {
        setIsFetching.off();
      }
    },
    [kanbans, updatedKanban]
  );
  // todo fix backend with no name
  // todo this
  const updateKanbanStatus = async (
    kanbanId: string,
    name: string,
    status: KanbanStatus
  ) => {
    setIsFetching.on();
    const updateStatus = status === 'DONE' ? 'OPEN' : 'DONE';
    try {
      await instance().put('/kanban/' + kanbanId, {
        name,
        status: updateStatus,
      });

      setKanbans(
        kanbans?.map((kanban) =>
          kanban._id === kanbanId
            ? {
                ...kanban,
                status: status === 'DONE' ? 'OPEN' : 'DONE',
                name: name,
              }
            : { ...kanban }
        )
      );
      onResetUpdatedKanbanState();
    } catch (error) {
      // todo trait error
      console.log('error :>> ', error);
    } finally {
      setIsFetching.off();
    }
  };

  const isLoading = loading || isFecthing;

  useEffect(() => {
    if (res?.data) setKanbans(res?.data);
  }, [res?.data]);

  return useMemo(() => {
    return {
      kanbans,
      newKanban,
      updatedKanban,
      isLoading,
      addKanban,
      deleteKanban,
      updateKanban,
      updateKanbanStatus,
      onAddKanbanInputChange,
      onUpdateKanbanInputChange,
      setUpdatedKanban,
    };
  }, [
    kanbans,
    newKanban,
    updatedKanban,
    isLoading,
    addKanban,
    deleteKanban,
    updateKanban,
    updateKanbanStatus,
    onAddKanbanInputChange,
    onUpdateKanbanInputChange,
    setUpdatedKanban,
  ]);
};

export default useKanban;
