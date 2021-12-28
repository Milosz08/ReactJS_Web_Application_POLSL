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

export enum modalsTypes {
    CHANGE_MODAL_STATE = 'CHANGE_MODAL_STATE',
    CHANGE_MODAL_SELECTED_INPUT = 'CHANGE_MODAL_SELECTED_INPUT',
    CHANGE_MODAL_SELECTED_ARRAY = 'CHANGE_MODAL_SELECTED_ARRAY',
    CLEAR_ALL_SINGLE_MODAL_INPUTS = 'CLEAR_ALL_SINGLE_MODAL_INPUTS',
    ADD_ELEMENT_INTO_ARRAY = 'ADD_ELEMENT_INTO_ARRAY',
    REMOVE_ELEMENT_FROM_ARRAY = 'REMOVE_ELEMENT_FROM_ARRAY',
}

export enum allModals {
    SUBJECT_MODAL = 'subjectsModal',
    USER_MESSAGES_MODAL = 'userMessagesModal',
    HELPERS_LINKS_MODAL = 'helpersLinksModal',
    CALENDAR_MODAL = 'calendarModal',
}

export enum allModalsActions {
    ADD_ELEMENT = 'ADD_ELEMENT',
    EDIT_ELEMENT = 'EDIT_ELEMENT',
    REMOVE_ELEMENT = 'REMOVE_ELEMENT',
    VIEW_ELEMENT = 'VIEW_ELEMENT',
}

export enum allModalsInputs {
    TITLE = 'title',
    LINK = 'link',
    ICON = 'icon',
    DATE = 'date',
    ITEMS = 'items',
    START = 'start',
    LEVEL = 'importantLevel',
    MESSAGE = 'message',
    IF_END = 'ifEnd',
    SEMESTERS = 'semesters',
    DEPARTMENTS = 'departments',
    CLASSES = 'classesPlatforms',
    TYPE = 'type',
    PLACE = 'place',
    SHORT = 'shortName',
}

export enum modalInputHeader {
    NORMAL = 'modalInputFields',
    ERROR = 'modalInputErrorsFields',
}