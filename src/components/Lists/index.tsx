import { FC } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { useAppContext } from '../../context/AppContext';
import CustomButton from '../../ui/CustomButton';
type Props = {
  setIsAddingTaskToFalse: () => void;
  setIsAddingOrEditingListToTrue: () => void;
};
const Lists: FC<Props> = ({
  setIsAddingTaskToFalse,
  setIsAddingOrEditingListToTrue,
}) => {
  const { lists, setSelectedListId, selectedListId } = useAppContext();
  // const [isAddingOrEditingList, setIsAddingOrEditingList] = useBoolean();

  return (
    <>
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
      <Box pr={2}>
        <CustomButton
          variant="outline"
          colorScheme="blue"
          onClick={setIsAddingOrEditingListToTrue}
        >
          nouvelle liste
        </CustomButton>
      </Box>
    </>
  );
};

export default Lists;
