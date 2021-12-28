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
import { button_rs, ul_rs } from '../../../../../../styles/reset.styles';

export const IconSelectorContainer = styled.div`
    display: flex;
    margin: 10px 20px;
    @media only screen and (max-width: 677px) {
        margin: 10px 0;
    }
`;

export const IconSelectorLabel = styled.div`
    border: 2px solid var(--darkGrayTint3);
    position: relative;
    left: 2px;
    border-right: none;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    display: flex;
    align-items: center;
    line-height: 0;
    padding: 0 15px;
    font-size: 1.1rem;
    color: var(--darkGrayTint3);
`;

export const MultipleInjectionContainer = styled(ul_rs)`
    width: 100%;
    max-width: 1100px;
`;

export const SingleInjectionContainer = styled('li')<{ ifBorderInactive: boolean, ifSmallMargins: boolean }>`
    display: flex;
    border: ${({ ifBorderInactive }) => ifBorderInactive ? 'none' : '1px solid var(--darkGrayTint3)'}; 
    border-radius: 10px;
    width: 100%;
    margin-top: ${({ ifSmallMargins }) => ifSmallMargins ? 0 : '20px'};
`;

export const SingleInjectionCustomContentWrapper = styled('div')<{ ifSmallMargins: boolean }>`
    flex-grow: 1;
    padding: ${({ ifSmallMargins }) => ifSmallMargins ? 0 : '20px'};
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

export const SingleInjectionRemoveElementButton = styled(button_rs)`
    display: flex;
    align-items: center;
    padding: 0 20px;
`;