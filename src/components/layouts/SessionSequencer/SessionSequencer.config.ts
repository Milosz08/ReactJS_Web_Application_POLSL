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

/**
 * Maximum session time (inactivity on the part of the user). Exported variable.
 */
export const MAX_INACTIVITY_TIME: number = 5;

/**
 * Maximum modal open time (after this time, modal will be closed and user/administrator will be logout).
 */
export const MODAL_REMAIN_SECONDS: number = 30;

/**
 * String array that stores every possible event (user interaction with the page). Used to reset the timer.
 */
export const ACTIVITY_EVENTS: string[] = [
    'mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'
];