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

import React, { useContext, useEffect, useRef, useState } from 'react';
import DelayLink from 'react-delay-link';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes, ROUTER_INTERVAL_TIME } from '../../../contextStore/MainStoreProvider';
import CONSTANT_DATA from '../../../constants/staticData';

const Navigation = React.lazy(() => import('../Navigation/Navigation'));
const HamburgerMenu = React.lazy(() => import('./HamburgerMenu'));
const LoadingBigBar = React.lazy(() => import('../LoadingBigBar/LoadingBigBar'));
const CmsInfoBar = React.lazy(() => import('../CmsInfoBar/CmsInfoBar'));

const {
    topNavBar, topNavBarLinks, headerContainer, mainHeader, siteImportantInfo, stickyHeader, topSiteHeader,
    ifHeaderIsOnCookies, siteImportantInfoHide, navigationRouter, headerHideClass
} = require('./Header.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    ifHeaderHasRedBar: boolean;
}

/**
 * @details Component that generates the header on the page. Depending on the ifHeaderHasRedBar flag, header will
 *          have a red site bar underneath it.
 *
 * @param ifHeaderHasRedBar { boolean } - parameter defining whether the header should be shown with a red bar
 *                                        informing about the site (true -> active bar).
 */
const Header: React.FC<PropsProvider> = ({ ifHeaderHasRedBar }): JSX.Element => {

    const { TOP_NAVBAR_ELMS } = CONSTANT_DATA;
    const topHeaderHeightRef = useRef<HTMLElement | null>(null);

    const { timeoutRoutePath } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

    const [ width, setWidth ] = useState<number>(window.innerWidth);
    const [ offset, setOffset ] = useState<number>(width < 1250 ? 0 : window.pageYOffset);
    const [ menuSticky, setMenuSticky ] = useState<boolean>(false);
    const [ elmHeight, setElmHeight ] = useState<number>(0);
    const [ headerHide, setHeaderHide ] = useState<boolean>(false);
    const [ activeHamburger, setActiveHamburger ] = useState<boolean>(false);

    useEffect(() => {
        let prevScrollpos = window.pageYOffset;
        const handleScroll = () => {
            if (topHeaderHeightRef.current != null && width > 1250) {
                if (offset > topHeaderHeightRef.current.offsetHeight) {
                    setMenuSticky(true);
                } else {
                    setMenuSticky(false);
                }
            } else if (topHeaderHeightRef.current != null && width < 1250) {
                if (offset > 200 && !activeHamburger) {
                    const currentScrollPos = window.pageYOffset;
                    if (prevScrollpos > currentScrollPos) {
                        setHeaderHide(false);
                    } else {
                        setHeaderHide(true);
                    }
                    prevScrollpos = currentScrollPos;
                }
                setMenuSticky(true);
            }
            setOffset(window.pageYOffset);
        }
        if (topHeaderHeightRef.current != null && width > 1250) {
            setElmHeight(topHeaderHeightRef.current.offsetHeight);
        }
        if (offset === 0) {
            setMenuSticky(false);
        }

        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [ activeHamburger, offset, width ]);

    const topNavbarElm = TOP_NAVBAR_ELMS.map(singleLink => (
        <a
            key = {singleLink.title}
            href = {singleLink.link}
            target = '_blank'
            rel = 'noreferrer'
        >
            {singleLink.title}
        </a>
    ));

    const toggleMenuStickyClasses = menuSticky ? classnames(topSiteHeader, stickyHeader) : topSiteHeader;
    const hideHeaderBar = headerHide && width < 1250 ? headerHideClass : '';
    const toggleMainHeaderClasses = !ifHeaderHasRedBar ? classnames(mainHeader, ifHeaderIsOnCookies) : mainHeader;
    const toggleSiteInfoClasses = !ifHeaderHasRedBar
        ? classnames(siteImportantInfo, siteImportantInfoHide) : siteImportantInfo;

    return (
        <header
            className = {classnames(toggleMenuStickyClasses, hideHeaderBar)}
            style = {width > 1250 ? (menuSticky ? { top: `-${elmHeight}px` } : {}) : {}}
        >
            <nav
                className = {topNavBar}
                ref = {topHeaderHeightRef}
            >
                <div className = {topNavBarLinks}>
                    {topNavbarElm}
                </div>
            </nav>
            <div
                className = {headerContainer}
                style = {width > 1250 ? ({ height: `${offset > elmHeight ? 80 : (120 - offset)}px` }) : { height: 90 }}
            >
                <div className = {toggleMainHeaderClasses}>
                    <DelayLink
                        to = '/'
                        delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
                        replace = {false}
                        clickAction = {() => timeoutRoutePath!('/')}
                    >
                        <a href = '/'>
                            <img
                                src = {process.env.PUBLIC_URL + `/images/logosBaner.png`}
                                alt = 'banerLogo'
                            />
                        </a>
                    </DelayLink>
                    <div className = {navigationRouter}>
                        {ifHeaderHasRedBar && <Navigation ifHeader = {true}/>}
                    </div>
                    <HamburgerMenu
                        activeHamburger = {activeHamburger}
                        setActiveHamburger = {setActiveHamburger}
                    />
                </div>
            </div>
            <LoadingBigBar/>
            <div
                className = {toggleSiteInfoClasses}
                style = {{ transform: `translateY(-${offset}px)` }}
            >
                Nieoficjalna witryna internetowa kierunku "Informatyka" na wydziale Elektrycznym 2020/2021.
            </div>
            {document.location.pathname.includes('panel-administratora') && <CmsInfoBar/>}
        </header>
    );
}

export default Header;