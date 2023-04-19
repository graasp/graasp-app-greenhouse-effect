import i18n from './i18n';

const TOUR_STEPS = [
  {
    target: '.epoch',
    content: i18n.t(
      'By default, the simulation begins in equilibrium on Earth in the year 2020, but you can select a different period or planet',
    ),
    disableBeacon: true,
  },
  {
    target: '.radiation-mode',
    content: i18n.t(
      'You can display radiation flows as either Waves (qualitative) or Fluxes (quantitative)',
    ),
  },
  {
    target: '.controls',
    content: i18n.t('Click Play to begin the simulation'),
  },
  {
    target: '.settings',
    content: i18n.t(
      "To observe how the Earth's climate is impacted by different physical conditions, pause the simulation, alter one or more variables, then click Play again",
    ),
  },
  {
    target: '.fluxes',
    content: i18n.t(
      'When variables are changed in Fluxes mode, radiation arrows on the canvas will begin blinking, indicating that their energies are projected to change',
    ),
  },
];

const updateTranslations = () => {
  TOUR_STEPS.forEach((step, index) => {
    const translatedStep = i18n.t(step.content);
    TOUR_STEPS[index].content = translatedStep;
  });
};

if (i18n.isInitialized) {
  updateTranslations();
}

i18n.on('languageChanged', () => {
  updateTranslations();
});

export default TOUR_STEPS;
