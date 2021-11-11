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

import { ScheduleGotoInputButton } from '../ScheduleForm.styles';
import { useContext } from 'react';
import { ExecuteScrollContext, ExecuteScrollContextTypes } from '../../../pages/SchedulePage';

/**
 * Component responsible for generate goto button, which send user directly into schedule section.
 */
const ScheduleGotoButton: React.FC = (): JSX.Element => {

    const { executeScroll } = useContext<Partial<ExecuteScrollContextTypes>>(ExecuteScrollContext);

    const handleGotoButton = (): void => {
        executeScroll!();
    };

    return (
        <ScheduleGotoInputButton
            onClick = {handleGotoButton}
            title = 'Przejdź do planu'
            type = 'button'
        >
            Przejdź do planu
        </ScheduleGotoInputButton>
    );
};

export default ScheduleGotoButton;