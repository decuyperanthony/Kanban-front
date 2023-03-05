import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useAppContext } from '../../context/AppContext';
import CustomIconButton from '../../ui/CustomIconButton';
import CustomInput from '../../ui/CustomInput';

type Props = {
  setIsAddingList: {
    on: () => void;
    off: () => void;
  };
};

const AddList: FC<Props> = ({ setIsAddingList }) => {
  const { addList, onAddListInputChange, newList } = useAppContext();

  return (
    <HStack>
      <CustomInput
        onChange={onAddListInputChange}
        value={newList.title}
        autoFocus
        placeholder="titre de la nouvelle liste"
      />
      <CustomIconButton onClick={setIsAddingList.off} icon={<CloseIcon />} />
      <CustomIconButton
        onClick={() => addList(setIsAddingList)}
        icon={<CheckIcon />}
      />
    </HStack>
  );
};

export default AddList;
