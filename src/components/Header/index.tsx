import React, {createRef, RefObject} from 'react';

import Pressable from '../Pressable';
import Text from '../Text';
import {type NavigationContainerRef} from '@react-navigation/native';
import {AppStackParamList} from '../../navigation/types';
import Box from '../Box';
import Row from '../Row';
import Icon from '../Icon';
// import type {SvgIconPackTypeExtended} from '@/assets/icons/svgIconPack';

export const navigationRef: RefObject<
  // @ts-ignore
  NavigationContainerRef<AppStackParamList>
> = createRef();

const Header = ({
  headerText,
  subHeader,
  showBackButton = true,
}: {
  headerText: string;
  subHeader?: string;
  showBackButton?: boolean;
}) => {
  const goBack = () => {
    navigationRef.current?.goBack();
  };

  return (
    <Box paddingHorizontal="m">
      {showBackButton && (
        <Row centerAlign spaceBetween marginBottom={'s'} bg="transparent">
          <Box width={'30%'}>
            {showBackButton && (
              <Pressable
                onPress={goBack}
                bg="ash200"
                alignSelf="flex-start"
                padding="sm"
                borderRadius="m">
                <Icon name={'Close'} size="m" />
              </Pressable>
            )}
          </Box>

          <Box
            alignItems="center"
            flexDirection="row"
            justifyContent="flex-end"
            width="30%"
          />
        </Row>
      )}
      <Box>
        <Text color="primary" variant="headerText">
          {headerText.toUpperCase()}
        </Text>
        {subHeader && (
          <Text color="greyBlack" variant="subHeaderText">
            {subHeader}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Header;
