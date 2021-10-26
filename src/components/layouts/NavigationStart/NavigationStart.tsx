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

import { IconFamiliesType } from '../../../helpers/componentsAndMiddleware/IconComponent';

import { NavigationStartContainer, NavigationStartWrapper } from './NavigationStart.styles';

const NavigationStartElements = React.lazy(() => import('./subcomponents/NavigationStartElements'));
const UniversalHeader = React.lazy(() => import('../UniversalHeader/UniversalHeader'));

/**
 * Component generating a list of links, depending on the parameter in props, a list is generated without
 * icons and other embellishments. Also generates fancy links.
 */
const NavigationStart: React.FC = (): JSX.Element => (
    <NavigationStartContainer>
        <NavigationStartWrapper>
            <UniversalHeader
                iconP = {{ family: IconFamiliesType.FontAwesomeIcons, name: 'FaLocationArrow' }}
                content = 'Główna Nawigacja'
                ifCloseButtonVisible = {false}
            />
            <NavigationStartElements/>
        </NavigationStartWrapper>
    </NavigationStartContainer>
);

export default NavigationStart;