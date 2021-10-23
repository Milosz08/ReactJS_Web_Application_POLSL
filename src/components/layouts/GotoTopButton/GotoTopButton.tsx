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
import useGotoTopButton from '../../../helpers/hooks/useGotoTopButton';

import { GotoTopButtonContainer } from './GotoTopButton.styles';

/**
 * Component that adds a button (in the fixed position) that allows you to go to the top of the page after
 * clicking. The button is visible only when the scroll position (from the top of the page) exceeds the
 * value of 200 units (px).
 */
const GotoTopButton = (): JSX.Element => {

    const showGoto = useGotoTopButton();

    const handleClickGotoTop = () => {
        document.body.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <GotoTopButtonContainer
            ifActive = {showGoto}
            onClick = {handleClickGotoTop}
        />
    );
}

export default GotoTopButton;