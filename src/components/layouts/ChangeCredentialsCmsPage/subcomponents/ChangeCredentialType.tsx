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
import { useContext } from 'react';

import { ROLES } from '../../../../helpers/functionsAndClasses/LoginValidator';
import { ChangeCredentialsContext, ChangeCredentialsContextTypes } from '../ChangeCredentialsStoreProvider';

import { ChangeCredentialsTypesContainer } from '../ChangeCredentialsCmsPage.styles';

const UniversalRadioInput = React.lazy(() => import('../../UniversalRadioInput/UniversalRadioInput'));

/**
 * Component responsible for admin/moderator change credentials radio inputs.
 */
const ChangeCredentialType: React.FC = (): JSX.Element => {

    const { roles } = useContext<Partial<ChangeCredentialsContextTypes>>(ChangeCredentialsContext);

    const generateRadioInputs = [ ROLES.MODERATOR, ROLES.ADMIN ].map(el => (
        <UniversalRadioInput
            key = {el}
            content = {el === ROLES.MODERATOR ? 'Moderator' : 'Administrator'}
            radioProps = {{
                id: el,
                name: 'rangeFields',
                checked: Number(roles!.role) === el,
                onChangeCallback: (type: ROLES) => roles!.setRole(type)
            }}
        />
    ));

    return (
        <ChangeCredentialsTypesContainer>
            {generateRadioInputs}
        </ChangeCredentialsTypesContainer>
    );
};

export default ChangeCredentialType;