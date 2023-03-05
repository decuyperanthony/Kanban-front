import { FC } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useAppContext } from '../../context/AppContext';
type Props = {
  setIsAddingTask: {
    on: () => void;
    off: () => void;
  };
};
const Lists: FC<Props> = ({ setIsAddingTask }) => {
  const { lists, setSelectedListId, selectedListId } = useAppContext();

  return (
    <Flex>
      {lists.map(({ title, _id }) => {
        const isSelected = selectedListId === _id;
        return (
          <Box
            cursor="pointer"
            borderTop={isSelected ? '1px solid' : ''}
            borderLeft={isSelected ? '1px solid' : ''}
            borderRight={isSelected ? '1px solid' : ''}
            borderBottom={!isSelected ? '1px solid' : ''}
            borderColor="#E2E8F0"
            onClick={() => {
              setIsAddingTask.off();
              setSelectedListId(_id);
            }}
            key={_id}
            p={3}
          >
            <Text
              noOfLines={1}
              textAlign={'center'}
              color={isSelected ? 'blue.500' : ''}
            >
              {title}
            </Text>
          </Box>
        );
      })}
    </Flex>
  );
};

export default Lists;
