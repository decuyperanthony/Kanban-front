import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useAppContext } from '../../context/AppContext';
import CustomIconButton from '../../ui/CustomIconButton';
import CustomInput from '../../ui/CustomInput';

type Props = {
  setIsAddingOrEditingList: {
    on: () => void;
    off: () => void;
  };
};

const ListForm: FC<Props> = ({ setIsAddingOrEditingList }) => {
  const { addList, onAddListInputChange, listForm, onResetListFormState } =
    useAppContext();

  return (
    <HStack>
      <CustomInput
        onChange={onAddListInputChange}
        value={listForm.title}
        autoFocus
        placeholder={listForm?._id ? 'foo' : 'titre de la nouvelle liste'}
      />
      <CustomIconButton
        onClick={() => {
          setIsAddingOrEditingList.off();
          onResetListFormState();
        }}
        icon={<CloseIcon />}
      />
      <CustomIconButton
        onClick={() => addList(setIsAddingOrEditingList)}
        icon={<CheckIcon />}
      />
    </HStack>
  );
};

export default ListForm;
