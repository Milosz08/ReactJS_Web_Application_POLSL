/*
 * Copyright (c) 2021, by Miłosz Gilga <https://miloszgilga.pl>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './components/router/App';

import 'core-js';

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
    resizeTimer = setTimeout((): void => {
        document.body.classList.remove('stopTransitions');
    }, 400)
});

/**
 * @details Render entire application.
 */
ReactDOM.render(<App/>, document.getElementById('root'));