import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { HStack } from '@chakra-ui/react';
import { ChangeEvent, FC } from 'react';
import { useAppContext } from '../../context/AppContext';
import { List } from '../../Models/list';
import CustomIconButton from '../../ui/CustomIconButton';
import CustomInput from '../../ui/CustomInput';

type Props = {
  setIsAddingOrEditingListToFalse: () => void;
  onResetListFormState: () => void;
  listForm: Partial<List>;
  onAddListInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ListForm: FC<Props> = ({
  setIsAddingOrEditingListToFalse,
  onResetListFormState,
  listForm,
  onAddListInputChange,
}) => {
  const { addEditList } = useAppContext();

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
        onClick={() =>
          addEditList(
            listForm,
            setIsAddingOrEditingListToFalse,
            onResetListFormState
          )
        }
        icon={<CheckIcon />}
      />
    </HStack>
  );
};

export default ListForm;
