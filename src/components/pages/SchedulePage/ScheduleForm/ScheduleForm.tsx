/**
 * @file ScheduleForm.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactCryptGsm: "^1.0.4"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { useContext, useEffect } from 'react';

import { ScheduleContext, ScheduleType } from '../../../../contextStore/ScheduleProvider';
import { CookiesObjectsContext, CookiesObjectsTypes } from '../../../../contextStore/CookiesObjectsProvider';
import { GlobalModalsStateContext, GlobalModalsStateTypes } from '../../../../contextStore/GlobalModalsStateProvider';

import COOKIES_OBJECT from '../../../../constants/allCookies';
import GROUPS_STATIC from '../../../../constants/allGroups';
import cookieExpires from '../../../../constants/cookieExpires';

const UniversalHeader = React.lazy(() => import('../../../layouts/UniversalHeader/UniversalHeader'));
const ScheduleNormalGroupInputs = React.lazy(() => import('./ScheduleNormalGroupInputs'));
const ScheduleEngInputs = React.lazy(() => import('./ScheduleEngInputs'));

const { encrypt, decrypt } = require('react-crypt-gsm');

const { sheduleBlocks } = require('./../../../layouts/Navigation/Navigation.module.scss');
const {
    sheduleForm, backgroundImage, formContentWrapper, sheduleSubmit, saveSheduleChoices, saveChoice, resetChoice, gotoShedule
} = require('./ScheduleForm.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    executeScroll: () => void;
}

/**
 * @details A component that generates a selection field by the user (selection of a normal group, selection of a group from
 *          the English language) and enables saving this selection in two cookie files. The component additionally renders
 *          two components, the normal group selection and the English group selection, respectively.
 *
 * @param executeScroll { () => void } - function passed in props, each time saving the state in the cookie file, it
 *                                       moves to the top of the page (position 0,0) - animation reset.
 */
const ScheduleForm: React.FC<PropsProvider> = ({ executeScroll }): JSX.Element => {

    const { groupSelection, engGroupSelection } = COOKIES_OBJECT;
    const { NORMAL_GROUPS, ENG_GROUPS } = GROUPS_STATIC;

    const { groupSelected, setGroupSelected, engSelected, setEngSelected } = useContext<Partial<ScheduleType>>(ScheduleContext);
    const { setOnSaveOpenModal } = useContext<Partial<GlobalModalsStateTypes>>(GlobalModalsStateContext);
    const { cookie, setCookie, removeCookie } = useContext<Partial<CookiesObjectsTypes>>(CookiesObjectsContext);

    const createRememberCookie = (dataEncrypt: string, cookieName: string): void => {
        const encryptData = encrypt(dataEncrypt);
        const expCookie = cookieExpires(365);
        setCookie!(cookieName, encryptData, { path: '/', expires: expCookie });
    }

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        window.scrollTo(0, 0);
        e.preventDefault();
        setOnSaveOpenModal!(true);
        createRememberCookie(groupSelected!, groupSelection);
        createRememberCookie(engSelected!, engGroupSelection);
    }

    const cookieDecryptData = ({ content, tag }: any) => decrypt({ content, tag: new Uint8Array(tag.data) });

    useEffect(() => {
        const setDecryptedCookieValue = (): void => {
            if (cookie!.__groupSelection !== undefined || cookie!.__engGroupSelection !== undefined) {
                const decryptingCookieGroups = cookieDecryptData(cookie!.__groupSelection);
                setGroupSelected!(decryptingCookieGroups);

                const decryptingCookieEng = cookieDecryptData(cookie!.__engGroupSelection);
                setEngSelected!(decryptingCookieEng);
            }
        }
        setDecryptedCookieValue();
    }, [ setGroupSelected, setEngSelected, cookie ]);

    const handleResetValues = () => {
        window.scrollTo(0, 0);
        setOnSaveOpenModal!(true);
        setGroupSelected!(NORMAL_GROUPS[0].text);
        setEngSelected!(ENG_GROUPS[0]);
        removeCookie!(groupSelection);
        removeCookie!(engGroupSelection);
    }

    return (
        <section className = {sheduleBlocks}>
            <UniversalHeader
                iconP = {[ 'fas', 'clipboard-list' ]}
                content = 'Panel Zarządzania'
                ifCloseButtonVisible = {false}
            />
            <div className = {formContentWrapper}>
                <img
                    src = {process.env.PUBLIC_URL + '/images/sheduleBgc.png'}
                    alt = 'background additional'
                    className = {backgroundImage}
                />
                <form className = {sheduleForm} onSubmit = {handleFormSubmit}>
                    <ScheduleNormalGroupInputs/>
                    <ScheduleEngInputs/>
                    <div className = {sheduleSubmit}>
                        <button className = {saveChoice}>
                            Zapisz mój wybór
                        </button>
                        <button
                            className = {resetChoice}
                            disabled = {groupSelected === NORMAL_GROUPS[0].text && engSelected === ENG_GROUPS[0]}
                            onClick = {handleResetValues}
                            type = 'button'
                        >
                            Przywróć domyślnie
                        </button>
                        <button
                            className = {gotoShedule}
                            onClick = {executeScroll}
                            type = 'button'
                        >
                            Przejdź do Planu
                        </button>
                    </div>
                </form>
            </div>
            <div className = {saveSheduleChoices}>
                Po wybraniu właściwych opcji, poniższy plan wygeneruje się automatycznie. Jeśli natomiast chcesz
                zapisać swój wybór nawet po zamknięciu przeglądarki, kliknij w niebieski przycisk po prawej stronie.
                Aby zapisywanie wyboru zadziałało, twoja przeglądarka musi mieć włączoną obsługę plików Cookies.
            </div>
        </section>
    );
}

export default ScheduleForm;