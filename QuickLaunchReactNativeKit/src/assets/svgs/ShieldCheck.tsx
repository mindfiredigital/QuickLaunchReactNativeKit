import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';
const SvgShieldCheck = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="m10 17-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9m-6-8L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5z" />
  </Svg>
);
export default SvgShieldCheck;
