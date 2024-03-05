#!/usr/bin/env node
const BLUE = '\x1B[34m'
const GREEN = '\x1B[32m';
const NC = '\x1B[0m'

// Importing necessary packages
import { spawnSync } from 'child_process'
import readlineSync from 'readline-sync'
import fs from 'fs'
import chalk from 'chalk';
import inquirer from 'inquirer';

// Step 1: Install necessary npm packages
console.log(`${BLUE}1. Installing necessary npm packages...${NC}`);
const npmInstallProcess = spawnSync('npm', ['install'], { stdio: 'inherit' });

if (npmInstallProcess.status !== 0) {
    console.error(`${NC}Error: npm install failed. Exiting.`);
    process.exit(1);
}

// Step 2: Ask the user if they want to set custom theme values
const wantsCustomTheme = readlineSync.keyInYNStrict(`\n${BLUE}2. Do you want to set custom theme values?${NC}`);
let selectedTheme = 'theme2';

// Default colors for custom theme
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

// Template for generating custom theme
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

// Function to get color hint based on color name
const getColorHint = (colorName) => {
    switch (colorName) {
        case 'primary':
            return 'The primary color of the app used to tint various elements.';
        // ... (similar cases for other color names)
        default:
            return '';
    }
};

// Function to check if hex color is valid
const isValidHexColor = (color) => {
    const hexColorRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
    return hexColorRegex.test(color);
}

// Function to prompt user for color input
const promptForColor = (colorName, defaultValue = '') => {
    if (!colorName.includes('Dark')) console.log(`\n${GREEN}Hint: ${NC}${getColorHint(colorName)}`);
    let userInput = readlineSync.question(
        `- Enter value for ${colorName} (default: ${defaultValue ? `${defaultValue} ${chalk.bgHex(defaultValue)('  ')}` : 'N/A'}): `
    );

    if (!userInput.trim()) {
        userInput = defaultValue;
    }

    while (!isValidHexColor(userInput)) {
        console.error('Invalid color! Please enter a valid hex color code.');
        userInput = readlineSync.question(
            `- Enter value for ${colorName} (default: ${defaultValue ? `${defaultValue} ${chalk.bgHex(defaultValue)('  ')}` : 'N/A'}): `
        );
        if (!userInput.trim()) {
            userInput = defaultValue;
        }
    }

    return userInput;
};

// Function to generate custom theme based on user input
const generateCustomTheme = () => {
    fs.writeFileSync('src/theme/themes/customTheme.ts', themeTemplate);
    updateSettingsTheme()
    updateThemeIndex()
    updateTheme()
}

// Function to update theme settings in the settings file
const updateSettingsTheme = () => {
    const filePathToSettings = 'settings.ts';
    fs.readFile(filePathToSettings, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const updatedData = data.replace(/theme: '[^']*'/, `theme: '${wantsCustomTheme ? 'customTheme' : selectedTheme}'`);
        fs.writeFile(filePathToSettings, updatedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return;
            }
        });
    });
}

// Function to update theme index file
const updateThemeIndex = () => {
    const filePathToIndex = 'src/theme/themes/index.ts';
    fs.readFile(filePathToIndex, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const updatedDataWithExport = data.replace(
            /export \* from '\.\/theme3';/,
            "export * from './theme3';\nexport * from './customTheme';"
        );

        fs.writeFile(filePathToIndex, updatedDataWithExport, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return;
            }
        });
    });
}

// Function to update theme in the main theme file
const updateTheme = () => {
    const filePathToTheme = 'src/theme/theme.ts';

    fs.readFile(filePathToTheme, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const updatedData = data.replace(
            /import {theme1, theme2, theme3} from '\.\/themes';/,
            "import {theme1, theme2, theme3, customTheme} from './themes';"
        );

        const updatedDataWithCustomTheme = updatedData.replace(
            /const theme = {[^}]*}/,
            `const theme = {\n  theme1,\n  theme2,\n  theme3,\n  customTheme,\n}`
        );

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
    console.log(`\n${BLUE}3. Press enter or return to fill default color.${NC}`);
    console.log(`${chalk.green('Hint:')} Consider both light and dark mode versions for optimal theme design`)
    for (const color in colors) {
        colors[color] = promptForColor(color, colors[color]);
    }
    generateCustomTheme()
    console.log(`${GREEN}\u2713 Theme file generated successfully!${NC}`);
} else {
    // If the user doesn't want a custom theme, provide options
    console.log(`\n${BLUE}3. Choose a theme from the options:${NC}`);
    console.log(`${chalk.green('Hint:')} Refer to README.md file for preset themes.`)
    const themeOptions = ['theme1', 'theme2', 'theme3'];
    const themeSelectionPrompt = {
        type: 'list',
        name: 'selectedTheme',
        message: 'Select:',
        choices: themeOptions,
    };

    const themeAnswer = await inquirer.prompt(themeSelectionPrompt);
    selectedTheme = themeAnswer.selectedTheme;
    updateSettingsTheme()
    console.log(`${GREEN}\u2713 ${selectedTheme} will be used.${NC}\nTo update theme navigate to settings.ts and choose theme from preset list!${NC}`);
}
