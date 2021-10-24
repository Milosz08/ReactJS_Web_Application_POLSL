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
import { NavigateArrow } from '../../../styles/mixins.styles';

export const ImageSliderContainer = styled.main`
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 800px;
    color: var(--whiteColor);
    overflow: hidden;
    @media only screen and (max-width: 500px) {
        height: 100vh;
    }
`;

export const MainTitleContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    z-index: 2;
    bottom: 70px;
    width: var(--widthVertical);
    @media only screen and (max-width: 1250px) {
        width: 100%;
        align-items: center;
        flex-direction: column;
    }
    @media only screen and (max-width: 500px) {
        margin-bottom: 60px;
    }
`;

export const MainTitleWrapper = styled.div`
    @media only screen and (max-width: 1250px) {
        margin-bottom: 30px;
    }
`;

export const MainTitleHeaderFirst = styled.h2`
    font-size: 6rem;
    font-weight: 600;
    text-transform: uppercase;
    @media only screen and (max-width: 1250px) {
        font-size: 4.5rem;
    }
    @media only screen and (max-width: 500px) {
        font-size: 3.5rem;
    }
`;

export const MainTitleHeaderSecond = styled.h4`
    font-size: 2rem;
    font-weight: 400;
    @media only screen and (max-width: 1250px) {
        font-size: 1.5rem;
    }
    @media only screen and (max-width: 500px) {
        font-size: 1.3rem;
        font-weight: 400;
    }
`;

export const BannerDotsContainer = styled.div`
    display: flex;
    @media only screen and (max-width: 500px) {
        display: none;
    }
`;

export const BannerSingleDotElement = styled('div')<{ ifActive: boolean }>`
    position: relative;
    width: 14px;
    height: 14px;
    margin: 0 15px;
    border-radius: 50%;
    background-color: ${props => props.ifActive ? 'var(--whiteColor)' : 'transparent'};
    border: ${props => props.ifActive ? '1px solid var(--whiteColor)' : 'none'};
    &::after {
        position: absolute;
        content: '';
        width: 90%;
        height: 90%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 2px solid var(--whiteColor);
        border-radius: 50%;
    }
`;

export const BannerColorGrade = styled.div`
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 60, 125, .6);
`;

export const BannerNavigateButtonsContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media only screen and (max-width: 500px) {
        display: none;
    }
`;

export const BannerNavigateButtons = styled(button_rs)<{ ifLeft: boolean }>`
    position: relative;
    z-index: 2;
    top: 70px;
    border: 2px solid var(--whiteColor);
    background-color: transparent;
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
            _fromLeft: props.ifLeft ? '1.2em' : '.7em',
            _color: 'var(--whiteColor)'
        })};
    }
    :hover {
        margin-left: ${props => props.ifLeft ? '30px' : 0};
        margin-right: ${props => props.ifLeft ? 0 : '30px'};
    }
`;

export const SliderCompositionContainer = styled('div')<{ widthCSS: number }>`
    position: absolute;
    width: ${props => `${props.widthCSS}%`};
    height: 800px;
    display: inline-block;
    z-index: -2;
    @media only screen and (max-width: 500px) {
        height: 100vh;
    }
`;

export const SliderSingleImage = styled('img').attrs(props => ({
    style: {
        transform: `translateX(${props.positionCSS}%)`
    }
}))<{ widthCSS: number }>`
    width: calc(100% / 3);
    height: 100%;
    object-fit: cover;
    transition: .6s all cubic-bezier(.44,.06,.5,.88);
`;