# Typography

This module provides a centralized location for managing font families used throughout the application. It includes a list of font families supported by the app along with instructions on how to add or update font assets.

## Font Families

The following font families are supported:

- **Light**: Poppins-Light (Font weight: 300)
- **Regular**: Poppins-Regular (Font weight: 400)
- **Medium**: Poppins-Medium (Font weight: 500)
- **SemiBold**: Poppins-SemiBold (Font weight: 600)
- **Bold**: Poppins-Bold (Font weight: 700)

## How to Add/Update Font Assets

To add or update font assets, follow these steps:

1. Place the font files in the `assets/fonts` folder of your project.
2. Run the following command in the project folder:

   ```terminal
   npx react-native-asset
   ```

3. Update the font names in the `theme/typography` file as needed.
