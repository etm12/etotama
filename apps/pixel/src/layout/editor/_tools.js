import { taggedSum } from 'daggy';

const Tool = taggedSum(
  'Tool',
  {
    Brush: [],
    Erase: [],
    Eyedropper: [],
  },
);

export default Tool;
