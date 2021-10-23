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

export const GotoTopButtonContainer = styled(button_rs)<{ ifActive: boolean }>`
    position: fixed;
    z-index: 999;
    bottom: 50px;
    right: 50px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    transition: .4s;
    transform: scale(${props => props.ifActive ? 1 : 0});
    background-color: var(--navyBlueColor);
    ::before {
        ${NavigateArrow({
            _size: '1em',
            _angle: '-135deg',
            _fromLeft: '1.3em',
            _color: 'var(--whiteColor)'
        })};
        margin-top: 2px;
    }
    :hover {
        bottom: 56px;
    }
    @media only screen and (max-width: 1250px) {
        bottom: 20px;
        right: 20px;
        :hover {
            bottom: 26px;
        }
    }
    @media only screen and (max-width: 500px) {
        bottom: 60px;
        width: 50px;
        height: 50px;
        ::before {
            ${NavigateArrow({
                _size: '.7em',
                _angle: '-135deg',
                _fromLeft: '1.3em',
                _color: 'var(--whiteColor)'
            })};
            margin-left: 0;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-135deg);
            margin-top: 1px;
        }
        :hover {
            bottom: 60px;
        }
    }
`;