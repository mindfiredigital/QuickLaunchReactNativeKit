import * as React from 'react';
import Svg, {Rect, G, Path, Defs, ClipPath} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';
const SvgGoogleDark = (props: SvgProps) => (
  <Svg width={40} height={40} fill="none" viewBox="0 0 40 40" {...props}>
    <Rect width={39} height={39} x={0.5} y={0.5} fill="#131314" rx={3.5} />
    <G clipPath="url(#a)">
      <Path
        fill="#4285F4"
        d="M29.6 20.227c0-.709-.064-1.39-.182-2.045H20v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35"
      />
      <Path
        fill="#34A853"
        d="M20 30c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123h-3.341v2.59A10 10 0 0 0 20 30"
      />
      <Path
        fill="#FBBC04"
        d="M14.405 21.9c-.2-.6-.314-1.24-.314-1.9s.114-1.3.314-1.9v-2.59h-3.341A10 10 0 0 0 10 20c0 1.614.386 3.14 1.064 4.49z"
      />
      <Path
        fill="#E94235"
        d="M20 13.977c1.468 0 2.786.505 3.823 1.496l2.868-2.869C24.959 10.992 22.695 10 20 10c-3.91 0-7.29 2.24-8.936 5.51l3.34 2.59c.787-2.364 2.991-4.123 5.596-4.123"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M10 10h20v20H10z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgGoogleDark;
