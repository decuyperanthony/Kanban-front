import './App.css';
import { ChakraProvider, HStack, Stack } from '@chakra-ui/react';

import CustomLoader from './ui/CustomLoader';
import Addtask from './components/AddTask';

import Lists from './components/Lists';
import Tasks from './components/Tasks';
import AppContextWrapper, { useAppContext } from './context/AppContext';

const App = () => {
  const { isLoading } = useAppContext();

  return (
    <ChakraProvider>
      <AppContextWrapper>
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
          <HStack minH="64px" p={3} spacing={3} justify="center">
            <Addtask />
          </HStack>
          <Lists />
          <Tasks />
        </div>
      </AppContextWrapper>
    </ChakraProvider>
  );
};

export default App;
