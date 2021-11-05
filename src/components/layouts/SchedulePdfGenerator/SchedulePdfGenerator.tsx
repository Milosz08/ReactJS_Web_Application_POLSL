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

import * as React from 'react';
import { IconFamiliesType } from '../../../helpers/componentsAndMiddleware/IconComponent';

import {
    SchedulePdfGeneratorButtonContainer, SchedulePdfGeneratorContainer, SchedulePdfGeneratorWrapper
} from './SchedulePdfGenerator.styles';

import UniversalHeader from '../UniversalHeader/UniversalHeader';
import GeneratePdfButton from './subcomponents/GeneratePdfButton';

/**
 * Component responsible for generating create to pdf misc schedule services.
 */
const SchedulePdfGenerator: React.FC = (): JSX.Element => (
    <SchedulePdfGeneratorContainer>
        <SchedulePdfGeneratorWrapper>
            <UniversalHeader
                iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaTools' }}
                content = 'Dodatkowe Narzędzia'
                ifCloseButtonVisible = {false}
                changeIconSize = '1.5rem'
            />
            <SchedulePdfGeneratorButtonContainer>
                <GeneratePdfButton/>
            </SchedulePdfGeneratorButtonContainer>
        </SchedulePdfGeneratorWrapper>
    </SchedulePdfGeneratorContainer>
);

export default SchedulePdfGenerator;