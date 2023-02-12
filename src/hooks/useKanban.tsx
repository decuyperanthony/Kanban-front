import { useMemo } from 'react';
import useSWR from 'swr';
import fetcher from '../service/config';
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

  return useMemo(() => {
    return {
      data: res?.data,
      error,
      isLoading,
    };
  }, [res, error, isLoading]);
};

export default useKanban;
