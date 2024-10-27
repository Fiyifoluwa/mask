import React, {useRef} from 'react';
import {Platform, TextInput, TextStyle, ViewStyle} from 'react-native';
import MaskInput, {createNumberMask} from 'react-native-mask-input';
import {useFormikContext} from 'formik';
import Text from '../Text';
import KeyboardManager from 'react-native-keyboard-manager';
import Pressable from '../Pressable';
import Box from '../Box';
import {heightPixel} from '../../utils/responsiveDimensions';
import {InputProps} from './Input.props';
import {useTheme} from '../../theme';

type FormValues = Record<string, any>;

const CONTAINER: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  height: heightPixel(48),
  paddingHorizontal: heightPixel(10),
  width: '100%',
};

const defaultStyle: TextStyle = {
  fontFamily: 'Moderat-Regular',
  paddingBottom: 2,
  paddingVertical: 0,
  textAlign: 'left',
  includeFontPadding: false,
  textAlignVertical: 'center',
};

const CurrencyInput = ({
  name,
  label,
  onBlur,
  inputStyle: inputStyleOverride,
  placeholder = label,
  altLabel,
  hideError,
  hideLabel,
  outerContainerStyle,
  onInputPress,
  disabled,
  editable = !disabled,
  error: otherErrors,
  leftComponent,
  ...rest
}: InputProps) => {
  const textInputRef = useRef<TextInput>(null);
  const {colors} = useTheme();
  const {values, errors, touched, handleBlur, setFieldValue} =
    useFormikContext<FormValues>();

  const fieldError = (errors[name] as string | undefined) ?? otherErrors;
  const fieldTouched = touched[name];
  const isInvalid =
    (fieldTouched && fieldError !== undefined) || otherErrors !== undefined;

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

  const INPUT: TextStyle = {
    backgroundColor: colors.transparent,
    color: colors?.mainText,
    fontSize: heightPixel(14),
    height: heightPixel(55),
    width: '100%',
    textAlignVertical: 'center',
    paddingVertical: 0,
    margin: 0,
  };

  const containerStyle: ViewStyle = {
    ...CONTAINER,
    borderColor: !editable
      ? colors.fainterGrey
      : isInvalid
      ? colors.danger
      : colors.ash200,
    borderRadius: heightPixel(8),
    borderWidth: 0.5,
    backgroundColor: !editable ? colors.fainterGrey : colors.transparent,
    justifyContent: 'flex-start',
  };

  let inputStyle: TextStyle = INPUT;
  inputStyle = inputStyleOverride
    ? {...inputStyle, ...inputStyleOverride}
    : inputStyle;

  const focusTextInput = () => textInputRef?.current?.focus();

  return (
    <Pressable
      marginTop={!hideLabel ? 'md' : 'm'}
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
            </Text>
            <Text color="greyBlack" variant="regular12">
              {altLabel}
            </Text>
          </Box>
        </>
      )}
      <Box style={containerStyle}>
        {leftComponent && leftComponent}
        <MaskInput
          autoCorrect={false}
          keyboardType="number-pad"
          onBlur={onBlur ?? handleBlur(name)}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholderTextColor}
          ref={textInputRef}
          editable={!disabled}
          style={[inputStyle, defaultStyle]}
          value={values[name]}
          onChangeText={(_, unmasked) => {
            setFieldValue(name, unmasked);
          }}
          mask={createNumberMask({
            prefix: ['', '', ''],
            separator: '.',
            delimiter: ',',
            precision: 2,
          })}
          testID={name}
          accessibilityLabel={name}
          {...rest}
        />
      </Box>
      {!hideError && fieldTouched && fieldError && (
        <Text color="red" numberOfLines={1} variant="regular12">
          {fieldError}
        </Text>
      )}
    </Pressable>
  );
};

export default CurrencyInput;
