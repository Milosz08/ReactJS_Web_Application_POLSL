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
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { setMobileNavActiveElm } from '../../../redux/preferencesReduxStore/actions';

import MOBILE_NAV_ELMS from '../../../helpers/structs/mobileNavElements';

import { MobileDownNavContainer, ActiveIndicator, ActiveIndicatorContainer } from './MobileDownNav.styles';

import MultipleNavElements from './subcomponents/MultipleNavElements';

interface PropsProvider {
    id?: number;
}

/**
 * Component responsible for generating the bottom navigation bar (available only on small mobile devices - phones).
 * In state methods it takes initial parameters based on props "id".
 *
 * @param id { number } - active page.
 */
const MobileDownNav: React.FC<PropsProvider> = ({ id }): JSX.Element => {

    const [ position, setPosition ] = useState<number>(Boolean(id) || id === 0 ? 100 * id! : -100);
    const dispatcher = useDispatch();

    useEffect(() => {
        dispatcher(setMobileNavActiveElm(Boolean(id) || id === 0 ? id! : -1, MOBILE_NAV_ELMS.length));
    }, [ dispatcher, id ]);

    return (
        <MobileDownNavContainer>
            <ActiveIndicatorContainer>
                <ActiveIndicator
                    position = {position}
                />
            </ActiveIndicatorContainer>
            <MultipleNavElements
                setPosition = {setPosition}
            />
        </MobileDownNavContainer>
    );
};

export default MobileDownNav;