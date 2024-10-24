import {
  fontPixel,
  heightPixel,
  widthPixel,
} from '../utils/responsiveDimensions';
import {Palette} from './palette';
import {createTheme} from '@shopify/restyle';

const theme = createTheme({
  borderRadii: {
    none: 0,
    xxs: heightPixel(2),
    xs: heightPixel(4),
    x: heightPixel(6),
    s: heightPixel(8),
    sm: heightPixel(10),
    sml: heightPixel(12),
    m: heightPixel(16),
    md: heightPixel(18),
    l: heightPixel(20),
    ll: heightPixel(24),
    xl: heightPixel(32),
  },

  buttonSizes: {
    lg: {
      paddingHorizontal: 'xl',
      paddingVertical: 'lg',
    },
    md: {
      paddingHorizontal: 'lg',
      paddingVertical: 'md',
    },
    none: {
      paddingHorizontal: 'none',
      paddingVertical: 'none',
    },
    sm: {
      paddingHorizontal: 'md',
      paddingVertical: 'sm',
    },
    xl: {
      paddingHorizontal: 'xxl',
      paddingVertical: 'xl',
    },
    xs: {
      paddingHorizontal: 'sm',
      paddingVertical: 'xs',
    },
  },

  buttonVariants: {
    defaults: {
      borderRadius: 'sm',
    },
    filled: {
      backgroundColor: 'primaryColor',
    },
    ghost: {
      backgroundColor: 'paleGrey50',
    },
    none: {},
    outlined: {
      borderColor: 'paleGrey',
      borderWidth: 1,
    },
    transparent: {
      backgroundColor: 'transparent',
    },
  },

  colors: {
    ...Palette,
  },

  iconSizes: {
    sm: {
      height: heightPixel(10),
      width: widthPixel(10),
    },
    sml: {
      height: heightPixel(12),
      width: widthPixel(12),
    },
    m: {
      height: heightPixel(16),
      width: widthPixel(16),
    },
    l: {
      height: heightPixel(20),
      width: widthPixel(20),
    },
    buttonIcon: {
      height: heightPixel(21),
      width: widthPixel(21),
    },
    smh: {
      height: heightPixel(24),
      width: widthPixel(24),
    },
    xl: {
      height: heightPixel(32),
      width: widthPixel(32),
    },
    xxl: {
      height: heightPixel(36),
      width: widthPixel(36),
    },
    xxxl: {
      height: heightPixel(48),
      width: widthPixel(48),
    },
  },

  spacing: {
    xxs: heightPixel(2),
    xs: heightPixel(4),
    x: heightPixel(6),
    s: heightPixel(8),
    sm: heightPixel(10),
    sml: heightPixel(12),
    m: heightPixel(16),
    md: heightPixel(18),
    l: heightPixel(20),
    ll: heightPixel(24),
    xl: heightPixel(32),
    xxl: heightPixel(64),
    xxxl: heightPixel(128),
    none: 0,
  },

  textVariants: {
    buttonLabel: {
      fontFamily: 'Moderat-Medium',
      fontSize: fontPixel(15),
      fontWeight: '500',
      letterSpacing: 0.3,
      lineHeight: fontPixel(21),
    },
    medium10: {
      fontFamily: 'Moderat-Medium',
      fontSize: fontPixel(10),
      fontWeight: '500',
      letterSpacing: 0.3,
      lineHeight: fontPixel(14),
    },
    medium16: {
      fontFamily: 'Moderat-Medium',
      fontSize: fontPixel(16),
      fontWeight: '500',
      letterSpacing: 0.3,
      lineHeight: fontPixel(22.4),
    },
    medium32: {
      fontFamily: 'Moderat-Medium',
      fontSize: fontPixel(32),
      fontWeight: '500',
      letterSpacing: 0.3,
      lineHeight: fontPixel(50.4),
    },
    headerText: {
      fontFamily: 'FugazOne-Regular',
      fontSize: fontPixel(32),
      fontWeight: '500',
      letterSpacing: 0.3,
      lineHeight: fontPixel(50.4),
    },
    subHeaderText: {
      fontFamily: 'Archivo',
      fontSize: fontPixel(14),
      fontWeight: '400',
      letterSpacing: 0.3,
      lineHeight: fontPixel(19.6),
    },
    toastText: {
      fontFamily: 'Archivo',
      fontSize: fontPixel(16),
      fontWeight: '500',
      letterSpacing: 0.3,
      lineHeight: fontPixel(21),
    },
    regular10: {
      fontFamily: 'Moderat-Regular',
      fontSize: fontPixel(10),
      fontWeight: '400',
      letterSpacing: 0.3,
      lineHeight: fontPixel(14),
    },
    regular12: {
      fontFamily: 'Moderat-Regular',
      fontSize: fontPixel(12),
      fontWeight: '400',
      letterSpacing: 0.3,
      lineHeight: fontPixel(16.8),
    },
    regular14: {
      fontFamily: 'Moderat-Regular',
      fontSize: fontPixel(14),
      fontWeight: '400',
      letterSpacing: 0.3,
      lineHeight: fontPixel(19.6),
    },
    regular16: {
      fontFamily: 'Moderat-Regular',
      fontSize: fontPixel(16),
      fontWeight: '400',
      letterSpacing: 0.3,
      lineHeight: fontPixel(22.4),
    },
    regular24: {
      fontFamily: 'Moderat-Regular',
      fontSize: fontPixel(24),
      letterSpacing: 0.3,
      lineHeight: fontPixel(26.96),
    },
    regular32: {
      fontFamily: 'Moderat-Regular',
      fontSize: fontPixel(32),
      fontWeight: '400',
      letterSpacing: 0.3,
      lineHeight: fontPixel(15.4),
    },
    textInputLabel: {
      fontFamily: 'Moderat-Medium',
      fontSize: fontPixel(12),
      fontWeight: '500',
      letterSpacing: 0.3,
      lineHeight: fontPixel(16),
    },
  },
});

export default theme;
