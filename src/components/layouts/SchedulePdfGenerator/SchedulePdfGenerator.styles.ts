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
import { DefaultButton, StandardContainer, StandardSafetyAreaWrapper } from '../../../styles/mixins.styles';
import { button_rs } from '../../../styles/reset.styles';

export const SchedulePdfGeneratorContainer = styled.section`
    ${StandardContainer()};
`;

export const SchedulePdfGeneratorWrapper = styled.article`
    ${StandardSafetyAreaWrapper()};
    @media only screen and (max-width: 1250px) {
        margin-bottom: 0;
    }
`;

export const SchedulePdfGeneratorButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

export const SchedulePdfButtonGenerator = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.2rem', _fontWeight: 400, _ifEmpty: false })};
    width: fit-content;
    :disabled {
        background-color: gray;
        color: var(--darkGrayTint2);
        box-shadow: none;
        cursor: not-allowed;
    }
`;

export const SchedulePdfInfoText = styled.p`
    display: block;
    margin: 20px auto 40px auto;
    max-width: 300px;
    text-align: center;
    color: var(--darkGray);
`;

export const GenerateComponentHide = styled.div`
    display: none;
`;