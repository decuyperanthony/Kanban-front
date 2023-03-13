import { Box, HStack, Stack, useBoolean } from '@chakra-ui/react';

import CustomLoader from '../ui/CustomLoader';
import TaskForm from '../components/Tasks/TaskForm';

import Lists from '../components/Lists';
import Tasks from '../components/Tasks';
import { useAppContext } from '../context/AppContext';
import ListForm from '../components/Lists/ListForm';

import CustomModal from '../ui/CustomModal';
import CustomButton from '../ui/CustomButton';
import { useImmer } from 'use-immer';
import { ChangeEvent, useCallback } from 'react';
import { List } from '../Models/list';

import CustomButtonPopover from '../ui/CustomPopover';
import CustomIconButton from '../ui/CustomIconButton';
import { AddIcon, CalendarIcon } from '@chakra-ui/icons';

const initListState = {
  title: '',
};

const TasksScreen = () => {
  const [listForm, setListForm] = useImmer<Partial<List>>(initListState);

  const { isLoading, deleteList, lists, selectedListId } = useAppContext();

  const [isAddingOrEditingList, setIsAddingOrEditingList] = useBoolean();
  const [isAddingTask, setIsAddingTask] = useBoolean();

  const onClickOnEditList = useCallback(() => {
    setListForm(lists.find(({ _id }) => _id === selectedListId) as List);
  }, [lists, selectedListId]);

  const onResetListFormState = () => setListForm(initListState);

  const onAddListInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setListForm({ ...listForm, title: e.target.value });
    },
    [listForm]
  );

  return (
    <div>
      {isLoading && (
        <Box
          sx={{ backdropFilter: 'blur(3px)' }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={'100%'}
          position="absolute"
          width="100%"
          zIndex={100}
        >
          <CustomLoader />
        </Box>
      )}

      <HStack
        pt={1}
        overflowX="auto"
        m="auto"
        maxW={{ sm: '600px', md: '800px', lg: '1000px' }}
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        spacing={0}
      >
        <Lists
          setIsAddingOrEditingListToTrue={setIsAddingOrEditingList.on}
          setIsAddingTaskToFalse={setIsAddingTask.off}
        />
      </HStack>
      {!isAddingOrEditingList && (
        <Stack>
          <HStack mt={2} px={2} minH="46px">
            {isAddingTask ? (
              <TaskForm setIsAddingTask={setIsAddingTask} />
            ) : (
              <HStack>
                <HStack cursor="pointer" onClick={setIsAddingTask.on}>
                  <CalendarIcon />

                  <CustomIconButton size="sm" icon={<AddIcon />} />
                </HStack>
                <CustomButtonPopover
                  buttonLabel="Supprimer la liste "
                  onConfirm={deleteList}
                  confirmMessage="Êtes-vous sûrs de vouloir supprimer la liste ? Cela effecera toute(s) le(s) tache(s)"
                />

                <CustomButton
                  onClick={() => {
                    onClickOnEditList();
                    setIsAddingOrEditingList.on();
                  }}
                  size="sm"
                  colorScheme="blue"
                >
                  Éditer la liste
                </CustomButton>
              </HStack>
            )}
          </HStack>
          <Tasks />
        </Stack>
      )}
      <CustomModal
        hasCloseButton={false}
        isOpen={isAddingOrEditingList}
        onClose={setIsAddingOrEditingList.off}
        body={
          <ListForm
            setIsAddingOrEditingListToFalse={setIsAddingOrEditingList.off}
            onResetListFormState={onResetListFormState}
            onAddListInputChange={onAddListInputChange}
            listForm={listForm}
          />
        }
      />
    </div>
  );
};

export default TasksScreen;
