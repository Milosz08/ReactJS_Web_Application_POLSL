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

import { useEffect } from 'react';

import { RootState } from '../../redux/reduxStore';
import { useDispatch, useSelector } from 'react-redux';
import { ModalsActions } from '../../redux/modalsReduxStore/actions';
import { ModalsInitialTypes } from '../../redux/modalsReduxStore/initialState';
import { allModals, allModalsActions, allModalsInputs } from '../../redux/modalsReduxStore/types';

/**
 * Custom hook responsible for auto filled content elements in EDIT_MODAL.
 *
 * @param modalType { allModals } - modal selected type.
 * @param modalInputArr { allModalsInputs[] } - all modal inputs.
 * @param inputValuesArr { any[] } - all modal inputs values.
 * @param loadCallbackAddtlValues { () => void? } - callback function loading additional content.
 */
const useAutoFilledModalEdit = (
    modalType: allModals, modalInputArr: allModalsInputs[], inputValuesArr: any[], loadCallbackAddtlValues?: () => void
): void => {

    const modal: ModalsInitialTypes = useSelector((state: RootState) => state.modalsReducer);
    const dispatcher = useDispatch();
    
    const selectedModal = modal[modalType];

    useEffect(() => {
        if(modalInputArr.length !== inputValuesArr.length) {
            throw new Error('Both of arrays must be same length!');
        } else {
            if(selectedModal.ifOpen && selectedModal.action === allModalsActions.EDIT_ELEMENT) {
                if(loadCallbackAddtlValues) {
                    loadCallbackAddtlValues!();
                }
                for(let i = 0; i < modalInputArr.length; i++) {
                    dispatcher(ModalsActions.changeModalSelectedInput(modalType, modalInputArr[i], inputValuesArr[i]));
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ dispatcher, selectedModal.ifOpen ]);
};

export default useAutoFilledModalEdit;