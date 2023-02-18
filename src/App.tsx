import './App.css';
import {
  Box,
  Button,
  ChakraProvider,
  CircularProgress,
  HStack,
  Input,
  Stack,
  useBoolean,
} from '@chakra-ui/react';
import {
  AddCircleSvgIcon,
  ArrowLeftSvgIcon,
  DeleteSvgIcon,
} from './assets/svg/icons';
import useKanban from './hooks/useKanban';

function App() {
  const { kanbans, addKanban, onChange, newKanban, deleteKanban, isLoading } =
    useKanban();
  const [isAdding, setIsAdding] = useBoolean();

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
              <Input value={newKanban.name} onChange={(e) => onChange(e)} />
              <Button onClick={addKanban}>valider</Button>
            </>
          ) : (
            <>
              <p>Ajouter un mémo</p>
              <Box cursor="pointer" onClick={setIsAdding.on}>
                <AddCircleSvgIcon fill="#122" />
              </Box>
            </>
          )}
        </HStack>
        {kanbans?.map(({ name, _id }) => (
          <HStack
            justify="space-between"
            p={3}
            border="1px solid"
            borderColor={'blue.500'}
            key={_id}
          >
            <p>{name}</p>
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
