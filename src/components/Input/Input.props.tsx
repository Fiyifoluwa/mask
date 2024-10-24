import {
  type GestureResponderEvent,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import {ReactNode} from 'react';
import {SvgIconPackType} from '../../assets/svg';

export interface InputProps extends TextInputProps {
  /**
   * Name prop for formik
   */
  name: string;

  /**
   * Label on the right
   */
  altLabel?: string | number;

  /**
   * The label text if no labelTx is provided.
   */
  label?: string;

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: TextStyle | TextStyle[];

  /**
   * Callback for the input ref
   */
  forwardedRef?: (ref: any) => void;

  /**
   * Should the text-field be pre-padded for errors?
   */
  padFieldForError?: boolean;

  /**
   * Optionally hide field label
   */
  hideLabel?: boolean;

  /**
   * Renders a view to the right side of the label
   */
  rightLabel?: ReactNode;

  /**
   * Disable text from being entered here. Not to be confused with editable which won't necessarily affect our styling
   */
  disabled?: boolean;

  /**
   * Optional prop to add regex validation of keystrokes
   *  - adding extra context - Every `expectedRegex` is only for the specific keystroke or paste in.
   * It works such that every single character is passed through the regex validator and invalid characters are omitted
   */
  expectedRegex?: RegExp;

  /**
   * Optional for TextInputWithoutFormik
   */
  error?: string | null;

  leftPressableIcon?: SvgIconPackType;

  leftPressableAction?: () => void;

  hideError?: boolean;

  outerContainerStyle?: ViewStyle;

  addedContainerStyle?: ViewStyle;

  onInputPress?: ((event: GestureResponderEvent) => void) | null | undefined;

  waitThenFocus?: boolean;
  leftComponent?: ReactNode;
}
