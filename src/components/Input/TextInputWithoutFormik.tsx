import React, {useRef} from 'react';
import {ViewStyle, Platform, TextStyle, TextInput} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import Text from '../Text';
import {InputProps} from './Input.props';
import Pressable from '../Pressable';
import Box from '../Box';
import {useTheme} from '../../theme';
import {heightPixel} from '../../utils/responsiveDimensions';

const TextInputWithoutFormik: React.FC<
  InputProps & {
    required?: boolean;
    ignoreKeyboardSettings?: boolean;
  }
> = ({
  value,
  label,
  leftComponent,
  onBlur,
  inputStyle: inputStyleOverride,
  placeholder = label,
  onChangeText,
  altLabel,
  addedContainerStyle,
  hideError,
  hideLabel,
  outerContainerStyle,
  onInputPress,
  required,
  disabled,
  editable = !disabled,
  error,
  ...rest
}) => {
  const {colors} = useTheme();
  const textInputRef = useRef<TextInput>(null);

  const INPUT: TextStyle = {
    backgroundColor: colors.transparent,
    color: colors?.mainText,
    fontSize: heightPixel(14),
    height: heightPixel(55),
    width: '100%',
    fontFamily: 'Archivo',
  };

  const containerStyle: ViewStyle = {
    alignItems: 'center',
    flexDirection: 'row',
    height: heightPixel(48),
    paddingLeft: heightPixel(10),
    width: '100%',
    borderColor: disabled
      ? colors.fainterGrey
      : error
      ? colors.danger
      : colors.ash200,
    borderRadius: heightPixel(8),
    // borderWidth: 0.5,
    backgroundColor: disabled ? colors.fainterGrey : colors.transparent,
    ...addedContainerStyle,
  };

  let inputStyle: TextStyle = INPUT;
  inputStyle = inputStyleOverride
    ? {...inputStyle, ...inputStyleOverride}
    : inputStyle;

  if (Platform.OS === 'ios') {
    KeyboardManager.setEnable(true);
    KeyboardManager.setKeyboardDistanceFromTextField(heightPixel(50));
    KeyboardManager.setLayoutIfNeededOnUpdate(true);
    KeyboardManager.setEnableAutoToolbar(true);
    KeyboardManager.setToolbarDoneBarButtonItemText('Done');
    KeyboardManager.setToolbarManageBehaviourBy('subviews');
    KeyboardManager.setToolbarPreviousNextButtonEnable(true);
    KeyboardManager.setShouldShowToolbarPlaceholder(true);
    KeyboardManager.setOverrideKeyboardAppearance(false);
    KeyboardManager.setShouldResignOnTouchOutside(true);
    KeyboardManager.setShouldPlayInputClicks(true);
  }

  const focusTextInput = () => textInputRef?.current?.focus();

  return (
    <Pressable
      marginTop={!hideLabel ? 'md' : 'none'}
      onPress={onInputPress ?? focusTextInput}
      style={outerContainerStyle}>
      {!hideLabel && (
        <>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            marginBottom="s">
            <Text color="mainText" variant="textInputLabel">
              {label}{' '}
              {required && (
                <Text color="red" variant="textInputLabel">
                  *
                </Text>
              )}
            </Text>
            <Text color="greyBlack" variant="regular12">
              {altLabel}
            </Text>
          </Box>
        </>
      )}
      <Box style={containerStyle}>
        {leftComponent && leftComponent}
        <TextInput
          autoCorrect={false}
          onBlur={onBlur}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholderTextColor}
          ref={textInputRef}
          editable={editable}
          style={inputStyle}
          value={value}
          testID={label ?? placeholder}
          accessibilityLabel={label ?? placeholder}
          {...rest}
        />
      </Box>
      {!hideError && error && (
        <Text color="red" numberOfLines={1} variant="regular12">
          {error}
        </Text>
      )}
    </Pressable>
  );
};

export default TextInputWithoutFormik;
