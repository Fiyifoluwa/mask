import React, {forwardRef} from 'react';
import {type SvgProps} from 'react-native-svg';
import {Theme, useTheme} from '../../theme';
import {svgIconPack, SvgIconPackType} from '../../assets/svg';

export type SvgIconProps = SvgProps & {
  name: SvgIconPackType;
  size?: keyof Theme['iconSizes'];
};

const Icon = forwardRef((Props: SvgIconProps, _ref) => {
  const {name, size = 'l', ...rest} = Props;
  const theme = useTheme();

  if (name !== undefined) {
    const SvgIcon = svgIconPack[name as keyof typeof svgIconPack];
    const iconSize = theme?.iconSizes[size];
    return name?.length > 0 ? <SvgIcon {...iconSize} {...rest} /> : null;
  }
});

export default Icon;
