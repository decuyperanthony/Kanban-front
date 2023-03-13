import {
  Box,
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  useBoolean,
  useDisclosure,
} from '@chakra-ui/react';

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

const initListState = {
  title: '',
};

const TasksScreen = () => {
  const [listForm, setListForm] = useImmer<Partial<List>>(initListState);

  const { isLoading, deleteList, lists, selectedListId } = useAppContext();

  const [isAddingOrEditingList, setIsAddingOrEditingList] = useBoolean();
  const [isAddingTask, setIsAddingTask] = useBoolean();
  const {
    isOpen: isPopoverDeleteListOpen,
    onToggle: onTogglePopoverDeletelist,
    onClose: onClosePopoverDeletelist,
  } = useDisclosure();

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
        overflowX="auto"
        m="auto"
        maxW={{ sm: '600px', md: '800px', lg: '1000px' }}
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        spacing={3}
      >
        <Lists
          setIsAddingOrEditingListToTrue={setIsAddingOrEditingList.on}
          setIsAddingTaskToFalse={setIsAddingTask.off}
        />
      </HStack>
      {!isAddingOrEditingList && (
        // TODO REFACTO THIS
        <Stack>
          <HStack mt={2} px={2} minH="46px">
            <TaskForm
              setIsAddingTask={setIsAddingTask}
              isAddingTask={isAddingTask}
            />
            {!isAddingTask && (
              <>
                <Popover
                  isOpen={isPopoverDeleteListOpen}
                  onClose={onClosePopoverDeletelist}
                >
                  <PopoverTrigger>
                    <Button
                      onClick={onTogglePopoverDeletelist}
                      size={'sm'}
                      variant="ghost"
                      colorScheme="red"
                    >
                      Supprimer la liste
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Confirmation!</PopoverHeader>
                    <PopoverBody>
                      <Text>
                        Êtes-vous sûrs de vouloir supprimer la liste ? Cela
                        effecera toute(s) le(s) tache(s)
                      </Text>
                      <Box textAlign="right">
                        <CustomButton
                          onClick={() => deleteList(onClosePopoverDeletelist)}
                          size={'sm'}
                          colorScheme="red"
                        >
                          Oui
                        </CustomButton>
                      </Box>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
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
              </>
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
