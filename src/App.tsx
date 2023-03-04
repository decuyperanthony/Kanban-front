import './App.css';
import {
  Box,
  ChakraProvider,
  HStack,
  Stack,
  useBoolean,
} from '@chakra-ui/react';

import CustomLoader from './ui/CustomLoader';
import Addtask from './components/Tasks/AddTask';

import Lists from './components/Lists';
import Tasks from './components/Tasks';
import AppContextWrapper, { useAppContext } from './context/AppContext';
import AddList from './components/Lists/AddList';
import { useRef } from 'react';

const App = () => {
  const { isLoading } = useAppContext();
  const [isAddingList, setIsAddingList] = useBoolean();
  const listRef = useRef(null);
  // todo sroll to right if isAddingList

  // useEffect(() => {
  //   if (isAddingList)
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  // }, [isAddingList]);
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
      <HStack minH="64px" p={3} spacing={3} justify="center"></HStack>
      <HStack
        w={'99vw'}
        overflowX="auto"
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        ref={listRef}
        minH="50px"
      >
        <Lists isAddingList={isAddingList} />
        <Box minW={'70vw'}>
          <AddList
            isAddingList={isAddingList}
            setIsAddingList={setIsAddingList}
          />
        </Box>
      </HStack>
      {!isAddingList && (
        <Stack>
          <HStack px={2} minH="46px">
            <Addtask />
          </HStack>
          <Tasks />
        </Stack>
      )}
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
