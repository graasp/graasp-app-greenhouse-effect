/* ------CONSTANTS FOR WIDTH, HEIGHT, COLOR OF CANVAS BACKGROUND ELEMENTS ------ */
// (1) In general, all dimensions in this file are stated as percentages (values between 0 and 1)
// (2) Background element dimensions are stated as a percentage of stage/canvas dimensions
// (3) Dimensions of elements within an area of the canvas are stated as a percentage of that area
// (e.g. the dimensions of the road are stated as a percentage of the ground)
// (4) Dimensions of details within an element are stated as a percentage of that element
// (e.g. the dimensions of the factory chimney are stated as a percentage of the factory's width)
// In general, the idea is to allow for stating dimensiosn as intuitively as possible
// (e.g. it would not be intuitive to state the chimney's width as a percentage of the whole canvas)
// (6) In addition to dimensions, most elements also have positioning variables
// These are also stated as percentages relative to the area they're within
export const ATMOSPHERE = {
  height: 0.2,
  width: 1,
  colorRange: [0, '#303030', 1, '#444444'],
};
export const SKY = {
  height: 0.65,
  width: 1,
  colorRange: {
    earth: [0, '#A4C8EA', 1, '#C8DEF2'],
    venus: [0, '#737373', 1, '#e5e5e5'],
    mars: [0, '#8D8D8D', 1, '#E6CF6B'],
  },
  colorRangePaused: {
    earth: [0, '#c1cdd9', 1, '#d3dbe3'],
    venus: [0, '#8D8D8D', 1, '#f2f2f2'],
    mars: [0, '#A6A6A6', 1, '#FFE884'],
  },
};
export const SEA = {
  height: 0.15,
  width: 0.4,
  indent: 0.06,
  colorRange: [0, '#406bca', 1, '#6688D4'],
  colorRangePaused: [0, '#6f8cc9', 1, '#92a6d4'],
  colorRangeFrozen: [0, '#F5F5F5', 1, '#F5F5F5'],
};
export const GROUND = {
  height: 0.15,
  width: { earth: 0.6, nonEarth: 1 },
  colorRange: {
    earth: [0, '#2E5A1C', 1, '#386D22'],
    venus: [0, '#AF854B', 1, '#795C34'],
    mars: [0, '#87270E', 1, '#A05006'],
  },
  colorRangePaused: {
    earth: [0, '#2E5A1C', 1, '#428028'],
    venus: [0, '#E2B87E', 1, '#93764E'],
    mars: [0, '#A04027', 1, '#B9691F'],
  },
};
