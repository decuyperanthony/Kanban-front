import './App.css';
import {
  Box,
  Button,
  ChakraProvider,
  CircularProgress,
  HStack,
  Input,
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

function App() {
  const {
    kanbans,
    updatedKanban,
    isLoading,
    addKanban,
    deleteKanban,
    updateKanban,
    updateKanbanStatus,
    onChange,
    setUpdatedKanban,
  } = useKanban();
  const [isAdding, setIsAdding] = useBoolean();
  const [isEditing, setIsEditing] = useBoolean();
  const [editKanbanId, setEditKanbanId] = useState('');

  return (
    <ChakraProvider>
      <Box className="App" pos={'relative'}>
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
            <CircularProgress isIndeterminate />
          </Stack>
        )}
        <HStack minH="64px" p={3} spacing={3} justify="center">
          {isAdding ? (
            <>
              <Box cursor="pointer" onClick={setIsAdding.off}>
                <ArrowLeftSvgIcon fill="#122" />
              </Box>
              <Input value={updatedKanban.name} onChange={(e) => onChange(e)} />
              <Button onClick={addKanban}>OK</Button>
            </>
          ) : (
            <>
              <p>Add note</p>
              <Box px={4} cursor="pointer" onClick={setIsAdding.on}>
                <AddCircleSvgIcon fill="#122" />
              </Box>
            </>
          )}
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
                    <Input
                      onBlur={() => {
                        updateKanban(_id);
                        setIsEditing.off();
                      }}
                      onChange={(e) => onChange(e)}
                      value={updatedKanban.name}
                      size="sm"
                    />
                  </Box>
                  <Button flex={1} onClick={setIsEditing.off} size={'sm'}>
                    Cancel
                  </Button>
                </HStack>
              ) : (
                <Text
                  px={1}
                  borderRadius="sm"
                  _hover={{ bg: 'gray.100' }}
                  cursor="pointer"
                  onClick={() => {
                    setIsEditing.on();
                    setIsAdding.off();
                    setUpdatedKanban({ name, status });
                    setEditKanbanId(_id);
                  }}
                >
                  {name}
                </Text>
              )}
            </HStack>

            <Button
              onClick={() => updateKanbanStatus(_id, name, status)}
              variant="outline"
            >
              {status === 'DONE' ? 'ReOpen' : 'Done'}
            </Button>

            <Box cursor="pointer" onClick={() => deleteKanban(_id)}>
              <DeleteSvgIcon fill="#122" />
            </Box>
          </HStack>
        ))}
      </Box>
    </ChakraProvider>
  );
}

export default App;
