declare module '*.png' {
  const content: number;
  export default content;
}

declare module '*.svg' {
  import {FC} from 'react';
  import {SvgProps} from 'react-native-svg';

  const content: FC<SvgProps>;
  export default content;
}
