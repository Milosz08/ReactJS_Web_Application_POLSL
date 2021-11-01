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

import styled, { css } from 'styled-components';
import { button_rs, input_rs } from '../../../styles/reset.styles';

import { BorderWithPseudoElement, DefaultButton } from '../../../styles/mixins.styles';

export const ScheduleFormContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
`;

export const ScheduleBackgroundImage = styled.img`
    position: absolute;
    z-index: -1;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    height: 350px;
    @media only screen and (max-width: 1250px) {
        display: none;
    }
`;

export const ScheduleFormStyle = styled.form`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 50px 0;
    width: 100%;
    @media only screen and (max-width: 1250px) {
        flex-direction: column;
        margin: 20px 0;
        width: 100%;
    }
`;

export const ScheduleFormInputsWrapper = styled.div`
    display: flex;
    @media only screen and (max-width: 1024px) {
        flex-wrap: wrap;
    }
`;

export const ScheduleRadioInputsContainer = styled('div')<{ content: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--cleanWhiteColor);
    ${props => BorderWithPseudoElement({
        _color: 'var(--darkBlueColor)',
        _titleBgc: 'var(--cleanWhiteColor)',
        _content: props.content,
        _fontSize: '1.2rem',
        _fontWeight: 500
    })};
    @media only screen and (max-width: 1250px) {
        width: 100%;
        margin: 0 25px;
    }
    @media only screen and (max-width: 1024px) {
        margin: 20px 0;
    }
`;

export const ScheduleRadioInputsWrapper = styled('div')<{ ifActive: boolean, disabled: boolean }>`
    position: relative;
    height: 50px;
    width: 200px;
    margin: 10px;
    background-color: var(${props => props.disabled ? '--cleanWhite' : props.ifActive ? '--orangeColor' : '--lightGray'});
    border-radius: 7px;
    color: var(${props => props.ifActive ? '--cleanWhiteColor' : '--lightBlack'});
    font-size: 1.1rem;
    font-weight: 500;
    transition: var(--transitionDuration);
    opacity: ${props => props.disabled ? .4 : 1};
    :hover {
        box-shadow: 0 0 4px 0 var(${props => props.ifActive ? '--darkOrangeColor' : '--boxShadowTint2'});
    }
`;

export const ScheduleRadioInput = styled(input_rs)`
    position: absolute;
    z-index: 1;
    width: 22px;
    height: 22px;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    opacity: 0;
    cursor: pointer;
    :checked ~ span {
        background-color: var(--cleanWhiteColor);
        border-color: var(--cleanWhiteColor);
        ::after {
            transform: rotate(45deg) scale(1);
        }
    }
    :disabled {
        cursor: not-allowed;
    }
`;

export const ScheduleRadioLabel = styled('label')<{ disabled: boolean }>`
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    display: block;
    line-height: 50px;
    padding: 0 20px 0 50px;
`;

export const ScheduleCustomRadio = styled.span`
    position: absolute;
    display: block;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid var(--darkGrayTint2);
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    ::after {
        content: '';
        position: absolute;
        left: 6px;
        top: 2px;
        width: 4px;
        height: 8px;
        border: solid var(--orangeColor);
        border-width: 0 3px 3px 0;
        transform: rotate(45deg) scale(0);
        transition: .2s;
    }
`;

export const ScheduleFormButtonsContainer = styled.div`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    @media only screen and (max-width: 1250px) {
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
    }
`;

const ScheduleButtonsMixin = () => css`
    padding: 10px 0 12px;
    width: 200px;
    margin: 8px 0;
`;

export const ScheduleClearInputsButton = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.2em', _fontWeight: 400, _ifEmpty: false })};
    ${ScheduleButtonsMixin()};
`;

export const ScheduleGotoInputButton = styled(button_rs)`
    ${DefaultButton({ _fontSize: '1.2em', _fontWeight: 400, _ifEmpty: false })};
    ${ScheduleButtonsMixin()};
    background-color: var(--orangeColor);
`;

export const ScheduleSaveInputButton = styled(ScheduleClearInputsButton)``;