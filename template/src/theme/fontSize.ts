import {vs} from '../utils';

/**
 * Font sizes for different text styles.
 * Adjust these values as needed for consistent typography.
 */
export const fontSize = {
  /** Font size for Heading 1 */
  h1: vs(30),
  /** Font size for Heading 2 */
  h2: vs(24),
  /** Font size for Heading 3 */
  h3: vs(18),
  /** Font size for Heading 4 */
  h4: vs(15),
  /** Font size for Heading 5 */
  h5: vs(12),
  /** Font size for Heading 6 */
  h6: vs(10),
  /** Font size for Body text */
  body: vs(14),
  /** Font size for Body text variant 1 */
  body1: vs(12),
  /** Font size for Body text variant 2 */
  body2: vs(10),
};

/**
 * Ideally line height value should be between 1.2 to 1.6
 * @default - 1.4
 */
const lineHeightFactor = 1.4;

/**
 * Line heights for different text styles based on the font sizes.
 * Adjust these values as needed for consistent spacing.
 */
export const lineHeight = {
  /** Line height for Heading 1 */
  [fontSize.h1]: Math.round(vs(fontSize.h1 * lineHeightFactor)),
  /** Line height for Heading 2 */
  [fontSize.h2]: Math.round(vs(fontSize.h2 * lineHeightFactor)),
  /** Line height for Heading 3 */
  [fontSize.h3]: Math.round(vs(fontSize.h3 * lineHeightFactor)),
  /** Line height for Heading 4 */
  [fontSize.h4]: Math.round(vs(fontSize.h4 * lineHeightFactor)),
  /** Line height for Heading 5 */
  [fontSize.h5]: Math.round(vs(fontSize.h5 * lineHeightFactor)),
  /** Line height for Heading 6 */
  [fontSize.h6]: Math.round(vs(fontSize.h6 * lineHeightFactor)),
  /** Line height for Body text */
  [fontSize.body]: Math.round(vs(fontSize.body * lineHeightFactor)),
  /** Line height for Body text variant 1 */
  [fontSize.body1]: Math.round(vs(fontSize.body1 * lineHeightFactor)),
  /** Line height for Body text variant 2 */
  [fontSize.body2]: Math.round(vs(fontSize.body2 * lineHeightFactor)),
};
