import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';
const ChevronRight = (props: SvgProps) => (
  <Svg viewBox="-6 0 24 24" {...props}>
    <Path d="M8.59 16.58 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.42Z" />
  </Svg>
);
export default ChevronRight;
