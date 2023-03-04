import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useAppContext } from '../../context/AppContext';
import CustomIconButton from '../../ui/CustomIconButton';
import CustomInput from '../../ui/CustomInput';

type Props = {
  isAddingList: boolean;
  setIsAddingList: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
};

const AddList: FC<Props> = ({ setIsAddingList, isAddingList }) => {
  const { addList, onAddListInputChange, newList } = useAppContext();
  return (
    <>
      {isAddingList ? (
        <HStack>
          <CustomInput
            onChange={onAddListInputChange}
            value={newList.title}
            autoFocus
            size="sm"
          />
          <CustomIconButton
            onClick={setIsAddingList.off}
            size="sm"
            icon={<CloseIcon />}
          />
          <CustomIconButton onClick={addList} size="sm" icon={<CheckIcon />} />
        </HStack>
      ) : (
        <Box
          onClick={() => {
            setIsAddingList.on();
          }}
          cursor="pointer"
        >
          Ajouter une liste
        </Box>
      )}
    </>
  );
};

export default AddList;
