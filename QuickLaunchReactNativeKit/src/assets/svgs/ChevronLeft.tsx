import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';
const SvgChevronLeft = (props: SvgProps) => (
  <Svg viewBox="6 0 12 24" {...props}>
    <Path d="M15.41 16.58 10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
  </Svg>
);
export default SvgChevronLeft;
