/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import preferencesReducer from './preferencesReduxStore/reducer';
import sessionReducer from './sessionReduxStore/reducer';
import apiReducer from './apiReduxStore/reducer';
import modalsReducer from './modalsReduxStore/reducer';

import thunk from 'redux-thunk';

const rootReducers = combineReducers({
    preferencesReducer,
    apiReducer,
    sessionReducer,
    modalsReducer
});

const reduxStore = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducers>;

export default reduxStore;