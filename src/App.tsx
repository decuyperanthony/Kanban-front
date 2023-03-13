import './App.css';
import {
  Box,
  Button,
  ChakraProvider,
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

import CustomLoader from './ui/CustomLoader';
import TaskForm from './components/Tasks/TaskForm';

import Lists from './components/Lists';
import Tasks from './components/Tasks';
import AppContextWrapper, { useAppContext } from './context/AppContext';
import ListForm from './components/Lists/ListForm';

import CustomModal from './ui/CustomModal';
import CustomButton from './ui/CustomButton';
import { useImmer } from 'use-immer';
import { ChangeEvent, useCallback } from 'react';
import { List } from './Models/list';

const initListState = {
  title: '',
};

const App = () => {
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

  // todo refacto tout ce composant virer toutes les méthodes de l'app et les mettre
  // todo dans des coposants disctincts

  return (
    <div className="App">
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
      <Box h="10px" />
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
        <Lists setIsAddingTaskToFalse={setIsAddingTask.off} />
        <Box pr={2}>
          <CustomButton
            variant="outline"
            colorScheme="blue"
            onClick={setIsAddingOrEditingList.on}
          >
            nouvelle liste
          </CustomButton>
        </Box>
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

const AppWrapper = () => (
  <ChakraProvider>
    <AppContextWrapper>
      <App />
    </AppContextWrapper>
  </ChakraProvider>
);

export default AppWrapper;
