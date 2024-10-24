import React from 'react';
import {InventoryProvider} from './src/context/InventoryContext';
import Navigation from './src/navigation';

export default function App() {
  return (
    <InventoryProvider>
      <Navigation />
    </InventoryProvider>
  );
}
