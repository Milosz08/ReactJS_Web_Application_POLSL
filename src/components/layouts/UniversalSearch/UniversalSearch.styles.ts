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
import { button_rs, input_rs } from '../../../styles/reset.styles';
import { StandardTextInput } from '../../../styles/mixins.styles';
import { FaTrashAlt } from 'react-icons/all';

export const UniversalSearchContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 0 0 40px 0;
    @media only screen and (max-width: 1250px) {
        margin: 0;
    }
`;

export const UniversalSearchLabel = styled.label`
    position: relative;
    width: 350px;
    @media only screen and (max-width: 450px) {
        width: 100%;
    }
`;

export const UniversalSearchInput = styled(input_rs)<{ ifError: boolean }>`
    ${props => StandardTextInput({ _ifError: props.ifError, _paddingRight: 50, _spaceUpDown: 12 })};
    transition: ${props => props.ifError ? 'none' : 'var(--transitionDuration)'};
`;

export const CleanInputButton = styled(button_rs)`
`;

export const CleanInputButtonIconWrapper = styled.div`
    position: absolute;
    margin-left: -50px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    width: 40px;
    height: 40px;
    font-size: 1.3rem;
`;

export const TrashAlIconStyles = styled(FaTrashAlt)<{ $ifError: boolean }>`
    color: var(${props => props.$ifError ? '--redColor' : '--navyBlueColor'});
    flex-grow: 1;
`;