import { Input, ResponsiveValue } from '@chakra-ui/react';
import { FC } from 'react';

type Props = {
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[];
  size?: ResponsiveValue<string | 'sm' | 'md' | 'lg' | 'xs'>;
};

const CustomInput: FC<Props> = ({ onBlur, onChange, value, size }) => (
  <Input onBlur={onBlur} onChange={onChange} value={value} size={size} />
);

export default CustomInput;
