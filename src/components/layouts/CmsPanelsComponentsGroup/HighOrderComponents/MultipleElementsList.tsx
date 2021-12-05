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

import useFilteredDivideList from '../../../../helpers/hooks/useFilteredDivideList';
import { SearchingContext, SearchingTypes } from '../../../../context/searchingContext/SearchingProvider';

import { useDispatch } from 'react-redux';
import { allModals } from '../../../../redux/modalsReduxStore/types';
import { setErrorsSearchInputs } from '../../../../redux/preferencesReduxStore/actions';
import { cmsListIndicators, searchInputs } from '../../../../redux/preferencesReduxStore/types';

import { CmsUnorderedList } from './HighOrderComponents.styles';

const UniversalListNavigate = React.lazy(() => import('../../UniversalListNavigate/UniversalListNavigate'));
const NotFindContent = React.lazy(() => import('../../NotFindContent/NotFindContent'));
const CmsAddNewContentButton = React.lazy(() => import('../../CmsAddNewContentButton/CmsAddNewContentButton'));

interface PropsProvider {
    inputType: searchInputs;
    cmsListIndicator: cmsListIndicators;
    notFind?: string;
    modalType?: allModals;
    buttonNewContent?: string;
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
 */
const MultipleElementsList: React.FC<PropsProvider> = ({
    inputType, cmsListIndicator, notFind, modalType, buttonNewContent, components
}): JSX.Element => {

    const { filteredState } = useContext<Partial<SearchingTypes>>(SearchingContext);
    const { ListRender, HeaderRender } = components;

    const dispatcher = useDispatch();

    const [ disableOnFinding, generateListElements ] = useFilteredDivideList(
        inputType, cmsListIndicator, ListRender
    );
    
    useEffect(() => {
        dispatcher(setErrorsSearchInputs(inputType, filteredState!.length === 0));
    }, [ dispatcher, filteredState, inputType ]);
    
    return (
        <>
            <UniversalListNavigate
                type = {cmsListIndicator}
                listItemsLength = {filteredState!.length}
                visibilityOnSearch = {disableOnFinding}
            />
            <HeaderRender/>
            <CmsUnorderedList>
                {generateListElements}
            </CmsUnorderedList>
            {Boolean(modalType) && <CmsAddNewContentButton
                modalType = {modalType!}
                content = {buttonNewContent}
            />}
            <NotFindContent
                ifVisible = {filteredState?.length === 0}
                content = {notFind || 'elementu'}
            />
        </>
    );
};

export default MultipleElementsList;