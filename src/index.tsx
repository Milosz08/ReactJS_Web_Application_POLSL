import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './components/router/App';

/**
 * Wymuszenie przy każdym przeładowaniu strony scrolla na pozycji X:0, Y:0
 */
window.onbeforeunload = () => window.scrollTo(0, 0);

/**
 * Wyłącznie animacji na czas zmiany rozmiaru okna przeglądarki
 */
let resizeTimer: NodeJS.Timeout;
window.addEventListener('resize', ():void => {
   document.body.classList.add('stopTransitions');
   clearTimeout(resizeTimer);
   resizeTimer = setTimeout(():void => {
      document.body.classList.remove('stopTransitions');
   }, 400)
});

ReactDOM.render(<App />, document.getElementById('root'));