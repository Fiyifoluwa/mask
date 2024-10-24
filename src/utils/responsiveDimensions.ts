import {Dimensions, PixelRatio} from 'react-native';

const {height: screenHeight, width: screenWidth} = Dimensions.get('window');

const frame = {height: 844, width: 390}; // iPhone 13

const widthBaseScale = screenWidth / frame.width;
const heightBaseScale = screenHeight / frame.height;

function normalize(size: number, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// for width  pixel
const widthPixel = (size: number) => normalize(size, 'width');
// for height  pixel
const heightPixel = (size: number) => normalize(size, 'height');
// for font  pixel
const fontPixel = (size: number) => heightPixel(size);

const pixelRatio = PixelRatio.get();

const dpPixel = (pixelValue: number) => pixelValue / pixelRatio;

export {dpPixel, fontPixel, heightPixel, screenHeight, screenWidth, widthPixel};
