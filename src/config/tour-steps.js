import i18n from './i18n';

const TOUR_STEPS = [
  {
    target: '.epoch',
    content: i18n.t(
      'By default, the simulation starts at equilibrium on Earth in 1850, but you can select a different period or planet',
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
    target: '.play-button',
    content: i18n.t('Click Play to begin the simulation'),
  },
  {
    target: '.settings',
    content: i18n.t(
      "To change Earth's climate, pause the simulation and alter one or more variables",
    ),
  },
  {
    target: '.fluxes',
    content: i18n.t(
      'Blinking flux arrows indicate that the Earth is not at equilibrium and that these fluxes are projected to change',
    ),
  },
  {
    target: '.play-button',
    content: i18n.t(
      'Click Play again to see how the temperature and the fluxes evolve',
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
