#!/usr/bin/env node
BLUE = '\x1B[34m'
NC = '\x1B[0m'

// Add npm install for required packages
console.log(`${BLUE}1. Installing necessary npm packages...${NC}`);
var twirlTimer = (function () {
    var P = ["\\", "|", "/", "-"];
    var x = 0;
    return setInterval(function () {
        process.stdout.write("\r" + P[x++]);
        x = x % P.length;
    }, 250);
})();
const { execSync } = require('child_process');
execSync('npm install');
clearInterval(twirlTimer)

const readlineSync = require('readline-sync');
const fs = require('fs');

// Ask the user if they want to set custom theme values
const wantsCustomTheme = readlineSync.keyInYNStrict(`${BLUE}2. Do you want to set custom theme values?${NC}`);

const colors = {
    primary: '#F00001',
    primaryDark: '#F00001',
    text: '#333333',
    textDark: '#E6E6E6',
    background: '#FFFFFF',
    backgroundDark: '#1E1E1E',
    backgroundSecondary: '#3C3C3C',
    backgroundSecondaryDark: '#3C3C3C',
    tertiary: '#000000',
    tertiaryDark: '#D2D2D2',
    btnTextPrimary: '#FFFFFF',
    btnTextPrimaryDark: '#FEFFFF',
    btnTextSecondary: '#C8C8C8',
    btnTextSecondaryDark: '#C8C8C8',
    border: '#707070',
    borderDark: '#FEFFFF',
    placeholderText: '#808080',
    placeholderTextDark: '#808080',
    card: '#3C3C3C',
    cardDark: '#3C3C3C',
};

const colorsANSI = {
    '#F00001': '\x1B[38;2;240;0;1m', // primary
    '#333333': '\x1B[38;2;51;51;51m', // text
    '#E6E6E6': '\x1B[38;2;230;230;230m', // textDark
    '#FFFFFF': '\x1B[38;2;255;255;255m', // background
    '#1E1E1E': '\x1B[38;2;30;30;30m', // backgroundDark
    '#3C3C3C': '\x1B[38;2;60;60;60m', // backgroundSecondary, backgroundSecondaryDark, card, cardDark
    '#000000': '\x1B[38;2;0;0;0m', // tertiary
    '#D2D2D2': '\x1B[38;2;210;210;210m', // tertiaryDark
    '#FEFFFF': '\x1B[38;2;254;255;255m', // btnTextPrimaryDark, borderDark
    '#C8C8C8': '\x1B[38;2;200;200;200m', // btnTextSecondary, btnTextSecondaryDark
    '#808080': '\x1B[38;2;128;128;128m', // placeholderText, placeholderTextDark
};

const themeTemplate = `
import { ThemeWithMode } from "../theme.types";

export const customTheme: ThemeWithMode = {
  light: {
    primary: '${colors.primary}',
    text: '${colors.text}',
    background: '${colors.background}',
    backgroundSecondary: '${colors.backgroundSecondary}',
    tertiary: '${colors.tertiary}',
    btnTextPrimary: '${colors.btnTextPrimary}',
    btnTextSecondary: '${colors.btnTextSecondary}',
    border: '${colors.border}',
    placeholderText: '${colors.placeholderText}',
    card: '${colors.card}',
  },
  dark: {
    primary: '${colors.primaryDark}',
    text: '${colors.textDark}',
    background: '${colors.backgroundDark}',
    backgroundSecondary: '${colors.backgroundSecondaryDark}',
    tertiary: '${colors.tertiaryDark}',
    btnTextPrimary: '${colors.btnTextPrimaryDark}',
    btnTextSecondary: '${colors.btnTextSecondaryDark}',
    border: '${colors.borderDark}',
    placeholderText: '${colors.placeholderTextDark}',
    card: '${colors.cardDark}',
  },
};
`;

/**
 * Check if hex color is valid
 * @param {*} color 
 */
function isValidHexColor(color) {
    const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    return hexColorRegex.test(color);
}

function promptForColor(colorName, defaultValue = '') {
    let userInput = readlineSync.question(`Enter value for ${colorName} (default: ${colorsANSI[defaultValue]}${defaultValue}${NC}): `);

    if (!userInput.trim()) {
        userInput = defaultValue;
    }

    while (!isValidHexColor(userInput)) {
        console.error('Invalid color! Please enter a valid hex color code.');
        userInput = readlineSync.question(`Enter value for ${colorName} (default: ${defaultValue}): `);
    }

    return userInput;
}

const generateCustomTheme = () => {
    // Create a TypeScript file with the generated content
    fs.writeFileSync('src/theme/themes/customTheme.ts', themeTemplate);

    // Path to the settings.ts file
    const filePathToSettings = 'settings.ts';

    // Read the content of the file
    fs.readFile(filePathToSettings, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // Update the theme value to 'custom'
        const updatedData = data.replace(/theme: '[^']*'/, "theme: 'customTheme'");

        // Write the updated content back to the file
        fs.writeFile(filePathToSettings, updatedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return;
            }
        });
    });
}

const updateThemeIndex = () => {
    // Path to the settings.ts file
    const filePathToIndex = 'src/theme/themes/index.ts';

    // Read the content of the file
    fs.readFile(filePathToIndex, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // Add export statement for customTheme
        const updatedDataWithExport = data.replace(
            /export \* from '\.\/theme3';/,
            "export * from './theme3';\nexport * from './customTheme';"
        );

        // Write the updated content back to the file
        fs.writeFile(filePathToIndex, updatedDataWithExport, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return;
            }
        });
    });
}

const updateTheme = () => {
    const filePathToTheme = 'src/theme/theme.ts';

    fs.readFile(filePathToTheme, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // Add import statement for customTheme
        const updatedData = data.replace(
            /import {theme1, theme2, theme3} from '\.\/themes';/,
            "import {theme1, theme2, theme3, customTheme} from './themes';"
        );

        // Add customTheme to the theme object
        const updatedDataWithCustomTheme = updatedData.replace(
            /const theme = {[^}]*}/,
            `const theme = {\n  theme1,\n  theme2,\n  theme3,\n  customTheme,\n}`
        );

        // Write the updated content back to the file
        fs.writeFile(filePathToTheme, updatedDataWithCustomTheme, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return;
            }
        });
    });
}

// If the user wants a custom theme, get user input for each color
if (wantsCustomTheme) {
    console.log(`${BLUE}3. Press enter or return to fill default color.${NC}`);
    for (const color in colors) {
        colors[color] = promptForColor(color, colors[color]);
    }
    generateCustomTheme()
    updateThemeIndex()
    updateTheme()
    console.log(`${BLUE}\u2713 Theme file generated successfully!${NC}`);
} else {
    console.log(`${BLUE}\u2713 Default theme2 will be used.\nTo update theme navigate to settings.ts and choose theme from preset list!${NC}`);
}
