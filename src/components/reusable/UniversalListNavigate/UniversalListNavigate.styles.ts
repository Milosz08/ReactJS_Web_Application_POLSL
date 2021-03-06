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
import { button_rs, select_rs } from '../../../styles/reset.styles';

export const UniversalListNavigateContainer = styled.nav`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 900px;
    margin: 20px auto;
`;

export const UniversalListNavigateSingleElement = styled('div')<{ ifExtraMargin?: boolean }>`
    margin-left: ${({ ifExtraMargin }) => ifExtraMargin ? '40px' : 0};
    @media only screen and (max-width: 940px) {
        display: flex;
        justify-content: flex-end;
    }
    @media only screen and (max-width: 602px) {
        margin: 0 auto;
    }
`;

export const UniversalListNavigateButton = styled(button_rs)`
    font-size: 1.1rem;
    margin: 0 10px;
    color: var(--navyBlueColor);
    :disabled {
        color: var(--darkGrayTint2);
    }
`;

export const UniversalListNavigateText = styled.span`
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--navyBlueColor);
`;

export const UniversalListNavigateLabel = styled.div`
    display: inline-block;
    position: relative;
`;

export const UniversalListNaviagteSelect = styled(select_rs)<{ ifExtraMargin?: boolean }>`
    appearance: none;
    border: 1px solid var(--darkGrayTint2);
    font-size: 1.1rem;
    font-weight: 500;
    padding: 2px 6px 2px 5px;
    border-radius: 5px;
    min-width: 10px;
    text-align: center;
    line-height: 1;
    color: var(--navyBlueColor);
    margin: 0 6px;
    :disabled {
        cursor: not-allowed;
        color: var(--darkGrayTint2);
    }
`;

export const UniversalListNavigateSortingButton = styled(UniversalListNavigateButton)`
    margin-right: 30px;
    display: flex;
    @media only screen and (max-width: 940px) {
        flex-basis: 40%;
        justify-content: flex-end;
        margin-right: 0;
    }
    @media only screen and (max-width: 602px) {
        flex-basis: 100%;
        justify-content: center;
        margin-bottom: 10px;
    }
`;

export const UniversalListNavigateSortingIcons = styled.div`
    position: relative;
    color: var(--darkGrayTint2);
    top: 2px;
    margin-left: 6px;
    font-size: 1.2rem;
`;

export const UniversalListNavigateListElementsCounter = styled.div`
    color: var(--darkGrayTint2);
    font-size: 1.1rem;
    margin-right: 30px;
    strong {
        font-weight: 500;
        color: var(--navyBlueColor);
    }
    @media only screen and (max-width: 940px) {
        flex-basis: 40%;
        margin-bottom: 15px;
    }
    @media only screen and (max-width: 602px) {
        display: none;
    }
`;

export const UniversalListNavigateArrowsContainer = styled.div`
    display: flex;
    @media only screen and (max-width: 940px) {
        flex-basis: 40%;
    }
    @media only screen and (max-width: 602px) {
        flex-basis: 100%;
        justify-content: center;
        margin-bottom: 10px;
    }
`;