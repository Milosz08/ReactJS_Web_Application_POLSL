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

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reduxStore';
import { PreferencesInitialTypes } from '../../redux/preferencesReduxStore/initialState';
import { insertInFooterInputs, setErrorsFooterInputs } from '../../redux/preferencesReduxStore/actions';
import { FOOTER_INPUTS, FOOTER_OPTIONS, FOOTER_TEXTAREA_PROPS } from '../structs/footerOptions.config';

/**
 *
 */
const useFooterForm = (): [ () => boolean, () => void ] => {

    const { footerForm }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);
    const dispatcher = useDispatch();

    const { MIN_LENGTH_TEXTAREA, MAX_LENGTH_TEXTAREA } = FOOTER_TEXTAREA_PROPS;

    const clearAllInputs = (): void => {
        const { USER_NICKNAME, USER_MESSAGE, TYPEOF_MESSAGE, IF_ACCEPTED_TERMS } = FOOTER_INPUTS;
        [ USER_NICKNAME, USER_MESSAGE, TYPEOF_MESSAGE, IF_ACCEPTED_TERMS ].forEach(key => {
            switch(key) {
                case IF_ACCEPTED_TERMS:
                    dispatcher(insertInFooterInputs(key, false));
                    break;
                case TYPEOF_MESSAGE:
                    dispatcher(insertInFooterInputs(key, FOOTER_OPTIONS[0].value));
                    break;
                default:
                    dispatcher(insertInFooterInputs(key, ''));
            }
        });
    };

    const validateForm = (): boolean => {
        const { userNickname, userMessage, typeOfMessage, ifAcceptedTerms } = footerForm;
        const { USER_NICKNAME, USER_MESSAGE, TYPEOF_MESSAGE, IF_ACCEPTED_TERMS } = FOOTER_INPUTS;
        let userNameBool = false, userChoose = false, messageAreaBool = false, acceptTermsBool = false;

        if (userNickname.length < 5 || userNickname.indexOf(' ') !== -1 || userNickname.length > 20) {
            userNameBool = true;
            dispatcher(setErrorsFooterInputs(USER_NICKNAME, true));
        }

        if (typeOfMessage === FOOTER_OPTIONS[0].value) {
            userChoose = true;
            dispatcher(setErrorsFooterInputs(TYPEOF_MESSAGE, true));
        }

        if (userMessage.length < MIN_LENGTH_TEXTAREA || userMessage.length > MAX_LENGTH_TEXTAREA) {
            messageAreaBool = true;
            dispatcher(setErrorsFooterInputs(USER_MESSAGE, true));
        }

        if (!ifAcceptedTerms) {
            acceptTermsBool = true;
            dispatcher(setErrorsFooterInputs(IF_ACCEPTED_TERMS, true));
        }

        return !userNameBool && !userChoose && !messageAreaBool && !acceptTermsBool;
    };

    return [ validateForm, clearAllInputs ];
};

export default useFooterForm;