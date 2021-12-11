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
import { BorderWithPseudoElement } from '../../../../../styles/mixins.styles';

export const CovidCmsPageElementsContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export const SingleCovidSectionElement = styled.div`
    width: 350px;
    height: 130px;
    border: 2px dashed var(--navyBlueColor);
    border-radius: 10px;
    margin: 20px;
    @media only screen and (max-width: 1250px) {
        width: 100%;
        margin: 20px 0;
    }
`;

export const SingleCovidSectionWrapper = styled.div`
    display: flex;
    align-items: center;
    border: 8px solid #ffffff;
    background: var(--yellowColor);
    border-radius: 16px;
    height: 100%;
    padding: 20px;
`;

export const SingleCovidSectionHeader = styled.h3`
    font-size: 1.2rem;
    font-weight: 400;
`;

export const SingleCovidSelect = styled.select`
    width: 90px;
    font-weight: 500;
    padding: 8px 5px;
    margin: 0 0 0 20px;
    font-size: 1.2rem;
    outline: none;
    border: 2px solid var(--darkGrayTint3);
    color: var(--navyBlueColor);
    border-radius: 10px;
    transition: .2s;
    cursor: pointer;
    :focus {
        border-color: var(--navyBlueColor);
    }
`;

export const UsageInfoContainer = styled.div`
    width: calc(100% - 30px);
    ${BorderWithPseudoElement({
        _color: 'var(--redColor)',
        _titleBgc: 'var(--cleanWhiteColor)',
        _content: 'Modyfikacja zagrożeń Covid',
        _fontSize: '1.2rem',
        _fontWeight: 500
    })};
    color: var(--redColor);
    font-size: 1.2rem;
    margin: 40px 0;
`;