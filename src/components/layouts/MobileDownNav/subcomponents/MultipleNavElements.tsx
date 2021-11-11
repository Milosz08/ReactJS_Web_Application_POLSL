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
import { Dispatch, Fragment, SetStateAction } from 'react';

import MOBILE_NAV_ELMS, { MobileNavElmsProvider } from '../../../../helpers/structs/mobileNavElements';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { PreferencesInitialTypes } from '../../../../redux/preferencesReduxStore/initialState';
import { setMobileNavActiveElm } from '../../../../redux/preferencesReduxStore/actions';

import SingleNavigationElement from './SingleNavigationElement';
import useChangeRoutePath from '../../../../helpers/hooks/useChangeRoutePath';

interface PropsProvider {
    setPosition: Dispatch<SetStateAction<number>>;
}

/**
 * Component is responsible for generating all mobile navigation elements. Setting
 * position based on callback props function.
 *
 * @param setPosition { Dispatch<SetStateAction<number>> } - callback function to set position.
 */
const MultipleNavElements: React.FC<PropsProvider> = ({ setPosition }): JSX.Element => {

    const { mobileNavActiveElement }: PreferencesInitialTypes = useSelector((state: RootState) => state.preferencesReducer);
    const timeoutRoutePath = useChangeRoutePath();

    const dispatcher = useDispatch();

    const generateAllAnchors = MOBILE_NAV_ELMS.map((navElm: MobileNavElmsProvider, id: number) => {
        const chooseActiveElm: string = mobileNavActiveElement === id ? 'Fill' : 'Outline';

        const handleNavigationClick = (clickedElement: number) => {
            dispatcher(setMobileNavActiveElm(clickedElement, MOBILE_NAV_ELMS.length));
            setPosition(clickedElement * 100);
            timeoutRoutePath(navElm.path);
        };

        return (
            <SingleNavigationElement
                key = {id}
                pathAttr = {{ path: navElm.path, id }}
                action = {handleNavigationClick}
                icon = {`Ai${chooseActiveElm}${navElm.iconFamilySufix}`}
            />
        );
    });

    return (
        <Fragment>
            {generateAllAnchors}
        </Fragment>
    );
};

export default MultipleNavElements;