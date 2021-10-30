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
import { StandardContainer, StandardSafetyAreaWrapper } from '../../../styles/mixins.styles';
import { button_rs } from '../../../styles/reset.styles';

export const SubjectsCheckboxesContainer = styled.section`
    ${StandardContainer()};
`;

export const SubjectsCheckboxesWrapper = styled.article`
    ${StandardSafetyAreaWrapper()};
    @media only screen and (max-width: 450px) {
        width: 100%;
    }
`;

export const SubjectsTilesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
    @media only screen and (max-width: 1250px) {
        justify-content: center;
    }
`;

export const SubjectTileButton = styled(button_rs)`
    display: flex;
    align-items: center;
    position: relative;
    line-height: 1.3;
    width: calc((var(--widthVertical) - 100px) / 3);
    font-size: 1.3rem;
    font-weight: 500;
    text-align: left;
    min-height: 80px;
    background-color: var(--lightGrayTint1);
    color: var(--darkBlueColor);
    border-radius: 10px;
    margin-bottom: 30px;
    overflow: hidden;
    @media only screen and (max-width: 1250px) {
        margin: 10px 20px;
    }
    @media only screen and (max-width: 450px) {
        margin: 10px 0;
        font-size: 1.1rem;
    }
    :hover div {
        transform: translateX(10px);
    }
`;

export const SubjectIconWrapper = styled.div`
    color: var(--navyBlueColor);
    margin-left: 20px;
    font-size: 1.6rem;
    transition: .2s;
`;

export const SubjectTitleContainer = styled.div`
    margin: 0 20px 0 30px;
    flex-grow: 1;
    transition: .2s;
    @media only screen and (max-width: 450px) {
        margin-left: 30px;
    }
`;

export const SubjectTileActiveElement = styled('span')<{ ifActive: boolean }>`
    position: absolute;
    width: 0;
    height: 0;
    right: 0;
    border-left: 50px solid transparent;
    border-right: 0 solid transparent;
    border-bottom: 80px solid var(--navyBlueColor);
    transition: var(--transitionDuration);
    transform: translate(${props => props.ifActive ? 0 : 100}px);
`;