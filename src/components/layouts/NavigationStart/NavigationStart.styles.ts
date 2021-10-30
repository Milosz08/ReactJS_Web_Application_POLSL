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
import { ul_rs } from '../../../styles/reset.styles';
import { NavigateArrow, StandardContainer, StandardSafetyAreaWrapper } from '../../../styles/mixins.styles';

export const NavigationStartContainer = styled.section`
    ${StandardContainer()};
`;

export const NavigationStartWrapper = styled.article`
    ${StandardSafetyAreaWrapper()};
`;

export const NavigationStartList = styled(ul_rs)`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style-type: none;
    margin-top: 10px;
    @media only screen and (max-width: 1250px) {
        justify-content: space-around;
    }
`;

export const NavigationSingleElementContainer = styled.li`
    width: 250px;
    min-height: 250px;
    background-color: var(--lightGrayTint1);
    border-radius: 10px;
    div[role = 'link'], a {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        a {
            text-decoration: none;
        }
        :hover div:nth-child(1) span {
            transform: translateX(10px);
        }
    }
    @media only screen and (max-width: 1250px) {
        flex-basis: 45%;
        margin: 20px 0;
        :nth-child(1), :nth-child(2) {
            margin: 20px 0;
        }
    }
    @media only screen and (max-width: 641px) {
        flex-basis: 80%;
        :nth-child(1) {
            margin: 0 0 20px;
        }
    }
`;

export const NavigationElementTitle = styled.div`
    position: relative;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    flex-grow: 1;
    padding: 20px 60px 0 20px;
    font-size: 2rem;
    font-weight: 400;
    line-height: 1;
    background-color: var(--navyBlueColor);
    color: var(--whiteColor);
`;

export const NavigationElementDescription = styled.div`
    padding: 10px 15px 15px 15px;
    border-top: 4px solid var(--orangeColor);
    color: var(--darkBlueColor);
`;

export const NagivationElementArrow = styled.span`
    background-color: transparent;
    position: absolute;
    bottom: 25px;
    right: 40px;
    width: 15px;
    height: 5px;
    transition: .4s;
    ::after {
        ${NavigateArrow({ _size: '.5em', _angle: '-45deg', _fromLeft: '0', _color: 'var(--whiteColor)' })};
        border-right-width: 2px;
        border-bottom-width: 2px;
    }
`;