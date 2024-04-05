import {Dimensions, Platform} from 'react-native';

// Retrieve the width and height of the window
const {width, height} = Dimensions.get('window');

// Determine the short and long dimensions based on the window size
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

// Default guideline sizes based on iPhone 15 mobile device
let guidelineBaseWidth = 393;
let guidelineBaseHeight = 852;

// Adjust guideline base sizes for iPad and Android tablets
if (Platform.OS === 'ios' && shortDimension > 600) {
  // iPad
  guidelineBaseWidth = 768;
  guidelineBaseHeight = 1024;
} else if (Platform.OS === 'android' && shortDimension > 600) {
  // Android tablets
  guidelineBaseWidth = 600;
  guidelineBaseHeight = 960;
}

/**
 * Scale a given size proportionally based on the short dimension.
 *
 * @param {number} size - The size to be scaled.
 * @returns {number} - Scaled size.
 */
export const scale = (size: number): number =>
  Math.round((shortDimension / guidelineBaseWidth) * size);

/**
 * Scale a given size proportionally based on the long dimension.
 *
 * @param {number} size - The size to be scaled.
 * @returns {number} - Scaled size.
 */
export const verticalScale = (size: number): number =>
  Math.round((longDimension / guidelineBaseHeight) * size);

/**
 * Moderately scale a given size with an optional scaling factor.
 *
 * @param {number} size - The size to be scaled.
 * @param {number} factor - Optional scaling factor. Default is 0.5.
 * @returns {number} - Moderately scaled size.
 */
export const moderateScale = (size: number, factor: number = 0.5): number =>
  Math.round(size + (scale(size) - size) * factor);

/**
 * Moderately scale a given size vertically with an optional scaling factor.
 *
 * @param {number} size - The size to be scaled.
 * @param {number} factor - Optional scaling factor. Default is 0.5.
 * @returns {number} - Moderately scaled size.
 */
export const moderateVerticalScale = (
  size: number,
  factor: number = 0.5,
): number => Math.round(size + (verticalScale(size) - size) * factor);

// Aliases for easier usage
/**
 * Alias for the 'scale' function.
 * Used to proportionally scale a given size based on the short dimension.
 * @param {number} size - The size to be scaled.
 * @returns {number} - Scaled size.
 */
export const s = scale;

/**
 * Alias for the 'verticalScale' function.
 * Used to proportionally scale a given size based on the long dimension.
 * @param {number} size - The size to be scaled.
 * @returns {number} - Scaled size.
 */
export const vs = verticalScale;

/**
 * Alias for the 'moderateScale' function.
 * Used to moderately scale a given size with an optional scaling factor.
 * @param {number} size - The size to be scaled.
 * @param {number} factor - Optional scaling factor. Default is 0.5.
 * @returns {number} - Moderately scaled size.
 */
export const ms = moderateScale;

/**
 * Alias for the 'moderateVerticalScale' function.
 * Used to moderately scale a given size vertically with an optional scaling factor.
 * @param {number} size - The size to be scaled.
 * @param {number} factor - Optional scaling factor. Default is 0.5.
 * @returns {number} - Moderately scaled size.
 */
export const mvs = moderateVerticalScale;
