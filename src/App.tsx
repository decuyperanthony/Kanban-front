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
import Addtask from './components/Tasks/AddTask';

import Lists from './components/Lists';
import Tasks from './components/Tasks';
import AppContextWrapper, { useAppContext } from './context/AppContext';
import AddList from './components/Lists/AddList';

import CustomModal from './ui/CustomModal';
import CustomButton from './ui/CustomButton';

const App = () => {
  const { isLoading, deleteList } = useAppContext();
  const [isAddingList, setIsAddingList] = useBoolean();
  const [isAddingTask, setIsAddingTask] = useBoolean();
  const {
    isOpen: isPopoverDeleteListOpen,
    onToggle: onTogglePopoverDeletelist,
    onClose: onClosePopoverDeletelist,
  } = useDisclosure();

  return (
    <div className="App">
      {isLoading && (
        <Stack
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
        </Stack>
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
        <Lists setIsAddingTask={setIsAddingTask} />
        <Box pr={2}>
          <CustomButton
            variant="outline"
            colorScheme="blue"
            onClick={setIsAddingList.on}
          >
            nouvelle liste
          </CustomButton>
        </Box>
      </HStack>
      {!isAddingList && (
        // TODO REFACTO THIS
        <Stack>
          <HStack mt={2} px={2} minH="46px">
            <Addtask
              setIsAddingTask={setIsAddingTask}
              isAddingTask={isAddingTask}
            />
            {!isAddingTask && (
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
            )}
          </HStack>
          <Tasks />
        </Stack>
      )}
      <CustomModal
        hasCloseButton={false}
        isOpen={isAddingList}
        onClose={setIsAddingList.off}
        body={<AddList setIsAddingList={setIsAddingList} />}
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
