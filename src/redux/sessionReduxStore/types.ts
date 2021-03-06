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

enum sessionTypes {
    CHANGE_ADMIN_LOGGED_STATUS = 'CHANGE_ADMIN_LOGGED_STATUS',
    CHANGE_USER_LOGGED_STATUS = 'CHANGE_USER_LOGGED_STATUS',
    INCREASE_SESSION_COUNER = 'INCREASE_SESSION_COUNER',
    TOGGLE_WARNING_SESSION_MODAL = 'TOGGLE_WARNING_SESSION_MODAL',
    CHANGE_JWT_TOKEN = 'CHANGE_JWT_TOKEN',
}

export default sessionTypes;