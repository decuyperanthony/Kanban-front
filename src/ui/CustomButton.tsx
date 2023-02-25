import { Button, ResponsiveValue } from '@chakra-ui/react';
import { FC, MouseEventHandler, PropsWithChildren } from 'react';

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: ResponsiveValue<
    string | 'link' | 'outline' | 'ghost' | 'solid' | 'unstyled'
  >;
  size?: ResponsiveValue<string | 'sm' | 'md' | 'lg' | 'xs'>;
  isDisabled?: boolean;
};

const CustomButton: FC<PropsWithChildren<Props>> = ({
  onClick,
  isDisabled,
  children,
  size,
}) => (
  <Button isDisabled={isDisabled} onClick={onClick} size={size}>
    {children}
  </Button>
);

export default CustomButton;
