import './App.css';
import {
  Box,
  ChakraProvider,
  CircularProgress,
  HStack,
  Stack,
  Text,
  useBoolean,
} from '@chakra-ui/react';

import {
  AddCircleSvgIcon,
  ArrowLeftSvgIcon,
  DeleteSvgIcon,
} from './assets/svg/icons';
import useKanban from './hooks/useKanban';
import { useState } from 'react';
import CustomInput from './ui/CustomInput';
import CustomButton from './ui/CustomButton';
import CustomLoader from './ui/CustomLoader';
import Addtask from './components/AddTask';

const App = () => {
  const {
    kanbans,
    newKanban,
    updatedKanban,
    isLoading,
    addKanban,
    deleteKanban,
    updateKanban,
    updateKanbanStatus,
    onAddKanbanInputChange,
    onUpdateKanbanInputChange,
    setUpdatedKanban,
  } = useKanban();

  const [isEditing, setIsEditing] = useBoolean();
  const [editKanbanId, setEditKanbanId] = useState('');

  return (
    <ChakraProvider>
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
          <Addtask
            addKanban={addKanban}
            newKanban={newKanban}
            onKanbanInputChange={onAddKanbanInputChange}
          />
        </HStack>
        {kanbans?.map(({ name, _id, status }, index) => (
          <HStack
            justify="space-between"
            p={3}
            border="1px solid"
            borderTop={index === 0 ? '2px solid' : undefined}
            borderBottom={
              index === kanbans.length - 1 ? '2px solid' : undefined
            }
            borderColor={'blue.500'}
            key={_id}
            bg={status === 'DONE' ? 'blue.200' : undefined}
          >
            <HStack w={'100%'} align="center" minH={'40px'}>
              {isEditing && editKanbanId === _id ? (
                <HStack w={'100%'} spacing={4}>
                  <Box flex={6}>
                    <CustomInput
                      onBlur={() => {
                        updateKanban(_id);
                        setIsEditing.off();
                      }}
                      onChange={(e) => onUpdateKanbanInputChange(e)}
                      value={updatedKanban.name}
                      size="sm"
                    />
                  </Box>
                  <Box flex={1}>
                    <CustomButton onClick={setIsEditing.off} size={'sm'}>
                      Cancel
                    </CustomButton>
                  </Box>
                </HStack>
              ) : (
                <Text
                  px={1}
                  borderRadius="sm"
                  _hover={{ bg: 'gray.100' }}
                  cursor="pointer"
                  onClick={() => {
                    setIsEditing.on();
                    setUpdatedKanban({ name, status });
                    setEditKanbanId(_id);
                  }}
                >
                  {name}
                </Text>
              )}
            </HStack>

            <CustomButton
              onClick={() => updateKanbanStatus(_id, name, status)}
              variant="outline"
              isDisabled={isEditing && _id === editKanbanId}
            >
              {status === 'DONE' ? 'ReOpen' : 'Done'}
            </CustomButton>

            <Box cursor="pointer" onClick={() => deleteKanban(_id)}>
              <DeleteSvgIcon fill="#122" />
            </Box>
          </HStack>
        ))}
      </div>
    </ChakraProvider>
  );
};

export default App;
