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
import { useContext, useEffect } from 'react';

import useFilteredDivideList from '../../../../../helpers/hooks/useFilteredDivideList';
import { SearchingContext, SearchingTypes } from '../../../../../context/searchingContext/SearchingProvider';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/reduxStore';
import { allModals } from '../../../../../redux/modalsReduxStore/types';
import { PrefActions } from '../../../../../redux/preferencesReduxStore/actions';
import { ModalsInitialTypes } from '../../../../../redux/modalsReduxStore/initialState';
import { cmsListIndicators, prefFields, searchInputs } from '../../../../../redux/preferencesReduxStore/types';

import { CmsUnorderedList } from './HighOrderComponents.styles';

const EmptyContent = React.lazy(() => import('./EmptyContent'));
const UniversalListNavigate = React.lazy(() => import('../../../UniversalListNavigate/UniversalListNavigate'));
const NotFindContent = React.lazy(() => import('../../../NotFindContent/NotFindContent'));
const CmsAddNewContentButton = React.lazy(() => import('../../CmsAddNewContentButton/CmsAddNewContentButton'));

interface PropsProvider {
    inputType: searchInputs;
    cmsListIndicator: cmsListIndicators;
    notFind?: string;
    modalType?: allModals;
    buttonNewContent?: string;
    currDay?: string;
    components: {
        ListRender: React.FC<PropsProvider> | any;
        HeaderRender: React.FC<PropsProvider> | any;
    };
}

/**
 * High order component responsible for generate all multiple elements list. Implements
 * universal list navigate component. Usage in CMS system.
 *
 * @param inputType { searchInputs } - filtered input enum.
 * @param cmsListIndicator { cmsListIndicator } - used specific list enum type.
 * @param notFind { ?string } - alternative text, if not find elements.
 * @param components { ListRender: React.FC<PropsProvider>, HeaderRender: React.FC<PropsProvider> } - JSX components.
 * @param modalType { ?allModals } - usable modal type for adding new content button.
 * @param buttonNewContent { ?string } - content string in button adding new content.
 * @param currDay { string? } - subject single day list indicator.
 */
const MultipleElementsList: React.FC<PropsProvider> = ({
    inputType, cmsListIndicator, notFind, modalType, buttonNewContent, currDay, components
}): JSX.Element => {

    const modalsInitialState: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);
    const { filteredState, ifLengthIsNull } = useContext<Partial<SearchingTypes>>(SearchingContext);

    const { ListRender, HeaderRender } = components;
    const modalListener = modalsInitialState[modalType!];

    const [ disableOnFinding, generateListElements ] = useFilteredDivideList(inputType, cmsListIndicator, ListRender, currDay!);
    const dispatcher = useDispatch();

    useEffect(() => {
        dispatcher(PrefActions.changeSecondRootPrefField(
            prefFields.SEARCH_INPUTS_ERRORS, inputType, filteredState!.length === 0 && !ifLengthIsNull!
        ));
    }, [ dispatcher, filteredState, ifLengthIsNull, inputType, modalListener ]);

    return (
        <>
            {!ifLengthIsNull! && <UniversalListNavigate
                type = {cmsListIndicator}
                listItemsLength = {filteredState!.length}
                visibilityOnSearch = {disableOnFinding && !ifLengthIsNull!}
            />}
            <HeaderRender/>
            <CmsUnorderedList>
                {generateListElements}
            </CmsUnorderedList>
            {ifLengthIsNull! && <EmptyContent
                content = {notFind || 'elementu'}
            />}
            {Boolean(modalType) && ((filteredState?.length !== 0) || ifLengthIsNull!) && <CmsAddNewContentButton
                modalType = {modalType!}
                content = {buttonNewContent}
                currDay = {currDay}
            />}
            <NotFindContent
                ifVisible = {filteredState?.length === 0 && !ifLengthIsNull!}
                content = {notFind || 'elementu'}
            />
        </>
    );
};

export default MultipleElementsList;