import './App.css';
import { ChakraProvider } from '@chakra-ui/react';

import AppContextWrapper from './context/AppContext';

import TasksScreen from './screens/Tasks.screen';

const App = () => {
  return (
    <ChakraProvider>
      <AppContextWrapper>
        <div className="App">
          <TasksScreen />
        </div>
      </AppContextWrapper>
    </ChakraProvider>
  );
};

export default App;
