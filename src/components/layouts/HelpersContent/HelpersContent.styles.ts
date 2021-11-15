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
import {
    DefaultButton,
    NavigateArrow,
    StandardContainer,
    StandardSafetyAreaWrapperWithTopMargin
} from '../../../styles/mixins.styles';
import { a_rs, button_rs } from '../../../styles/reset.styles';

export const HelpersContentContainer = styled.section`
    ${StandardContainer()};
`;

export const HelpersContentWrapper = styled.article`
    ${StandardSafetyAreaWrapperWithTopMargin()};
    @media only screen and (max-width: 1250px) {
        margin-top: 150px;
    }
`;

export const AllHelpersTilesContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
`;

export const SingleHelperTileAnchor = styled(a_rs)`
    position: relative;
    display: flex;
    flex-basis: calc(50% - 30px);
    background-color: var(--lightGray);
    border-radius: 10px;
    padding: 20px;
    margin: 15px;
    color: var(--navyBlueColor);
    :hover {
        text-decoration: none;
        span {
            right: 30px;
        }
    }
    @media only screen and (max-width: 750px) {
        flex-basis: 100%;
    }
`;

export const SingleHelperTileAnchorIconWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 20px;
    font-size: 2rem;
`;

export const SingleHelperTileAnchorTitle = styled.h3`
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--darkBlueColor);
    max-width: 300px;
    margin-right: 40px;
`;

export const SingleHelperTileAnchorArrow = styled.span`
    position: absolute;
    right: 35px;
    ${NavigateArrow({
        _size: '1em',
        _angle: '-45deg',
        _fromLeft: '1.3em',
        _color: 'var(--navyBlueColor)'
    })};
    transition: var(--transitionDuration);
`;

export const HelpersForbiddenSection = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: linear-gradient(180deg, rgba(255,255,255,.5) 0, var(--cleanWhiteColor) 60%);
`;

export const LoggedInfoContentContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 3;
    top: -150px;
    text-align: center;
    @media only screen and (max-width: 750px) {
        top: -280px;
    }
`;

export const LoggedInfoContentTitle = styled.h3`
    font-size: 2rem;
    font-weight: 500;
    color: var(--navyBlueColor);
`;

export const LoggedInfoContentAsideText = styled.p`
    margin-top: 20px;
    font-weight: 400;
    font-size: 1.2rem;
    color: var(--darkGrayTint2);
`;

export const HelpersContentLogoutButton = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.2rem', _fontWeight: 400, _ifEmpty: false })};
    width: fit-content;
    margin: 30px auto -30px auto;
`;