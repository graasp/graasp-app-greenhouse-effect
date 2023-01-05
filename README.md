# The Greenhouse Effect in a Global System: A Physics Simulation

This simulation brings together concepts from previous simulations ([Radiating Charge](https://github.com/graasp/graasp-app-radiating-charge), [Thermal Radiation](https://github.com/graasp/graasp-app-thermal-radiation), and [Radiation Absorption](https://github.com/graasp/graasp-app-radiation-absorption)) to illustrate how a planet's equilibrium temperature is impacted by variables such as the concentration of greenhouse gases and the extent of cloud and ice cover on it.

![Greenhouse Effect](https://user-images.githubusercontent.com/19311953/210350701-1bfa4646-e762-456c-a59e-278d7239db22.gif)

The simulation begins on earth at its equilibrium in 2020, with an average temperature of approximately 15°C. Upon clicking play in the default _Waves_ mode, users observe visible light emanating from the sun, and track it as it passes through the planet. Encountering cloud cover, some of this light is reflected back to the atmosphere, while some of it passes through and hits the earth, which absorbs a portion of it. Users then observe the earth re-emit this absorbed energy as infrared radiation, some of which escapes the planet, and some of which is reflected back toward it.

Upon toggling to _Fluxes_ mode, users are presented with an equivalent view, in this case detailing the energy, in W/m^2, flowing through the system. In _Fluxes_ mode, users can begin changing variables such as the extent of ice and cloud cover and the concentration of greenhouse gases on the planet. How do such changes impact the system and its equilibrium temperature? Upon changing a variable, users can see the impact of their change on the immediately affected energy flows, but the application remains paused—without displaying the new equilibrium temperature resulting from the change—to allow users to predict how the system will adjust and what the resulting equilibrium temperature will be. After clicking play again, users observe the system gradually move toward its new equilibrium, allowing them to confirm whether their hypothesis was correct.

The simulation also allows users to see the impact of two 'feedbacks', processes that reinforce (positive feedback) or diminish (negative feedback) climate effects. The feedbacks available for investigation in the simulation are those due to water vapor and ice cover. After running the simulation and adjusting one or more variables to reach a new equilibrium temperature, users can toggle one (or both) of the feedbacks on. Under water vapor feedback, for example, an increase in the earth's temperature leads to an increase in water vapor, which—water being a greenhouse gas—in turn leads to a further increase in temperature. Once again, upon toggling a feedback on, the simulation remains paused to allow users to make a prediction on the impact they expect the feedback to have on the system and its equilibrium temperature.

For comparitive purposes, the simulation also shows equilibrium on earth in two other epochs (the most recent ice age and the year 1900), and on two other planets (Mars and Venus).

## Try the application!

A live deployment of the application can be accessed [here](https://apps.dev.graasp.eu/5acb589d0d5d9464081c2d46/60cb485c6c96441087372175/latest/index.html). Please submit any issues you identify to the application's [GitHub repository](https://github.com/graasp/graasp-app-greenhouse-effect/issues).

## Run and modify the application locally

- Once you clone the repository, run `yarn` or `npm install` to install its dependencies.
- In the project directory, make sure to create an `.env.local` file and to add `"REACT_APP_BASE="` to the top of this file.
- Run `yarn start` (or `npm start`) to start the application. It should automatically open in your browser at `localhost:3000`. You can also access it in development mode on `http://localhost:3000/?appInstanceId=6156e70ab253020033364411&spaceId=5b56e70ab253020033364411&dev=true`
- The simulation's main components are located in `src/components/lab` (canvas components) and `src/components/common` (side menu and controls). It uses [React](https://github.com/facebook/react), [React-Redux](https://github.com/reduxjs/react-redux), and [React-Konva](https://github.com/konvajs/react-konva).
