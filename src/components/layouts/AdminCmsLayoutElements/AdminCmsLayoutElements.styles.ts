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
import { NavigateArrow, StandardContainer, StandardSafetyAreaWrapperWithTopMargin } from '../../../styles/mixins.styles';

export const AdminCmsLayoutElementsContainer = styled.section`
    ${StandardContainer()};
`;

export const AdminCmsLayoutElementsWrapper = styled.article`
    ${StandardSafetyAreaWrapperWithTopMargin()};
    align-items: center;
    @media only screen and (max-width: 1250px) {
        margin-top: 150px;
    }
`;

export const AdminCmsChangeCredentialsWrapper = styled(AdminCmsLayoutElementsWrapper)`
    margin-top: 40px;
`;

export const AdminCmsLayoutRouterContainter = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const AdminCmsLayoutRouterSingleTile = styled(button_rs)`
    position: relative;
    flex-basis: calc(100% / 3 - 40px);
    background-color: var(--lightGrayTint1);
    border-radius: 10px;
    margin: 20px;
    a {
        text-decoration: none !important;
    }
    :hover h3 {
        text-decoration: underline;
    }
    :hover aside::after {
        margin-left: 2px;
    }
    @media only screen and (max-width: 1043px) {
        flex-basis: calc(50% - 40px);
    }
    @media only screen and (max-width: 663px) {
        flex-basis: 100%;
        margin: 20px 0;
    }
`;

export const CmsTileLayoutElement = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 30px;
    width: 100%;
    height: 100%;
`;

export const CmsTileLayoutHeaderAndIconContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const CmsTileLayoutHeader = styled.h3`
    flex-grow: 1;
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--darkBlueColor);
`;

export const CmsTileLayoutIconWrapper = styled.div`
    flex-basis: 70px;
    height: 70px;
    display: flex;
    justify-content: flex-end;
    font-size: 2rem;
    color: var(--darkBlueColor);
`;

export const CmsTileDescription = styled.p`
    flex-basis: 100%;
    font-weight: 400;
    color: var(--darkGray);
`;

export const CmsTileArrowContainter = styled.div`
    flex-basis: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

export const CmsTileNavigateArrow = styled.aside`
    background-color: transparent;
    position: relative;
    width: 20px;
    height: 20px;
    transition: .4s;
    ::after {
        ${NavigateArrow({ _size: '.9em', _angle: '-45deg', _fromLeft: '-5px', _color: 'var(--orangeColor)' })};
        border-right-width: 2px;
        border-bottom-width: 2px;
        transition: var(--transitionDuration);
    }
`;

export const CmsTileNavigateMessageIndicator = styled.span`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0;
    top: -25px;
    right: -25px;
    width: 50px;
    height: 50px;
    background-color: var(--redColor);
    border: 5px solid var(--cleanWhiteColor);
    border-radius: 50%;
    font-size: 1.2rem;
    color: var(--whiteColor);
    font-weight: 600;
`;