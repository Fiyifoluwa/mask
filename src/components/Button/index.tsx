import {
  backgroundColor,
  type BackgroundColorProps,
  border,
  type BorderProps,
  composeRestyleFunctions,
  spacing,
  type SpacingProps,
  useRestyle,
} from '@shopify/restyle';
import React, {type ReactNode} from 'react';
import {ActivityIndicator, Dimensions} from 'react-native';

import {type Theme} from '../../theme';
import Box from '../Box';
import Pressable, {type PressableProps} from '../Pressable';
import Text, {type TextProps} from '../Text';
import {fontPixel, heightPixel} from '../../utils/responsiveDimensions';

const {width} = Dimensions.get('window');

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  backgroundColor,
]);

type Props = RestyleProps & {
  onPress: () => void;
  label?: string;
  containerProps?: PressableProps;
  labelProps?: TextProps;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
};

const defaultContainerProps: PressableProps = {
  alignItems: 'center',
  borderRadius: 'm',
  flexDirection: 'column',
  height: heightPixel(48),
  justifyContent: 'center',
  width: width * 0.9,
};

const defaultLabelProps: TextProps = {
  color: 'white',
  fontSize: fontPixel(15),
  fontWeight: '500',
};

const Button = ({
  onPress,
  label = 'Continue',
  containerProps = {...defaultContainerProps},
  labelProps = {...defaultLabelProps},
  disabled = false,
  leftIcon,
  rightIcon,
  loading,
  ...rest
}: Props) => {
  const props = useRestyle(restyleFunctions, rest);

  const mergedContainerProps = {...defaultContainerProps, ...containerProps};

  const mergedLabelProps = {...defaultLabelProps, ...labelProps};

  return (
    <Pressable
      {...props}
      disabled={disabled}
      opacity={disabled ? 0.75 : 1}
      {...mergedContainerProps}
      onPress={onPress}
      testID={label}
      accessibilityLabel={`${label} button`}>
      <Box alignItems={'center'} flexDirection={'row'}>
        {Boolean(leftIcon) && leftIcon}
        {loading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <Text {...mergedLabelProps} variant="buttonLabel">
            {label}
          </Text>
        )}
        {Boolean(rightIcon) && rightIcon}
      </Box>
    </Pressable>
  );
};

export default Button;
