import React from 'react';
import Box from '../components/Box';
import Text from '../components/Text';
import {ToastConfigParams} from 'react-native-toast-message';

interface ToastProps {
  text: string;
}

export const toastConfig = {
  successToast: ({text1, props}: Partial<ToastConfigParams<ToastProps>>) => (
    <Box px="xxl" py="sml" bg="malachite100" mt="ll" borderRadius="m">
      {text1 && <Text color="white">{text1}</Text>}
      <Text color="malachite800" textAlign="center" variant="toastText">
        {props?.text ?? ''}
      </Text>
    </Box>
  ),
  infoToast: ({text1, props}: Partial<ToastConfigParams<ToastProps>>) => (
    <Box px="xxl" py="sml" bg="ochre100" mt="ll" borderRadius="m">
      {text1 && <Text color="white">{text1}</Text>}
      <Text color="ochre800" textAlign="center" variant="toastText">
        {props?.text ?? ''}
      </Text>
    </Box>
  ),
  dangerToast: ({text1, props}: Partial<ToastConfigParams<ToastProps>>) => (
    <Box px="xxl" py="sml" bg="cardinal50" mt="ll" borderRadius="m">
      {text1 && <Text color="white">{text1}</Text>}
      <Text color="red" textAlign="center" variant="toastText">
        {props?.text ?? ''}
      </Text>
    </Box>
  ),
};
