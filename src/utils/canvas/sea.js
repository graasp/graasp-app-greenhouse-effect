/* eslint-disable import/prefer-default-export */
export const generateSeaPoints = (seaBaseWidth, seaHeight, seaIndent) => {
  // first point of line is (0, 0), i.e. start drawing shape at (0, 0) offset from shape origin (specified in x/y props)
  const seaPointZero = [0, 0];

  // note that remaining points are offsets from origin
  // only three points are required - the 'closed' prop in the component closes the shape
  const seaPointOne = [seaBaseWidth, 0];
  const seaPointTwo = [seaBaseWidth + seaIndent, seaHeight];
  const seaPointThree = [0, seaHeight];

  return [...seaPointZero, ...seaPointOne, ...seaPointTwo, ...seaPointThree];
};
