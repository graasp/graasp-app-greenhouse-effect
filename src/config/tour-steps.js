import i18n from './i18n';

const TOUR_STEPS = [
  {
    target: '.epoch',
    content: i18n.t(
      'By default, the simulation starts on Earth in 2020, but you can select a different period or planet',
    ),
    disableBeacon: true,
  },
  {
    target: '.radiation-mode',
    content: i18n.t(
      'Display radiation as either Waves (qualitative) or Fluxes arrows (quantitative)',
    ),
  },
  {
    target: '.controls',
    content: i18n.t('Click Play to begin the simulation'),
  },
  {
    target: '.settings',
    content: i18n.t(
      "To change Earth's climate, pause the simulation, alter one or more variables, then click Play again",
    ),
  },
  {
    target: '.fluxes',
    content: i18n.t(
      'When variables are changed in Fluxes mode, arrows will begin blinking, indicating that these fluxes are projected to change',
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
