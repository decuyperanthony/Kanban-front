import { FC } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useAppContext } from '../../context/AppContext';
type Props = {
  setIsAddingTaskToFalse: () => void;
};
const Lists: FC<Props> = ({ setIsAddingTaskToFalse }) => {
  const { lists, setSelectedListId, selectedListId } = useAppContext();
  return (
    <Flex>
      {lists.map(({ title, _id }) => {
        const isSelected = selectedListId === _id;
        const border = '1px solid';
        return (
          <Box
            cursor="pointer"
            borderTop={isSelected ? border : ''}
            borderLeft={isSelected ? border : ''}
            borderRight={isSelected ? border : ''}
            borderBottom={!isSelected ? border : ''}
            borderColor="#E2E8F0"
            onClick={() => {
              setIsAddingTaskToFalse();
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
