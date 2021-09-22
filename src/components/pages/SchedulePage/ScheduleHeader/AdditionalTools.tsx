/**
 * @file ScheduleNormalGroupInputs.tsx
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

import React, { useContext, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes } from '../../../../contextStore/MainStoreProvider';
import { ScheduleContext, ScheduleType } from '../../../../contextStore/ScheduleProvider';
import ROUTING_PATH_NAMES from '../../../../constants/routingPathNames';

const UniversalHeader = React.lazy(() => import('../../../layouts/UniversalHeader/UniversalHeader'));
const ComponentToPrint = React.lazy(() => import('../../../layouts/ComponentToPrint/ComponentToPrint'));
const DataLastUpdate = React.lazy(() => import('../../../layouts/DataLastUpdate/DataLastUpdate'));

const { scheduleRender } = require('./../../../layouts/Navigation/Navigation.module.scss');
const { progressBar, progressActive, colored, activeBar, generateButton, underInfo } = require('./../SchedulePage.module.scss');

/**
 * @details Component that generates the section Additional tools to the class plan (the ability to create a PDF file).
 */
const AdditionalTools = (): JSX.Element => {

    const { dataFetchFromServer, summerBreak } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
    const { groupSelected, engSelected } = useContext<Partial<ScheduleType>>(ScheduleContext);
    const { scheduleSubjects } = dataFetchFromServer;

    const componentRef: React.MutableRefObject<any> = useRef<HTMLElement>();

    const [ date, setDate ] = useState<Date>(new Date());
    const [ show, setShow ] = useState<boolean>(false);
    const [ widthState, setWidthState ] = useState<number>(0);

    const resetValues = (): void => {
        document.title = ROUTING_PATH_NAMES.SCHEDULE_PAGE;
        setShow(false);
        setWidthState(0);
    }

    const handlePrint: (() => void) | undefined = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'PDF | Plan Zajęć',
        onAfterPrint: () => resetValues(),
    });

    const handleGeneratePDF = (): void => {
        let count: number = 0;
        let index: NodeJS.Timeout;
        const asyncLoadingBar = (): void => {
            setWidthState(++count);
            document.title = `${count}% | Generowanie Planu`;
            if (count === 100) {
                clearInterval(index);
                if (handlePrint) {
                    handlePrint();
                }
            }
        }
        index = setInterval(asyncLoadingBar, 100);
        setShow(true);
        setDate(new Date());
    }

    const toggleClass: string = show ? classnames(progressBar, activeBar) : progressBar;

    return (
        <section className = {scheduleRender}>
            <DataLastUpdate
                dataID = {process.env.REACT_APP_SCHEDULE_ID}
                content = 'planu zajęć'
                withoutText = {false}
            />
            <UniversalHeader
                iconP = {[ 'fas', 'tools' ]}
                content = 'Dodatkowe narzędzia'
                ifCloseButtonVisible = {false}
            />
            <button
                onClick = {handleGeneratePDF}
                className = {generateButton}
                disabled = {summerBreak}
                title = {summerBreak ? 'Wygenerowanie pustego planu zajęć nie jest możliwe' : 'Wygeneruj plan zajęć w formie PDF'}
            >
                Wygeneruj plan w formie pliku PDF
            </button>
            <span className = {underInfo}>
            Generowanie planu zajmuje średnio 10 sekund (zależne od ilości przedmiotów w bazie danych).
         </span>
            <div style = {{ display: 'none' }}>
                <ComponentToPrint
                    ref = {componentRef}
                    date = {date}
                    subjects = {scheduleSubjects}
                    groupSelected = {groupSelected!}
                    engSelected = {engSelected!}
                />
            </div>
            <aside className = {toggleClass}>
                <span className = {widthState === 100 ? colored : ''}>{widthState}%</span>
                <div className = {progressActive} style = {{ width: `${widthState}%` }}/>
            </aside>
        </section>
    );
}

export default AdditionalTools;