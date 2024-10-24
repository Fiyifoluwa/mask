import React, {type ReactNode} from 'react';

import Box, {type BoxProps} from '../Box';
import Text, {TextProps} from '../Text';

interface IRow {
  children?: ReactNode;
  spaceBetween?: boolean;
  centerAlign?: boolean;
  label?: string;
  labelProps?: TextProps;
  value?: string;
  valueProps?: TextProps;
  hidden?: boolean;
}

const Row = ({
  children,
  spaceBetween,
  centerAlign,
  label,
  value,
  labelProps,
  valueProps,
  hidden = false,
  ...props
}: IRow & BoxProps) => {
  if (hidden) {
    return;
  }

  return (
    <Box
      flexDirection={'row'}
      justifyContent={spaceBetween ? 'space-between' : 'flex-start'}
      alignItems={centerAlign ? 'center' : 'flex-start'}
      {...props}>
      {children && children}
      {label && (
        <>
          <Text textAlign="left" {...labelProps}>
            {label}
          </Text>
        </>
      )}
      {value && (
        <>
          <Text textAlign={spaceBetween ? 'right' : 'auto'} {...valueProps}>
            {value}
          </Text>
        </>
      )}
    </Box>
  );
};

export default Row;
