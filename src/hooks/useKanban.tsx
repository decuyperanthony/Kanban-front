import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import fetcher, { instance } from '../service/config';
import { Kanban } from '../Models/kanban';
import { KANBAN_URL } from '../service/endPoint';
import { useBoolean } from '@chakra-ui/react';

type ResPokeAPI = {
  ok: true;
  data: Kanban[];
};

const useKanban = () => {
  const { data: res, isLoading: loading } = useSWR<ResPokeAPI>(
    KANBAN_URL,
    fetcher
  );

  const [kanbans, setKanbans] = useState<Kanban[]>([]);
  const [isFecthing, setIsFetching] = useBoolean();

  const [updatedKanban, setUpdatedKanban] = useState({ name: '' });

  const addKanban = async () => {
    setIsFetching.on();
    try {
      const res = await instance().post('/kanban', updatedKanban);
      const updatedKanbans = [...kanbans];
      updatedKanbans.push(res.data.data);
      setKanbans(updatedKanbans);
      setUpdatedKanban({ name: '' });
    } catch (error) {
      // todo trait error
      console.log('error :>> ', error);
    } finally {
      setIsFetching.off();
    }
  };

  const deleteKanban = async (kanbanId: string) => {
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
  };

  const updateKanban = async (kanbanId: string) => {
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
    } catch (error) {
      // todo trait error
      console.log('error :>> ', error);
    } finally {
      setIsFetching.off();
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedKanban({ name: e.target.value });
  };

  const isLoading = loading || isFecthing;

  useEffect(() => {
    if (res?.data) setKanbans(res?.data);
  }, [res?.data]);

  return useMemo(() => {
    return {
      kanbans,
      updatedKanban,
      isLoading,
      addKanban,
      deleteKanban,
      updateKanban,
      onChange,
      setUpdatedKanban,
    };
  }, [
    kanbans,
    updatedKanban,
    isLoading,
    addKanban,
    deleteKanban,
    updateKanban,
    onChange,
    setUpdatedKanban,
  ]);
};

export default useKanban;
