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