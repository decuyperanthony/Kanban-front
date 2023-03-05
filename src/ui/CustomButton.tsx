import { Button, ResponsiveValue } from '@chakra-ui/react';
import { FC, MouseEventHandler, PropsWithChildren } from 'react';

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: ResponsiveValue<
    string | 'link' | 'outline' | 'ghost' | 'solid' | 'unstyled'
  >;
  size?: ResponsiveValue<string | 'sm' | 'md' | 'lg' | 'xs'>;
  isDisabled?: boolean;
  colorScheme?:
    | string
    | 'whiteAlpha'
    | 'blackAlpha'
    | 'gray'
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'teal'
    | 'blue'
    | 'cyan'
    | 'purple'
    | 'pink'
    | 'linkedin'
    | 'facebook'
    | 'messenger'
    | 'whatsapp'
    | 'twitter'
    | 'telegram';
};

const CustomButton: FC<PropsWithChildren<Props>> = ({
  onClick,
  variant,
  isDisabled,
  children,
  size,
  colorScheme,
}) => (
  <Button
    colorScheme={colorScheme}
    variant={variant}
    isDisabled={isDisabled}
    onClick={onClick}
    size={size}
  >
    {children}
  </Button>
);

export default CustomButton;
