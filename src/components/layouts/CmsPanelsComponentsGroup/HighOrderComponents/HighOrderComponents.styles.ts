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
import { button_rs, ul_rs } from '../../../../styles/reset.styles';

export const CmsPageContainer = styled.section`
    width: calc(100% - 60px);
    margin: 0 30px;
`;

export const CmsListHeaderContainer = styled.header`
    display: flex;
    font-weight: 500;
    padding: 15px;
    color: var(--lightBlack);
    font-size: 1rem;
    text-transform: uppercase;
`;

export const CmsUnorderedList = styled(ul_rs)`
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--navyBlueColor);
`;

export const CmsUnorderedListElement = styled.li`
    display: flex;
    align-items: center;
    border: 1px solid var(--darkGrayTint3);
    border-radius: 10px;
    padding: 10px 15px;
    margin-bottom: 10px;
    min-height: 55px;
`;

export const CmsIdElement = styled('div')<{ ifNotHeader?: boolean }>`
    color: var(${({ ifNotHeader }) => ifNotHeader ? '--darkGrayTint1' : 'inherit'});
    flex-basis: 60px;
`;

export const CmsSingleListNormalElement = styled('div')<{ flexBasis?: string, color?: string }>`
    color: var(${({ color }) => color ? `--${color}Color` : 'inherit'});
    flex-basis: ${({ flexBasis }) => flexBasis ? flexBasis : 'none'};
    flex-grow: ${({ flexBasis }) => flexBasis ? 'none' : 1};
`;

export const CmsSingleListButtonsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-basis: 100px;
`;

export const CmsSingleListActionButton = styled(button_rs)`
    display: flex;
    align-items: center;
    padding: 5px;
    color: var(--darkBlueColor);
`;

export const CmsSingleListRemoveButtonTime = styled.span`
    position: relative;
    display: block;
    width: 20px;
    height: 2px;
    background-color: var(--redColor);
    transform: rotate(45deg);
    ::after {
        position: absolute;
        content: '';
        left: 50%;
        width: 100%;
        height: 100%;
        background-color: var(--redColor);
        transform: translateX(-50%) rotate(90deg);
    }
`;