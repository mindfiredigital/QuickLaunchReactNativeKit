import React, {useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
  StatusBar,
  StatusBarProps,
  StyleSheet,
} from 'react-native';
import {useScrollToTop, useTheme} from '@react-navigation/native';
import {Colors} from '../theme';
import {
  ExtendedEdge,
  useSafeAreaInsetsStyle,
} from '../utils/useSafeAreaInsetsStyle';

interface BaseScreenProps {
  /**
   * Children components.
   */
  children?: React.ReactNode;
  /**
   * Content to be rendered at the bottom of the screen.
   */
  bottomContent?: React.ReactNode;
  /**
   * Style for the outer content container useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Style for the inner content container useful for padding & margin.
   */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[];
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * Status bar setting. Defaults to dark.
   */
  statusBarStyle?: 'default' | 'dark-content' | 'light-content';
  /**
   * By how much should we offset the keyboard? Defaults to 0.
   */
  keyboardOffset?: number;
  /**
   * Pass any additional props directly to the StatusBar component.
   */
  StatusBarProps?: StatusBarProps;
  /**
   * Pass any additional props directly to the KeyboardAvoidingView component.
   */
  KeyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
}

interface FixedScreenProps extends BaseScreenProps {
  preset?: 'fixed';
}
interface ScrollScreenProps extends BaseScreenProps {
  preset?: 'scroll';
  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: 'handled' | 'always' | 'never';
  /**
   * Pass any additional props directly to the ScrollView component.
   */
  scrollViewProps?: ScrollViewProps;
}

interface AutoScreenProps extends Omit<ScrollScreenProps, 'preset'> {
  preset?: 'auto';
  /**
   * Threshold to trigger the automatic disabling/enabling of scroll ability.
   * Defaults to `{ percent: 0.92 }`.
   */
  scrollEnabledToggleThreshold?: {percent?: number; point?: number};
}

export type ScreenProps =
  | ScrollScreenProps
  | FixedScreenProps
  | AutoScreenProps;

const isIos = Platform.OS === 'ios';

type ScreenPreset = 'fixed' | 'scroll' | 'auto';

/**
 * @param {ScreenPreset?} preset - The preset to check.
 * @returns {boolean} - Whether the preset is non-scrolling.
 */
function isNonScrolling(preset?: ScreenPreset) {
  return !preset || preset === 'fixed';
}

/**
 * Custom hook that handles the automatic enabling/disabling of scroll ability based on the content size and screen size.
 * @param {UseAutoPresetProps} props - The props for the `useAutoPreset` hook.
 * @returns {{boolean, Function, Function}} - The scroll state, and the `onContentSizeChange` and `onLayout` functions.
 */
function useAutoPreset(props: AutoScreenProps): {
  scrollEnabled: boolean;
  onContentSizeChange: (w: number, h: number) => void;
  onLayout: (e: LayoutChangeEvent) => void;
} {
  const {preset, scrollEnabledToggleThreshold} = props;
  const {percent = 0.92, point = 0} = scrollEnabledToggleThreshold || {};

  const scrollViewHeight = useRef<null | number>(null);
  const scrollViewContentHeight = useRef<null | number>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  function updateScrollState() {
    if (
      scrollViewHeight.current === null ||
      scrollViewContentHeight.current === null
    )
      return;

    // check whether content fits the screen then toggle scroll state according to it
    const contentFitsScreen = (function () {
      if (point) {
        return (
          scrollViewContentHeight.current < scrollViewHeight.current - point
        );
      } else {
        return (
          scrollViewContentHeight.current < scrollViewHeight.current * percent
        );
      }
    })();

    // content is less than the size of the screen, so we can disable scrolling
    if (scrollEnabled && contentFitsScreen) setScrollEnabled(false);

    // content is greater than the size of the screen, so let's enable scrolling
    if (!scrollEnabled && !contentFitsScreen) setScrollEnabled(true);
  }

  /**
   * @param {number} w - The width of the content.
   * @param {number} h - The height of the content.
   */
  function onContentSizeChange(w: number, h: number) {
    // update scroll-view content height
    scrollViewContentHeight.current = h;
    updateScrollState();
  }

  /**
   * @param {LayoutChangeEvent} e = The layout change event.
   */
  function onLayout(e: LayoutChangeEvent) {
    const {height} = e.nativeEvent.layout;
    // update scroll-view  height
    scrollViewHeight.current = height;
    updateScrollState();
  }

  // update scroll state on every render
  if (preset === 'auto') updateScrollState();

  return {
    scrollEnabled: preset === 'auto' ? scrollEnabled : true,
    onContentSizeChange,
    onLayout,
  };
}

/**
 * @param {ScreenProps} props - The props for the `ScreenWithoutScrolling` component.
 * @returns {JSX.Element} - The rendered `ScreenWithoutScrolling` component.
 */
function ScreenWithoutScrolling(props: ScreenProps) {
  const {style, contentContainerStyle, children} = props;
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={[styles.outerStyle, style]}>
      <View style={[styles.innerStyle, contentContainerStyle]}>{children}</View>
    </View>
  );
}

/**
 * @param {ScreenProps} props - The props for the `ScreenWithScrolling` component.
 * @returns {JSX.Element} - The rendered `ScreenWithScrolling` component.
 */
function ScreenWithScrolling(props: ScreenProps) {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const {
    children,
    keyboardShouldPersistTaps = 'handled',
    contentContainerStyle,
    scrollViewProps,
    style,
  } = props as ScrollScreenProps;

  const ref = useRef<ScrollView>(null);

  const {scrollEnabled, onContentSizeChange, onLayout} = useAutoPreset(
    props as AutoScreenProps,
  );

  // Add native behavior of pressing the active tab to scroll to the top of the content
  // More info at: https://reactnavigation.org/docs/use-scroll-to-top/
  useScrollToTop(ref);

  return (
    <ScrollView
      {...{keyboardShouldPersistTaps, scrollEnabled, ref}}
      {...scrollViewProps}
      onLayout={e => {
        onLayout(e);
        scrollViewProps?.onLayout?.(e);
      }}
      onContentSizeChange={(w: number, h: number) => {
        onContentSizeChange(w, h);
        scrollViewProps?.onContentSizeChange?.(w, h);
      }}
      style={[styles.outerStyle, scrollViewProps?.style, style]}
      contentContainerStyle={[
        styles.innerStyle,
        scrollViewProps?.contentContainerStyle,
        contentContainerStyle,
      ]}>
      {children}
    </ScrollView>
  );
}

/**
 * Represents a screen component that provides a consistent layout and behavior for different screen presets.
 * The `Screen` component can be used with different presets such as "fixed", "scroll", or "auto".
 * It handles safe area insets, status bar settings, keyboard avoiding behavior, and scrollability based on the preset.
 * @param {ScreenProps} props - The props for the `Screen` component.
 * @returns {JSX.Element} The rendered `Screen` component.
 */
export function Screen(props: ScreenProps): JSX.Element {
  const {colors, dark} = useTheme();
  const styles = makeStyles(colors);
  const {
    backgroundColor = colors.background,
    KeyboardAvoidingViewProps,
    keyboardOffset = 0,
    safeAreaEdges,
    StatusBarProps = {backgroundColor: colors.background},
    statusBarStyle = dark ? 'light-content' : 'dark-content',
    bottomContent,
  } = props;

  const containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  return (
    <View style={[styles.containerStyle, {backgroundColor}, containerInsets]}>
      <StatusBar barStyle={statusBarStyle} {...StatusBarProps} />

      <KeyboardAvoidingView
        behavior={isIos ? 'padding' : 'height'}
        keyboardVerticalOffset={keyboardOffset}
        {...KeyboardAvoidingViewProps}
        style={[
          styles.keyboardAvoidingViewStyle,
          KeyboardAvoidingViewProps?.style,
        ]}>
        {isNonScrolling(props.preset) ? (
          <ScreenWithoutScrolling {...props} />
        ) : (
          <ScreenWithScrolling {...props} />
        )}
      </KeyboardAvoidingView>
      {bottomContent}
    </View>
  );
}

const makeStyles = (colors: Colors) =>
  StyleSheet.create({
    containerStyle: {
      flex: 1,
      height: '100%',
      width: '100%',
    },
    keyboardAvoidingViewStyle: {
      flex: 1,
    },
    outerStyle: {
      flex: 1,
      height: '100%',
      width: '100%',
    },
    innerStyle: {
      justifyContent: 'flex-start',
      alignItems: 'stretch',
    },
  });
