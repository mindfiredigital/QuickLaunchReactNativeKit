# Assets

The `./src/assets` directory serves as a centralized repository for static resources like fonts, images, and SVG icons within the project. These assets play a crucial role in enhancing the application's user interface and design elements. By maintaining a structured organization of these resources, it ensures efficient management and seamless integration into the software development lifecycle.

## Icons

The `./src/assets/icons` directory houses static images in various formats such as .jpg, .png, and more.

To access these images, they are exported via the `iconRegistry` object as shown below:

```typescript
export const iconRegistry = {
  logo: require("./appLogo.png"),
  // Add new image paths here...
};
```

These icons can be utilized through the [Icons](../components/Icon.md) component.

## SVGs

Using SVG (Scalable Vector Graphics) over JPG or PNG in your application offers several benefits:

1. **Scalability**: SVGs are resolution-independent, meaning they can be scaled to any size without losing quality. This makes them ideal for responsive web design and ensures crisp graphics on devices with different resolutions.

2. **Smaller File Sizes**: SVG files are typically smaller in size compared to JPG or PNG, resulting in faster load times for your application. This is particularly advantageous for web applications where reducing page load times is crucial for user experience and performance.

### Using SVGR to Generate React Components from SVG Files

[SVGR](https://react-svgr.com/) is a tool that converts SVG files into React components, making it easier to use SVGs within your React applications.

#### How to Use SVGR

##### Method 1: Command Line Interface (CLI)

1. Add your SVG file(s) to the `src/assets/svgs` folder.
2. Open your terminal or command prompt.
3. Run the following command:

   ```bash
   npx @svgr/cli -- <path-of-svg-file>
   ```

   Replace `<path-of-svg-file>` with the path to your SVG file.

4. Copy the generated React component code and create a new file in your project.

##### Method 2: Online Converter

1. Visit [SVGR Playground](https://react-svgr.com/playground/?native=true&typescript=true).
2. Upload your SVG file using the "Choose File" button.
3. Customize any options if needed.
4. Click on the "Generate React Component" button.
5. Copy the generated React component code and create a new file in your project.

#### Configuration Options

SVGR provides various configuration options to customize the output. Below is an example `svgr.config.js` file with some common options:

Feel free to customize the configuration based on your project requirements.

For more information and advanced usage, refer to the [SVGR documentation](https://react-svgr.com/docs/cli/).

By leveraging SVGR, you can easily incorporate SVG files into your React applications and enjoy the benefits of scalability and customization offered by React components.

## Fonts

This README contains a list of supported font families along with instructions on how to add or update font assets.

[Fonts README](../theme/Typography.md)
