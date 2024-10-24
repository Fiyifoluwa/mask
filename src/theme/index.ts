import {useTheme as useRestyleTheme} from '@shopify/restyle';

import theme from './theme';

type Theme = typeof theme;

export const useTheme = () => useRestyleTheme<Theme>();
export {theme, type Theme};
