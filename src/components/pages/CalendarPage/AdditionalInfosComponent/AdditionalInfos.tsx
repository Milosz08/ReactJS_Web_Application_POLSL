/**
 * @file CalendarPage.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React from 'react';

const UniversalHeader = React.lazy(() => import('../../../layouts/UniversalHeader/UniversalHeader'));

const { universalHeader } = require('./../../../layouts/Navigation/Navigation.module.scss');
const { legendInfo } = require('./AdditionalInfos.module.scss');

/**
 * @details Component responsible for generating the calendar activity validity information panel.
 */
const AdditionalInfos = (): JSX.Element => (
    <section className = {universalHeader}>
        <UniversalHeader
            iconP = {[ 'fas', 'info-circle' ]}
            content = 'Dodatkowe Informacje'
            ifCloseButtonVisible = {false}
        />
        <div className = {legendInfo}>
            <ul>
                <li><span>Kolor zielony</span> - aktywności o niskim priorytecie</li>
                <li><span>Kolor żółty</span> - aktywności o średnim priorytecie</li>
                <li><span>Kolor czerwony</span> - aktywności o wysokim priorytecie</li>
            </ul>
        </div>
    </section>
);

export default AdditionalInfos;