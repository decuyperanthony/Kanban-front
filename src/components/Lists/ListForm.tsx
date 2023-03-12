import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useAppContext } from '../../context/AppContext';
import CustomIconButton from '../../ui/CustomIconButton';
import CustomInput from '../../ui/CustomInput';

type Props = {
  setIsAddingOrEditingListToFalse: () => void;
};

const ListForm: FC<Props> = ({ setIsAddingOrEditingListToFalse }) => {
  const { addEditList, onAddListInputChange, listForm, onResetListFormState } =
    useAppContext();

  return (
    <HStack>
      <CustomInput
        onChange={onAddListInputChange}
        value={listForm.title}
        autoFocus
        placeholder={
          listForm?._id ? listForm.title : 'titre de la nouvelle liste'
        }
      />
      <CustomIconButton
        onClick={() => {
          setIsAddingOrEditingListToFalse();
          onResetListFormState();
        }}
        icon={<CloseIcon />}
      />
      <CustomIconButton
        onClick={() => addEditList(setIsAddingOrEditingListToFalse)}
        icon={<CheckIcon />}
      />
    </HStack>
  );
};

export default ListForm;
