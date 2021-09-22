/**
 * @file ScheduleSections.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { Fragment, useEffect, useState } from 'react';
import ROUTING_PATH_NAMES from '../../../constants/routingPathNames';

const CookiesNotification = React.lazy(() => import('../../layouts/CookiesNotification/CookiesNotification'));
const MobileDownNav = React.lazy(() => import('../../layouts/MobileDownNav/MobileDownNav'));
const Header = React.lazy(() => import('../../layouts/Header/Header'));
const Slider = React.lazy(() => import('./Slider/Slider'));
const CovidInfo = React.lazy(() => import('./CovidInfo/CovidInfo'));
const CountDown = React.lazy(() => import('./CountDown/CountDown'));
const Navigation = React.lazy(() => import('../../layouts/Navigation/Navigation'));
const Subjects = React.lazy(() => import('../../layouts/Subjects/Subjects'));

/**
 * @details Component responsible for generating the start page (absolute address - "/").
 */
const StartPage = (): JSX.Element => {

    const [ widthX, setWidthX ] = useState<number>(document.body.offsetWidth);

    useEffect(() => {
        document.title = ROUTING_PATH_NAMES.START_PAGE;
        return () => {
            document.title = ROUTING_PATH_NAMES.START_PAGE
        };
    }, []);

    useEffect(() => {
        const onResize = () => {
            setWidthX(document.body.offsetWidth);
        }
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [ widthX ]);

    return (
        <Fragment>
            <CookiesNotification/>
            <MobileDownNav id = {0}/>
            <Header ifHeaderHasRedBar = {true}/>
            <Slider autoPlay = {widthX >= 1250} duration = {5}/>
            <CovidInfo/>
            <CountDown/>
            <Navigation ifHeader = {false}/>
            <Subjects/>
        </Fragment>
    );
}

export default StartPage;
