# Colors

In our app's codebase, we have a file called `colors.ts` located in the `src/theme` directory. This file serves as a palette for all the colors used throughout our application. The idea behind this palette is to have a simple list of colors with semantic names, making it easier to maintain consistency in our design.

The colors in our palette are named in a way that reflects their purpose rather than their specific appearance. For instance, `neutral100` represents a neutral color, but it doesn't imply any specific meaning. However, if you find yourself using a color repeatedly for a specific purpose (like background, border, or text), it's a good idea to create a semantic color for it.

Let's say you're using the color `lightBlack` for all your text components. Instead of directly referencing `lightBlack` throughout your code, we can define a semantic color in our theme file. We'll call it `text` and set it to `lightBlack`. Then, whenever you need to style text components, you can simply use `colors.text` instead of `colors.lightBlack`.

Here's an example of how you can use this semantic color in your components:

```tsx
import React from "react";
import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";

const ThemedText = () => {
  const { colors } = useTheme();

  return <Text style={{ color: colors.text }}>Hello World!</Text>;
};
```

By following this approach, we make our code more readable, maintainable, and consistent across the application.
