import React, {createRef, RefObject} from 'react';

import Pressable from '../Pressable';
import Text from '../Text';
import {type NavigationContainerRef} from '@react-navigation/native';
import {AppStackParamList} from '../../navigation/types';
import Box from '../Box';
import Row from '../Row';
// import type {SvgIconPackTypeExtended} from '@/assets/icons/svgIconPack';

export const navigationRef: RefObject<
  // @ts-ignore
  NavigationContainerRef<AppStackParamList>
> = createRef();

const Header = ({
  headerText,
  subHeader,
}: {
  headerText: string;
  subHeader?: string;
}) => {
  const goBack = () => {
    navigationRef.current?.goBack();
  };

  return (
    <>
      <Row
        centerAlign
        spaceBetween
        marginBottom={'md'}
        paddingHorizontal="sm"
        bg="transparent">
        <Box width={'20%'}>
          <Pressable onPress={goBack} bg="transparent">
            <Text>x</Text>
            {/* <SvgIcon name={closeIconName || 'CloseXIcon'} size="smh" /> */}
          </Pressable>
        </Box>

        <Box
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          width={'60%'}>
          {headerText ? (
            <Box alignItems="center" flex={1} justifyContent="center">
              <Text color="mainText" variant="medium16">
                {headerText}
              </Text>
              {subHeader && (
                <Text color="grey200" textAlign="center" variant="regular12">
                  {subHeader}
                </Text>
              )}
            </Box>
          ) : (
            <Box />
          )}
        </Box>

        <Box
          alignItems="center"
          flexDirection="row"
          justifyContent="flex-end"
          width="20%"
        />
      </Row>
    </>
  );
};

export default Header;
