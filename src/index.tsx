/**
 * @file index.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief Rendering the entire React application.
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactDOM: "^17.0.2"
 *
 * @date final version: 08/19/2021
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './components/router/App';

/**
 * Forcing the scroll at position X: 0, Y: 0 every time you reload.
 */
window.onbeforeunload = () => window.scrollTo(0, 0);

/**
 * Turning off the animation while resizing the browser window.
 */
let resizeTimer: NodeJS.Timeout;
window.addEventListener('resize', (): void => {
   document.body.classList.add('stopTransitions');
   clearTimeout(resizeTimer);
   resizeTimer = setTimeout(():void => {
      document.body.classList.remove('stopTransitions');
   }, 400)
});

/**
 * @details Render entire application.
 */
ReactDOM.render(<App />, document.getElementById('root'));