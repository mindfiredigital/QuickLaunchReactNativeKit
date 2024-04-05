/**
 * How to generate React component from svg file using @svgr/cli:
 * @link https://react-svgr.com/docs/cli/
 * Method 1:
 * Add svg file to src/assets/svgs folder
 * run command: "npx @svgr/cli -- <path-of-svg-file>"
 * Copy the content and create file
 * Method 2:
 * Go to https://react-svgr.com/playground/?native=true&typescript=true and convert it online to React component
 */
module.exports = {
  native: true, // Tells SVGR to generate React Native compatible code
  typescript: true, // Tells SVGR to generate React Native Typescript compatible code
  svgoConfig: {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            // disable a default plugin
            removeViewBox: false,

            // customize the params of a default plugin
            inlineStyles: {
              onlyMatchedOnce: false,
            },
          },
        },
      },
      'removeXMLNS',
    ],
  },
};
