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
import STATIC_STRUCTURE from '../../../../helpers/structs/cookiesPolicyContent';

import {
    PrivacyPolicyExternalAnchor, PrivacyPolicyExternalAnchorIcon, PrivacyPolicyHeaderContainer, PrivacyPolicyTextContent
} from '../PrivacyPolicy.styles';

import PrivacyPolicyUniversalHeader from './PrivacyPolicyUniversalHeader';

/**
 * Component responsible for generating infos how to turn off cookies on this website.
 */
const PrivacyPolicyCookiesTurnOff: React.FC = (): JSX.Element => {

    const { LIST_STRUCTURE, NON_LIST_STRUCTURE } = STATIC_STRUCTURE;

    return (
        <PrivacyPolicyHeaderContainer>
            <PrivacyPolicyUniversalHeader
                content = 'Jak wyłączyć pliki Cookie'
                index = {LIST_STRUCTURE.length + NON_LIST_STRUCTURE.length + 2}
            />
            <PrivacyPolicyTextContent>
                Dyrektywa Unijna i Polskie Prawo Telekomunikacyjne nakazuje serwisom internetowym informowanie
                swoich użytkowników w jakim celu je wykorzystują i jak można je wyłączyć. Jeśli nie wiesz jak
                wyłączyć pliki Cookies na swoim Urządzeniu, przejdź pod{' '}
                <PrivacyPolicyExternalAnchor
                    href = 'https://jakwylaczyccookie.pl/jak-wylaczyc-pliki-cookies/'
                    target = '_blank'
                    rel = 'noreferrer'
                >
                    ten link
                    <PrivacyPolicyExternalAnchorIcon/>
                </PrivacyPolicyExternalAnchor>
            </PrivacyPolicyTextContent>
        </PrivacyPolicyHeaderContainer>
    );
};
export default PrivacyPolicyCookiesTurnOff;