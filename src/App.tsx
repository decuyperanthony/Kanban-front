import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppContextWrapper from './context/AppContext';

import TasksScreen from './screens/Tasks.screen';

const App = () => {
  return (
    <ChakraProvider>
      <DndProvider backend={HTML5Backend}>
        <AppContextWrapper>
          <div className="App">
            <TasksScreen />
          </div>
        </AppContextWrapper>
      </DndProvider>
    </ChakraProvider>
  );
};

export default App;
