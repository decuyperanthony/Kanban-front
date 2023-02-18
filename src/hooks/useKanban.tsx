import { ChangeEvent, useMemo, useState } from 'react';
import useSWR from 'swr';
import fetcher, { instance } from '../service/config';
import { Kanban } from '../Models/kanban';
import { KANBAN_URL } from '../service/endPoint';

type ResPokeAPI = {
  ok: true;
  data: Kanban[];
};

const useKanban = () => {
  const {
    data: res,
    error,
    isLoading,
  } = useSWR<ResPokeAPI>(KANBAN_URL, fetcher);

  const [newKanban, setNewKanban] = useState({ name: '' });

  const addKanban = async () => {
    try {
      const res = await instance().post('/kanban', newKanban);
      console.log('res :>> ', res);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const deleteKanban = async (kanbanId: string) => {
    try {
      const res = await instance().delete('/kanban/' + kanbanId);
      console.log('res :>> ', res);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewKanban({ name: e.target.value });
  };

  return useMemo(() => {
    return {
      data: res?.data,
      error,
      isLoading,
      addKanban,
      onChange,
      newKanban,
      deleteKanban,
    };
  }, [res, error, isLoading, addKanban, onChange, newKanban, deleteKanban]);
};

export default useKanban;
