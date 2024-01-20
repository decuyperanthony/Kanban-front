import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AppContextWrapper from './context/AppContext';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import TasksScreen from './screens/Tasks.screen';
import theme from './ui/theme';

import Layout from './core/Layout';

const App = () => {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <DndProvider backend={HTML5Backend}>
          <AppContextWrapper>
            <Layout>
              <div className="App">
                <Routes>
                  <Route path="/:listId" element={<TasksScreen />} />
                  <Route path="/" element={<TasksScreen />} />
                </Routes>
              </div>
            </Layout>
          </AppContextWrapper>
        </DndProvider>
      </ChakraProvider>
    </Router>
  );
};

export default App;
