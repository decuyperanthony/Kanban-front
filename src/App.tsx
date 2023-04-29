import './App.css';
import {
  Box,
  ChakraProvider,
  ColorModeProvider,
  useColorMode,
} from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppContextWrapper from './context/AppContext';

import TasksScreen from './screens/Tasks.screen';
import theme from './ui/theme';

import Layout from './core/Layout';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <AppContextWrapper>
          <Layout>
            <div className="App">
              <TasksScreen />
            </div>
          </Layout>
        </AppContextWrapper>
      </DndProvider>
    </ChakraProvider>
  );
};

export default App;
