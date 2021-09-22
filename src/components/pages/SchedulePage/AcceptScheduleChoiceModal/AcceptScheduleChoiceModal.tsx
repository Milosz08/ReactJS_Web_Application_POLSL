/**
 * @file AcceptScheduleChoiceModal.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { useContext, useEffect, useState } from 'react';
import classnames from 'classnames';
import { GlobalModalsStateContext, GlobalModalsStateTypes } from '../../../../contextStore/GlobalModalsStateProvider';

const UniversalHeader = React.lazy(() => import('../../../layouts/UniversalHeader/UniversalHeader'));

const {
    scheduleSaveContainer, scheduleSaveWrapper, active, scheduleSaveContent, whenCloseWindow, show
} = require('./AcceptScheduleChoiceModal.module.scss');

/**
 * A constant that describes the number of seconds after which the modal will close automatically.
 */
const COUNTING_VALUE: number = 3;

/**
 * @details Component responsible for generating the modal with information about the saved timetable selection to the cookie
 *          file. After installing the component, a timer is started automatically, which after counting down the time
 *          according to the constant "COUNTING_VALUE" closes the modal.
 */
const AcceptScheduleChoiceModal = (): JSX.Element => {

    const { onSaveOpenModal, setOnSaveOpenModal } = useContext<Partial<GlobalModalsStateTypes>>(GlobalModalsStateContext);

    const [ counting, setCounting ] = useState<number>(COUNTING_VALUE);
    const [ containerVisible, setContainerVisible ] = useState<string>('');
    const [ animShow, setAnimShow ] = useState<string>('');

    useEffect(() => {
        if (onSaveOpenModal) {
            let count: number = COUNTING_VALUE;
            let index: NodeJS.Timeout;
            const asyncLoadingBar = () => {
                setCounting(--count);
                if (count === 0) {
                    clearInterval(index);
                    setOnSaveOpenModal!(false);
                    setAnimShow('');
                    setTimeout(() => setContainerVisible(''), 200);
                }
            }
            index = setInterval(asyncLoadingBar, 1000);
            setContainerVisible(show);
            setTimeout(() => setAnimShow(active), 200);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ onSaveOpenModal ]);

    return (
        <div className = {classnames(scheduleSaveContainer, containerVisible, animShow)}>
            <div className = {classnames(scheduleSaveWrapper, animShow)}>
                <UniversalHeader
                    iconP = {[ 'fas', 'info-circle' ]}
                    content = 'Informacja'
                    ifCloseButtonVisible = {false}
                />
                <span className = {scheduleSaveContent}>
               Twój wybór został zapisany. Przy kolejnym wejściu na stronę, aplikacja automatycznie ustawi
               wybrane przez Ciebie preferencje.
            </span>
                <span className = {whenCloseWindow}>
               Okno zamknie się automatycznie za: <strong>{counting}</strong>
            </span>
            </div>
        </div>
    );
}

export default AcceptScheduleChoiceModal;