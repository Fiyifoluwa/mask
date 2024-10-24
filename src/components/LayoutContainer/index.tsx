import React, {type ReactNode} from 'react';
import {Dimensions, type TextStyle} from 'react-native';

import Box, {SafeAreaBox} from '../Box';
import {type PressableProps} from '../Pressable';
import {PaletteType} from '../../theme/palette';
import Header from '../Header';
import Button from '../Button';

const {width} = Dimensions.get('window');

interface LayoutType {
  children: ReactNode;
  backgroundColor?: PaletteType;
  hasBottomButton?: boolean;
  onBottomButtonPress?: () => unknown;
  bottomButtonBgColor?: PaletteType;
  bottomButtonLabel?: string;
  loaderTitle?: string;
  loaderDescription?: string;
  hasExtraBottomButton?: boolean;
  onExtraBottomButtonPress?: () => unknown;
  extraBottomButtonBgColor?: PaletteType;
  extraBottomButtonLabel?: string;
  header?: boolean;
  headerTextStyle?: TextStyle;
  showMessageIcon?: boolean;
  showProgressIndicator?: boolean;
  numberOfScreens?: number;
  progress?: number;
  hasComponentAboveButton?: boolean;
  componentAboveButton?: ReactNode;
  hasComponentBelowButton?: boolean;
  componentBelowButton?: ReactNode;
  extraBottomButtonlabelTextColor?: PaletteType;
  bottomButtonLabelTextColor?: PaletteType;
  onBackButtonPress?: () => void;
  hasHeaderText?: boolean;
  hasHeaderBalanceComponent?: boolean;
  headerText?: string;
  hideBackButton?: boolean;
  activityLoading?: boolean;
  useScreenLoader?: boolean;
  showBottomInset?: boolean;
  hideRightButton?: boolean;
  rightHeaderComponent?: ReactNode;
  subHeader?: string;
  disabled?: boolean;
  bottomButtonContainerProps?: PressableProps;
  showBackButton?: boolean;
}
const LayoutContainer = (Props: LayoutType) => {
  const {
    children,
    backgroundColor,
    hasBottomButton,
    onBottomButtonPress = () => {},
    bottomButtonBgColor = 'bottomButtonBgColor',
    bottomButtonLabel = 'Continue',
    hasExtraBottomButton,
    onExtraBottomButtonPress = () => {},
    extraBottomButtonBgColor = 'black',
    extraBottomButtonLabel,
    hasComponentAboveButton = false,
    hasComponentBelowButton = false,
    componentAboveButton,
    componentBelowButton,
    extraBottomButtonlabelTextColor = 'white',
    bottomButtonLabelTextColor = 'bottomButtonLabelTextColor',
    headerText = '',
    showBottomInset = true,
    subHeader,
    bottomButtonContainerProps,
    disabled,
    showBackButton,
  } = Props;

  return (
    <>
      <SafeAreaBox
        backgroundColor={backgroundColor}
        showBottomInset={showBottomInset}>
        {Boolean(headerText) && (
          <Header
            headerText={headerText}
            subHeader={subHeader}
            showBackButton={showBackButton}
          />
        )}
        <Box flex={1} position="relative">
          <Box flex={1} position="relative">
            {children}
            <Box
              alignItems="center"
              bottom={5}
              left={0}
              marginHorizontal="none"
              position="absolute"
              right={0}>
              {(hasComponentAboveButton ?? false) && (
                <Box marginBottom="s">{componentAboveButton}</Box>
              )}
              {(hasExtraBottomButton ?? false) && (
                <Button
                  backgroundColor={extraBottomButtonBgColor}
                  containerProps={{
                    borderRadius: 'm',
                    width: width * 0.9,
                  }}
                  disabled={disabled}
                  label={extraBottomButtonLabel}
                  labelProps={{
                    color: extraBottomButtonlabelTextColor,
                  }}
                  onPress={onExtraBottomButtonPress}
                />
              )}
              {(hasBottomButton ?? false) && (
                <Button
                  backgroundColor={bottomButtonBgColor}
                  containerProps={{
                    borderRadius: 'm',
                    marginTop: 'sml',
                    width: width * 0.9,
                    ...bottomButtonContainerProps,
                  }}
                  disabled={disabled}
                  label={bottomButtonLabel}
                  labelProps={{
                    color: bottomButtonLabelTextColor,
                  }}
                  onPress={onBottomButtonPress}
                />
              )}
              {(hasComponentBelowButton ?? false) && (
                <Box marginBottom="s">{componentBelowButton}</Box>
              )}
            </Box>
          </Box>
        </Box>
      </SafeAreaBox>
    </>
  );
};

export default LayoutContainer;
