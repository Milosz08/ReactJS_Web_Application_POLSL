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

import styled from 'styled-components';

import { button_rs } from '../../../styles/reset.styles';
import { DefaultButton, StandardContainer, StandardSafetyAreaWrapperWithTopMargin } from '../../../styles/mixins.styles';

export const AdminCmsLoginElementsContainer = styled.section`
    ${StandardContainer()};
`;

export const AdminCmsLoginElementsWrapper = styled.article`
    ${StandardSafetyAreaWrapperWithTopMargin()};
    align-items: center;
    @media only screen and (max-width: 1250px) {
        margin-top: 150px;
    }
`;

export const AdminCmsLoginElementsFormHeader = styled.h3`
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--navyBlueColor);
    margin: 20px 0 40px;
`;

export const AdminCmsLoginButton = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.2rem', _fontWeight: 400, _ifEmpty: false })};
    width: 100%;
    margin-top: 20px;
`;

export const AdminCmsLoginAsideInfoText = styled.p`
    margin-top: 30px;
    color: var(--darkGrayTint2);
`;