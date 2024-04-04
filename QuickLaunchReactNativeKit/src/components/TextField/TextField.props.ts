import {StyleProp, TextInputProps, TextStyle, ViewStyle} from 'react-native';
import {TextProps, IconTypes} from 'components';

export interface TextFieldProps extends Omit<TextInputProps, 'ref'> {
  /**
   * Textfield preset: "default" or "password"
   */
  preset?: 'default' | 'password';

  /**
   * A style modifier for different input states.
   */
  status?: 'error' | 'disabled';

  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps['text'];

  /**
   * The placeholder text to display if not using `placeholderTx`.
   */
  placeholder?: TextProps['text'];

  /**
   * Optional input style override.
   */
  style?: StyleProp<TextStyle>;

  /**
   * Style overrides for the container.
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Style overrides for the input wrapper.
   */
  inputWrapperStyle?: StyleProp<ViewStyle>;

  /**
   * Style overrides for the outer wrapper.
   */
  outerWrapper?: StyleProp<ViewStyle>;

  /**
   * Style overrides for the error text.
   */
  errorStyle?: StyleProp<TextStyle>;

  /**
   * The type of icon to be displayed on the right side of the text input.
   */
  rightIcon?: IconTypes | React.JSX.Element;

  /**
   * The type of icon to be displayed on the left side of the text input.
   */
  leftIcon?: IconTypes | React.JSX.Element;

  /**
   * Determines whether the text input is editable or not.
   */
  editable?: boolean;

  /**
   * Callback function to be executed when the right icon is pressed.
   */
  onPressRightIcon?: () => void;

  /**
   * Callback function to be executed when the left icon is pressed.
   */
  onPressLeftIcon?: () => void;

  /**
   * The size of the left icon.
   */
  leftIconSize?: number;

  /**
   * The size of the right icon.
   */
  rightIconSize?: number;

  /**
   * Display error string for textinput
   */
  error?: string;
}
