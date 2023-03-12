import { ChangeEvent, useCallback, useState } from 'react';
import { List } from './../Models/list';

const initListState = {
  title: '',
};

const useLists = (initLists: List[]) => {
  const [lists, setLists] = useState<List[]>(initLists);
  const [selectedListId, setSelectedListId] = useState<string>();
  const [listForm, setListForm] = useState<
    Omit<List, '_id'> & { _id?: string }
  >(initListState);
  console.log('first', lists);

  const onAddListInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setListForm({ ...listForm, title: e.target.value });
    },
    [listForm]
  );

  const onClickOnEditList = useCallback(() => {
    setListForm(lists.find(({ _id }) => _id === selectedListId) as List);
  }, [lists, selectedListId]);

  return 'bar';
};

export default useLists;
