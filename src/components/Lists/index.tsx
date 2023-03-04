import { Box, HStack } from '@chakra-ui/react';
import { useAppContext } from '../../context/AppContext';

const Lists = () => {
  const {
    lists,
    // isLoading: isListLoading,
    setSelectedListId,
  } = useAppContext();
  return (
    <HStack>
      {lists.map(({ title, _id }) => {
        return (
          <Box
            onClick={() => setSelectedListId(_id)}
            border="1px solid black"
            key={title}
          >
            {title}
          </Box>
        );
      })}
    </HStack>
  );
};

export default Lists;
