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
import { NavigateArrow, StandardContainer, StandardSafetyAreaWrapper } from '../../../styles/mixins.styles';

export const SubjectsDetailsContainer = styled.section`
    ${StandardContainer()};
    flex-direction: column;
    align-items: center;
    @media only screen and (max-width: 1250px) {
        margin: 0;
        width: 100%;
    }
`;

export const SubjectsDetailsWrapper = styled.article`
    ${StandardSafetyAreaWrapper()};
    margin-bottom: 0;
    @media only screen and (max-width: 1250px) {
        width: calc(100% - 60px);
        margin: 0 30px;
    }
`;

export const SubjectDetailsWindowContainer = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: var(--lightGray);
    @media only screen and (max-width: 1250px) {
        flex-wrap: wrap;
        justify-content: center;
    }
`;

export const NavigateArrowButton = styled(button_rs)<{ ifLeft: boolean }>`
    position: relative;
    border: 1px solid var(--darkGrayTint2);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    transition: .4s;
    margin-left: ${props => props.ifLeft ? '35px' : 0};
    margin-right: ${props => props.ifLeft ? 0 : '35px'};
    ::before {
        ${props => NavigateArrow({
            _size: '.8em',
            _angle: props.ifLeft ? '135deg' : '-45deg',
            _fromLeft: props.ifLeft ? '1.2em' : '.9em',
            _color: 'var(--darkGrayTint2)'
        })};
    }
    :hover {
        transform: translateX(${props => props.ifLeft ? -7 : 7}px);
    }
    @media only screen and (max-width: 1250px) {
        margin: 0 ${props => props.ifLeft ? 15 : 0}px 30px ${props => props.ifLeft ? 0 : 15}px;
        justify-content: ${props => props.ifLeft ? 'flex-start' : 'flex-end'}px;
    }
`;

export const SubjectInfoContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: calc(var(--widthVertical) - 180px);
    min-height: 600px;
    margin: 40px;
    padding: 40px 80px;
    border-radius: 10px;
    box-shadow: 1px 1px 10px 0 var(--boxShadowColor);
    background-color: var(--cleanWhiteColor);
    .transition-enter {
        position: absolute;
        opacity: 0;
    }
    .transition-enter-active {
        opacity: 1;
        transition: all 500ms ease-in-out;
    }
    .transition-exit {
        opacity: 1;
    }
    .transition-exit-active {
        opacity: 0;
        transition: all 500ms ease-in-out;
    }
    @media only screen and (max-width: 1250px) {
        order: -1;
        margin: 40px 30px;
        width: calc(100% - 60px);
        padding: 30px 20px;
    }
`;

export const SingleSubjectInfoContentAsideText = styled.div`
    font-size: 1.2rem;
    text-transform: uppercase;
    text-align: center;
    color: var(--darkGrayTint1);
    font-weight: 300;
    @media only screen and (max-width: 715px) {
        font-size: 1rem;
    }
`;

export const SingleSubjectInfoContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

export const SingleSubjectInfoContentHeader = styled.h3`
    font-size: 3rem;
    font-weight: 500;
    color: var(--navyBlueColor);
    margin: 15px 0 35px 0;
    text-align: center;
    @media only screen and (max-width: 715px) {
        font-size: 2.1rem;
    }
`;