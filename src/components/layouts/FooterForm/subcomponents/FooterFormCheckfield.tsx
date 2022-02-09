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

import * as React from 'react';

import { FOOTER_INPUTS } from '../../../../helpers/structs/footerOptions.config';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { prefFields } from '../../../../redux/preferencesReduxStore/types';
import { PrefActions } from '../../../../redux/preferencesReduxStore/actions';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';

const UniversalCheckboxInput = React.lazy(() => import('../../../reusable/UniversalCheckboxInput/UniversalCheckboxInput'));

/**
 * Component responsible for generating footer form checkfield.
 */
const FooterFormCheckfield: React.FC = (): JSX.Element => {

    const { footerForm, footerFormErrors }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);
    const dispatcher = useDispatch();

    const { IF_ACCEPTED_TERMS } = FOOTER_INPUTS;

    const handleCheckboxInput = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
        dispatcher(PrefActions.changeSecondRootPrefField(prefFields.FOOTER_FORM, IF_ACCEPTED_TERMS, target.checked));
        dispatcher(PrefActions.changeSecondRootPrefField(prefFields.FOOTER_FORM_ERRORS, IF_ACCEPTED_TERMS, false));
    };

    return (
        <UniversalCheckboxInput
            ifChecked = {Boolean(footerForm[IF_ACCEPTED_TERMS])}
            changeCheckedCallback = {handleCheckboxInput}
            ifError = {footerFormErrors[IF_ACCEPTED_TERMS]}
            id = 'agreeCheckfield'
            labelContent = 'Wyrażam zgodę na przetwarzanie wyżej podanych przeze mnie informacji.'
            ifExtraMargin = {true}
        />
    );
};

export default FooterFormCheckfield;