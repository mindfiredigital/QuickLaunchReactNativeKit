import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */
const EditImage = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path d="m22.7 14.3-1 1-2-2 1-1c.1-.1.2-.2.4-.2.1 0 .3.1.4.2l1.3 1.3c.1.2.1.5-.1.7M13 19.9V22h2.1l6.1-6.1-2-2-6.2 6M21 5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h6v-1.9l1.1-1.1H5l3.5-4.5 2.5 3 3.5-4.5 1.6 2.1 4.9-5V5Z" />
  </Svg>
);
export default EditImage;
