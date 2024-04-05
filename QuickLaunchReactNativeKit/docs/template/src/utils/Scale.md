# Scale

The Scale file (`./src/utils/scale.ts`) provides utility functions for scaling dimensions in React Native applications. It includes functions to scale sizes proportionally based on the dimensions of the device's window, allowing for consistent UI across various screen sizes. It scale device UI based on device orientation and device type like phone or tablets.

## Usage

1. **Adjust Guideline Base Sizes**:

   The guideline base sizes are adjusted for Phone, iPad and Android tablets based on the device's OS and dimensions.

   ```javascript
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
   ```

2. **Scaling Functions**:

   - **Scale**: Proportionally scales a given size based on the short dimension.
   - **VerticalScale**: Proportionally scales a given size based on the long dimension.
   - **ModerateScale**: Moderately scales a given size with an optional scaling factor.
   - **ModerateVerticalScale**: Moderately scales a given size vertically with an optional scaling factor.

3. **Aliases**:
   Aliases are provided for easier usage of the scaling functions:
   - **s**: Alias for the 'scale' function.
   - **vs**: Alias for the 'verticalScale' function.
   - **ms**: Alias for the 'moderateScale' function.
   - **mvs**: Alias for the 'moderateVerticalScale' function.

## Example

```javascript
// Usage examples
import {StyleSheet, ViewStyle, ImageStyle} from 'react-native';
import {vs, s, spacing} from 'utils';

const styles = StyleSheet.create({
    headerWrapper: {
      paddingHorizontal: s(spacing.md),
      marginBottom: vs(spacing.lg),
    } as ViewStyle,
    image: {
      width: vs(140),
      height: vs(140),
      resizeMode: 'cover',
    } as ImageStyle,
  });
```
