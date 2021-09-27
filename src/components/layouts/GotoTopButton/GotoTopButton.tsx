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

import React, { useEffect, useState } from 'react';
import classnames from 'classnames';

const { gotoTopWrapper, showGotoButton } = require('./GotoTopButton.module.scss');

/**
 * @details Component that adds a button (in the fixed position) that allows you to go to the top of the page after
 *          clicking. The button is visible only when the scroll position (from the top of the page) exceeds the
 *          value of 200 units (px).
 */
const GotoTopButton = (): JSX.Element => {

    const [ offset, setOffset ] = useState<number>(window.pageYOffset);
    const [ showGoto, setShowGoto ] = useState<boolean>(false);

    useEffect(() => {
        const handleOnScroll = () => {
            if (offset > 200) {
                setShowGoto(true);
            } else {
                setShowGoto(false);
            }
            setOffset(window.pageYOffset);
        }
        if (offset === 0) {
            setShowGoto(false);
        }
        window.addEventListener('scroll', handleOnScroll);
        return () => window.removeEventListener('scroll', handleOnScroll);
    }, [ offset ]);


    const handleClickGotoTop = () => document.body.scrollIntoView({ behavior: 'smooth' });
    const toggleClass = showGoto ? showGotoButton : '';

    return (
        <button
            className = {classnames(gotoTopWrapper, toggleClass)}
            onClick = {handleClickGotoTop}
        />
    );
}

export default GotoTopButton;