import React from 'react';
import {InventoryProvider} from './src/context/InventoryContext';
import Navigation from './src/navigation';
import {ThemeProvider} from '@shopify/restyle';
import {theme} from './src/theme';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/utils/config';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <InventoryProvider>
        <Navigation />
      </InventoryProvider>
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}
