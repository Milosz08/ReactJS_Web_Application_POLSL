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

declare module 'react-crypt-gsm';
declare module 'react-delay-link';
declare module 'core-js/fn/number/is-nan';
declare module 'core-js/es7/';
declare module 'core-js/es6/';
declare module 'raf/polyfill';
declare module 'bcryptjs';

declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}