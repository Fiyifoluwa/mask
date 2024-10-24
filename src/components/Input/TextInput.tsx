import {useFormikContext} from 'formik';
import React, {useRef} from 'react';
import {
  Platform,
  TextInput as RNTextInput,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';

import Box from '../Box';
import Pressable from '../Pressable';
import Text from '../Text';
import {InputProps} from './Input.props';
import Row from '../Row';
import {heightPixel} from '../../utils/responsiveDimensions';
import {useTheme} from '../../theme';

const CONTAINER: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  height: heightPixel(45),
  paddingLeft: heightPixel(10),
  width: '100%',
};

type FormValues = Record<string, any>;

const TextInput: React.FC<InputProps> = ({
  name,
  label,
  leftComponent,
  onBlur,
  placeholder = label,
  keyboardType,
  onChangeText,
  maxLength = 75,
  altLabel,
  hideError,
  hideLabel,
  onInputPress,
  disabled,
  editable = !disabled,
  expectedRegex,
  style,
  addedContainerStyle,
  rightComponent,
  ...rest
}) => {
  const {colors} = useTheme();
  const {values, errors, touched, handleChange, handleBlur} =
    useFormikContext<FormValues>();
  const textInputRef = useRef<RNTextInput>(null);
  const fieldError = errors[name] as string | undefined;

  const fieldTouched = touched[name];
  const isInvalid = fieldTouched && fieldError !== undefined;

  const INPUT: TextStyle = {
    backgroundColor: colors.transparent,
    color: colors?.mainText,
    fontSize: heightPixel(14),
    height: rest.multiline ? heightPixel(100) : heightPixel(55),
    width: '90%',
    fontFamily: 'Moderat-Regular',
  };

  const containerStyle: ViewStyle = {
    ...CONTAINER,
    height: rest.multiline ? heightPixel(100) : CONTAINER.height,
    borderColor: !editable
      ? colors.fainterGrey
      : isInvalid
      ? colors.danger
      : colors.ash200,
    borderRadius: heightPixel(8),
    borderWidth: 0.5,
    backgroundColor: disabled ? colors.fainterGrey : colors.transparent,
    paddingTop: rest.multiline ? heightPixel(10) : 'auto',
    ...addedContainerStyle,
  };

  const finalInputStyle: TextStyle = {
    ...INPUT,
    ...(style as TextStyle),
  };

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
      marginTop={!hideLabel ? 'md' : 'm'}
      onPress={onInputPress ?? focusTextInput}>
      {!hideLabel && (
        <Row centerAlign spaceBetween>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            marginBottom="s">
            <Text color="mainText" variant="textInputLabel">
              {label}{' '}
            </Text>
            <Text color="greyBlack" variant="regular12">
              {altLabel}
            </Text>
          </Box>
        </Row>
      )}
      <Box style={containerStyle}>
        {leftComponent && leftComponent}
        <RNTextInput
          autoCorrect={false}
          autoCapitalize={rest?.autoCapitalize || 'sentences'}
          keyboardType={keyboardType || 'default'}
          maxLength={maxLength}
          onBlur={onBlur ?? handleBlur(name)}
          onChangeText={text => {
            if (text.length === 0) {
              onChangeText ? onChangeText(text) : handleChange(name)(text);
            } else {
              if (expectedRegex) {
                const characters = text.split('');
                const validCharacters = characters.filter(char =>
                  expectedRegex.test(char),
                );
                const newText = validCharacters.join('');

                onChangeText
                  ? onChangeText(newText)
                  : handleChange(name)(newText);
              } else {
                onChangeText ? onChangeText(text) : handleChange(name)(text);
              }
            }
          }}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholderTextColor}
          ref={textInputRef}
          editable={editable}
          style={finalInputStyle}
          value={values[name]}
          testID={name}
          accessibilityLabel={name}
          {...rest}
        />
        {rightComponent && rightComponent}
      </Box>
      {!hideError && fieldTouched && fieldError && (
        <Text color="red" numberOfLines={1} variant="regular12">
          {fieldError}
        </Text>
      )}
    </Pressable>
  );
};

export default TextInput;
