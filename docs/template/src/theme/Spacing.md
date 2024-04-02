# Spacing

The Spacing Module provides predefined spacing values for margins, paddings, and other whitespace used throughout the application.

## Spacing Values

The following spacing values are available:

- **xxx-small (xxxs)**: 2 units
- **xx-small (xxs)**: 4 units
- **x-small (xs)**: 8 units
- **small (sm)**: 12 units
- **medium (md)**: 16 units
- **large (lg)**: 24 units
- **x-large (xl)**: 32 units
- **xx-large (xxl)**: 48 units
- **xxx-large (xxxl)**: 64 units

These values can be used to ensure consistent spacing and layout across different components and screens in the application.

## Usage

You can use these spacing values by referencing their keys, for example:

```typescript
import { spacing } from "theme";

<View style={{ marginHorizantal: spacing.md }} />;
```
