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

import styled from 'styled-components';

export const a_rs = styled.a`
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`;

export const button_rs = styled.button`
    background-color: inherit;
    border: none;
    cursor: pointer;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    :disabled {
        cursor: not-allowed;
    }
`;

export const ul_rs = styled.ul`
    list-style-type: none;
`;

export const input_rs = styled.input`
    outline: none;
`;

export const select_rs = styled.select`
    outline: none;
    cursor: pointer;
`;

export const textarea_rs = styled.textarea`
    resize: none;
    outline: none;
`;