# The Greenhouse Effect in a Global System: A Physics Simulation

This simulation brings together concepts from previous simulations ([Radiating Charge](https://github.com/graasp/graasp-app-radiating-charge), [Thermal Radiation](https://github.com/graasp/graasp-app-thermal-radiation), and [Radiation Absorption](https://github.com/graasp/graasp-app-radiation-absorption)) to illustrate how a planet's temperature responds to changes in variables such as its atmospheric concentration of greenhouse gases.

![Greenhouse Effect](https://github.com/graasp/graasp-app-greenhouse-effect/assets/19311953/b9a15b7e-b397-48c5-88df-928de047726d)

The simulation begins on Earth at equilibrium in a pre-industrial era approximated to be the year 1850. Upon clicking play in the default _Waves_ mode, users observe visible light emanating from the sun, and track it as it passes through the planet. Encountering cloud cover, some of this light is reflected back to the atmosphere, while some of it passes through and hits the Earth, which absorbs a portion of it. Users then observe the Earth re-emit this absorbed energy as infrared radiation, some of which escapes the planet, and some of which is reflected back toward it.

Upon toggling to _Fluxes_ mode, users are presented with an equivalent view, in this case detailing the energy, in W/m^2, flowing through the system. In both _Waves_ and _Fluxes_ modes, users can change variables such as the extent of ice and cloud cover and the concentration of greenhouse gases on Earth. How do such changes impact the system and its equilibrium temperature? While changing a variable, users can see the impact of their change on the immediately affected energy flows. Following a change, the application remains paused—without displaying the new equilibrium temperature resulting from the change—to allow users to predict how the system will adjust. After clicking play again, users observe the system gradually move toward its new equilibrium, allowing them to confirm whether their hypothesis was correct.

In _Fluxes_ mode, the simulation also allows users to see the impact of two 'feedbacks', processes that reinforce (positive feedback) or diminish (negative feedback) climate effects. The feedbacks available for investigation in the simulation are those due to water vapor and ice cover. Under water vapor feedback, for example, an increase in the Earth's temperature leads to an increase in water vapor, which—water being a greenhouse gas—in turn leads to a further increase in temperature. Once again, upon toggling a feedback on, the simulation remains paused to allow users to make a prediction on the impact they expect the feedback to have on the system and its equilibrium temperature.

For comparitive purposes, the simulation also shows equilibrium temperature on two other planets (Mars and Venus).

## Try the application!

A live deployment of the application can be accessed [here](https://apps.graasp.org/f61d6916-be33-4c63-b697-2c7b09a7b8e5/latest/index.html?lang=en). Please submit any issues you identify to the application's [GitHub repository](https://github.com/graasp/graasp-app-greenhouse-effect/issues).

## Run and modify the application locally

- Once you clone the repository, run `yarn` or `npm install` to install its dependencies.
- In the project directory, make sure to create an `.env.local` file and to add `"REACT_APP_BASE="` to the top of this file.
- Run `yarn start` (or `npm start`) to start the application. It should automatically open in your browser at `localhost:3000`. You can also access it in development mode on `http://localhost:3000/?appInstanceId=6156e70ab253020033364411&spaceId=5b56e70ab253020033364411&dev=true`
- The simulation's main components are located in `src/components/lab` (canvas components) and `src/components/common` (side menu and controls). It uses [React](https://github.com/facebook/react), [React-Redux](https://github.com/reduxjs/react-redux), and [React-Konva](https://github.com/konvajs/react-konva).
