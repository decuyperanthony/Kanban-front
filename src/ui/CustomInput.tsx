import {
  FormControl,
  FormLabel,
  Input,
  ResponsiveValue,
} from '@chakra-ui/react';
import { FC } from 'react';

type Props = {
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[];
  size?: ResponsiveValue<string | 'sm' | 'md' | 'lg' | 'xs'>;
  autoFocus?: boolean;
  placeholder?: string;
  label?: string;
};

const CustomInput: FC<Props> = ({
  onBlur,
  onChange,
  value,
  size,
  autoFocus,
  placeholder,
  label,
}) => (
  <FormControl>
    {label && <FormLabel>{label}</FormLabel>}
    <Input
      placeholder={placeholder}
      autoFocus={autoFocus}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      size={size}
    />
  </FormControl>
);

export default CustomInput;
