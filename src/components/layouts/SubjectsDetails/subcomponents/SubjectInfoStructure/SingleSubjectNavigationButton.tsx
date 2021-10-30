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

import * as React from 'react';
import {
    ExternalIconLink,
    PzePlatformLinkAnchor,
    SingleSubjectNavigationButtonContainer,
    SubjectsTermsLinkWrapper
} from './SubjectInfoStructure.style';
import DelayRouterLink from '../../../../../helpers/componentsAndMiddleware/DelayRouterLink';
import { FRONT_ENDPOINTS } from '../../../../../helpers/structs/appEndpoints';
import { useContext } from 'react';
import { SubjectContext, SubjectContextProvider } from '../SubjectInfoContent';


/**
 *
 */
const SingleSubjectNavigationButton: React.FC = (): JSX.Element => {

    const { subject } = useContext<Partial<SubjectContextProvider>>(SubjectContext);

    const pzeRefer = subject!.classesPlatforms.length !== 1 ? subject!.classesPlatforms.map(platform => (
        <PzePlatformLinkAnchor
            key = {platform.link}
            href = {platform.link}
            target = '_blank'
            rel = 'noreferrer'
        >
            {`Link do PZE (${platform.type})`}
            <ExternalIconLink/>
        </PzePlatformLinkAnchor>
    )) : (
        <PzePlatformLinkAnchor
            href = {subject!.classesPlatforms[0].link}
            target = '_blank'
            rel = 'noreferrer'
        >
            Link do PZE (Wszystkie zajęcia)
            <ExternalIconLink/>
        </PzePlatformLinkAnchor>
    );

    return (
        <SingleSubjectNavigationButtonContainer>
            {pzeRefer}
            <SubjectsTermsLinkWrapper>
                <DelayRouterLink
                    render = {() => 'Warunki zaliczenia przedmiotu'}
                    pathTo = {FRONT_ENDPOINTS.TERMS}
                />
            </SubjectsTermsLinkWrapper>
        </SingleSubjectNavigationButtonContainer>
    );
};

export default SingleSubjectNavigationButton;