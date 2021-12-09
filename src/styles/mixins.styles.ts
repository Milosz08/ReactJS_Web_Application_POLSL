/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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

import { css } from 'styled-components';

export const NavigateArrow = ({ _size, _angle, _fromLeft, _color }: { [name: string]: string }) => css`
    content: '';
    position: absolute;
    margin-left: ${_fromLeft};
    top: 50%;
    display: block;
    border-right: 2px solid ${_color};
    border-bottom: 2px solid ${_color};
    width: ${_size};
    height: ${_size};
    transform: translate(0, -50%) rotate(${_angle});
`;

interface StandardTextInputProvider {
    _paddingRight: number;
    _spaceUpDown: number;
    _ifError?: boolean;
}

export const StandardTextInput = ({ _paddingRight, _spaceUpDown, _ifError }: StandardTextInputProvider) => css`
    appearance: none;
    padding: ${`${_spaceUpDown - 2}px`} ${`${_paddingRight}px`} ${`${_spaceUpDown}px`} ${`${_spaceUpDown + 5}px`};
    border: 2px solid var(${_ifError ? '--redColor' : '--darkGrayTint3'});
    border-radius: 10px;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(${_ifError ? '--redColor' : '--navyBlueColor'});
    width: 100%;
    transition: var(--transitionDuration) all ease-in-out;
    ::placeholder {
        color: var(${_ifError ? '--redColor' : '--darkGrayTint3'});
        font-weight: 400;
    }
    :focus {
        border-color: var(${_ifError ? '--redColor' : '--navyBlueColor'});
    }
`;

export const ModalBackground = ({ _width }: { _width: number }) => css`
    position: fixed;
    display: flex;
    z-index: 9999;
    visibility: hidden;
    opacity: 0;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--transparentModal);
    @media only screen and (max-width: ${`${_width + 30}px`}) {
        align-items: flex-end;
    }
`;

export const ModalContainer = ({ _width }: { _width: number }) => css`
    width: ${`${_width}px`};
    height: fit-content;
    border-radius: 10px;
    padding: 10px 40px 40px;
    margin-top: 100px;
    opacity: 0;
    visibility: hidden;
    background-color: var(--cleanWhiteColor);
    box-shadow: var(--boxShadowLight);
    @media only screen and (max-width: ${`${_width + 30}px`}) {
        width: calc(100% - 40px);
        margin: 0 20px 20px;
        padding: 10px 30px 20px;
    }
`;

interface DefaultButtonProvider {
    _ifEmpty: boolean;
    _fontSize: string;
    _fontWeight: number;
}

export const DefaultButton = ({ _ifEmpty, _fontSize, _fontWeight }: DefaultButtonProvider) => css`
    padding: 8px 15px 10px 15px;
    font-size: ${_fontSize};
    font-weight: ${_fontWeight};
    border-radius: 6px;
    transition: .2s;
    background-color: var(${_ifEmpty ? 'transparent' : '--navyBlueColor'});
    color: var(${_ifEmpty ? '--navyBlueColor' : '--cleanWhiteColor'});
    border: ${_ifEmpty ? '1px solid var(--navyBlueColor)' : 'none'};
    :hover {
        box-shadow: 0 0 6px var(--lightGrayTint4);
    }
`;

export const StandardContainer = () => css`
    display: flex;
    justify-content: center;
    width: 100%;
    @media only screen and (max-width: 1250px) {
        width: calc(100% - 60px);
        margin: 0 30px;
    }
`;

export const StandardSafetyAreaWrapper = () => css`
    display: flex;
    flex-direction: column;
    width: var(--widthVertical);
    margin-bottom: 60px;
`;

export const StandardSafetyAreaWrapperWithTopMargin = () => css`
    position: relative;
    margin-top: 230px;
    display: flex;
    flex-direction: column;
    width: var(--widthVertical);
`;

interface BorderTypes {
    _color: string;
    _titleBgc: string;
    _fontSize: string;
    _fontWeight: number;
    _content: string;
}

export const BorderWithPseudoElement = ({ _color, _titleBgc, _fontSize, _fontWeight, _content }: BorderTypes) => css`
    position: relative;
    border: 1px solid ${_color};
    border-radius: 7px;
    padding: 30px;
    margin: 10px;
    background-color: ${_titleBgc};
    &::before {
        position: absolute;
        content: '${_content}';
        width: fit-content;
        top: -14px;
        left: 20px;
        background-color: ${_titleBgc};
        color: ${_color};
        font-size: ${_fontSize};
        font-weight: ${_fontWeight};
        padding: 0 10px;
    }
`;

interface StandardRadioInputElementTypes {
    _size: number;
    _color: string;
}

export const StandardRadioInputElement = ({ _size }: StandardRadioInputElementTypes) => css`
    position: relative;
    z-index: 3;
    opacity: 0;
    width: ${_size}px;
    height: ${_size}px;
    cursor: pointer;
    :checked ~ div {
        border: none;
        ::after {
            transition: .2s;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;

export const StandardRadiomarkSelector = ({ _size, _color }: StandardRadioInputElementTypes) => css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: ${_size}px;
    height: ${_size}px;
    border: 1px solid var(--darkGray);
    border-radius: 50%;
    ::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%) scale(0);
        width: 40%;
        height: 40%;
        border: 6px solid ${_color};
        border-radius: 100%;
        background-color: var(--cleanWhiteColor);
        transition: .2s;
    }
`;