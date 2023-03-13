import { FC } from 'react';

import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import CustomButton from './CustomButton';

type Props = {
  onConfirm: (onClosePopover: () => void) => void;
  confirmMessage?: string;
  buttonLabel: string;
};

const CustomButtonPopover: FC<Props> = ({
  onConfirm,
  confirmMessage = 'Êtes-vous sûrs ?',
  buttonLabel,
}) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Button onClick={onToggle} size="sm" variant="ghost" colorScheme="red">
          {buttonLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Confirmation!</PopoverHeader>
        <PopoverBody>
          <Text>{confirmMessage}</Text>
          <Box textAlign="right">
            <CustomButton
              onClick={() => onConfirm(onClose)}
              size={'sm'}
              colorScheme="red"
            >
              Oui
            </CustomButton>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default CustomButtonPopover;
