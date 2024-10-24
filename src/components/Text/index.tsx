import {createText} from '@shopify/restyle';
import React, {type ComponentProps} from 'react';
import {Theme} from '../../theme';

const RestyleText = createText<Theme>();

export type RestyleTextProps = ComponentProps<typeof RestyleText>;

export type TextProps = RestyleTextProps;

const Text = (Props: TextProps) => {
  const {children, variant = 'regular16', color = 'mainText', ...rest} = Props;

  return (
    <RestyleText variant={variant} {...rest} color={color}>
      {children}
    </RestyleText>
  );
};

export default Text;
