import {createBox} from '@shopify/restyle';
import React, {FC, ReactNode} from 'react';
import {type ComponentProps} from 'react';
import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {type Theme} from '../../theme';
import {PaletteType} from '../../theme/palette';

const Box = createBox<Theme>();

export type BoxProps = ComponentProps<typeof Box>;

export default Box;

type SafeAreaBoxProps = ComponentProps<typeof Box> & {
  showBottomInset?: boolean;
  children: ReactNode;
  statusBarColor?: PaletteType;
};

const SafeAreaBox: FC<SafeAreaBoxProps> = ({
  children,
  backgroundColor = 'background',
  showBottomInset = true,
  ...props
}) => {
  const isAndroid = Platform.OS === 'android';
  const insets = useSafeAreaInsets();

  return (
    <Box backgroundColor={backgroundColor} flex={1}>
      <Box height={insets.top} />
      <Box backgroundColor={backgroundColor} flex={1} {...props}>
        {children}
      </Box>
      {showBottomInset && <Box height={insets.bottom + (isAndroid ? 15 : 0)} />}
    </Box>
  );
};

export {SafeAreaBox};
