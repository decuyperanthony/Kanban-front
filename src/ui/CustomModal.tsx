import { FC, ReactNode } from 'react';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  // ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';

// import CustomButton from './CustomButton';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  body: ReactNode;
  header?: string;
  hasCloseButton?: boolean;
};

const CustomModal: FC<Props> = ({
  onClose,
  isOpen,
  body,
  header,
  hasCloseButton = true,
}) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        {header && <ModalHeader>{header}</ModalHeader>}
        {hasCloseButton && <ModalCloseButton />}

        <ModalBody>{body}</ModalBody>
        {/* <ModalFooter>
          <CustomButton onClick={onClose}>Close</CustomButton>
          <CustomButton>Secondary Action</CustomButton>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
