import Close from './close.svg';
import Search from './search.svg';
import Plus from './plus.svg';
import Warning from './warning.svg';
import PlusOne from './plus-one.svg';
import MinusOne from './minus-one.svg';

const svgIconPack = {
  Close,
  Search,
  Plus,
  Warning,
  PlusOne,
  MinusOne,
};

export {svgIconPack};
export type SvgIconPackType = keyof typeof svgIconPack;
