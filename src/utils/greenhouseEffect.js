export const computeGreenhouseEffect = ({ carbonDioxide, methane }) => {
  const A = 0.0525;
  const a = 0.147;
  const B = 0.0234;
  const b = 0.225;
  const C = 0.23;
  return A * carbonDioxide ** a + B * methane ** b + C;
};

export const kelvinToCelsius = (k) => k - 273.15;
