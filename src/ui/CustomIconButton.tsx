import { IconButton, ResponsiveValue } from '@chakra-ui/react';
import { FC } from 'react';

type Props = {
  icon: React.ReactElement<
    unknown,
    string | React.JSXElementConstructor<unknown>
  >;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ariaLabel?: string;
  isDisabled?: boolean;
  size?: ResponsiveValue<string | 'md' | 'sm' | 'lg' | 'xs'>;
};

const CustomIconButton: FC<Props> = ({
  icon,
  ariaLabel = 'CustomIconButton',
  onClick,
  size = 'md',
  isDisabled,
}) => (
  <IconButton
    isDisabled={isDisabled}
    onClick={onClick}
    aria-label={ariaLabel}
    size={size}
    icon={icon}
  />
);

export default CustomIconButton;
