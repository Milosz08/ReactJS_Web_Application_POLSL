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

import React, { useContext, useState } from 'react';

import { MainStoreContext, MainStoreProviderTypes } from '../../../contextStore/MainStoreProvider';

import axiosInstance from '../../../helpers/misc/request';
import getSingleDateObjects from '../../../constants/getSingleDateObjects';


/**
 * Constants describing the properties of the textarea JSX tag.
 */
const MIN_LENGTH_TEXTAREA: number = 10;
const MAX_LENGTH_TEXTAREA: number = 300;

/**
 * Interface defining the type of state values.
 */
interface StateProvider {
    userName: string;
    typeOfMessage: string;
    messageArea: string;
    agreeCheck: boolean;
}

/**
 * Interface defining the type of Boolean Map Objects
 */
interface BooleanMap {
    [index: string]: boolean;
}

/**
 * @details Component that implements the form to the footer. It is also responsible for sending data from the React
 *          state to the database as a single object (record). The component also includes full form validation.
 */
const FooterForm = (): JSX.Element => {

    const { dataFetchFromServer, setDataFetchFromServer } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const { footerForms } = dataFetchFromServer;

    const [ formInputs, setFormInputs ] = useState<StateProvider>({
        userName: '', typeOfMessage: 'pageError', messageArea: '', agreeCheck: false
    });
    const [ errors, setErrors ] = useState<BooleanMap>({
        userName: false, messageArea: false, agreeCheck: false, allCorrect: false
    });
    const [ showPosMess, setShowPosMess ] = useState<boolean>(false);

    const validateForm = (): BooleanMap => {
        const { userName, messageArea, agreeCheck } = formInputs;
        let userNameBool = false, messageAreaBool = false, agreeCheckBool = false, allCorrectBool = false;

        if (userName.length > 5 && userName.indexOf(' ') === -1 && userName.length < 20) {
            userNameBool = true;
        }
        if (messageArea.length > MIN_LENGTH_TEXTAREA && messageArea.length < MAX_LENGTH_TEXTAREA) {
            messageAreaBool = true;
        }
        if (agreeCheck) {
            agreeCheckBool = true;
        }
        if (userNameBool && messageAreaBool && agreeCheckBool) {
            allCorrectBool = true;
        }

        return { userNameBool, messageAreaBool, agreeCheckBool, allCorrectBool };
    }

    const postSendFormData = async (): Promise<any> => {
        const date = new Date();
        const copy = [ ...footerForms ];
        const { day, month, hours, minutes, seconds } = getSingleDateObjects(date);
        const { userName, typeOfMessage, messageArea } = formInputs;
        const objectToSend = {
            userIdentity: userName,
            userChoice: typeOfMessage,
            userMessage: messageArea,
            sendDate: {
                fullDate: `${day}/${month}/${date.getFullYear()}`,
                fullTime: `${hours}:${minutes}:${seconds}`,
            }
        }
        const res = await axiosInstance.post('/footer-form', objectToSend);
        const newFormFromUser = res.data;
        copy.push(newFormFromUser);
        setDataFetchFromServer({ ...dataFetchFromServer, footerForms: copy });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const showPositiveMessage = (): void => {
            setShowPosMess(true);
            const hidePositiveMessage = () => setShowPosMess(false);
            setTimeout(hidePositiveMessage, 4000);
        }

        const { userNameBool, messageAreaBool, agreeCheckBool, allCorrectBool } = validateForm();
        if (allCorrectBool) {
            setFormInputs({ userName: '', typeOfMessage: 'pageError', messageArea: '', agreeCheck: false });
            setErrors({ userName: false, messageArea: false, agreeCheck: false, allCorrect: false });
            showPositiveMessage();
            postSendFormData();
        } else {
            setErrors({
                userName: !userNameBool, messageArea: !messageAreaBool,
                agreeCheck: !agreeCheckBool, allCorrect: !allCorrectBool
            });
        }
    }

    return (
        <form onSubmit = {handleSubmit} noValidate>
           123
        </form>
    );
}

export default FooterForm;