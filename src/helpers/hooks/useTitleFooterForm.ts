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
import { useRef } from 'react';

import { gsap } from 'gsap';

/**
 *
 */
const useTitleFooterForm = (): [ React.MutableRefObject<null>, () => void ] => {

    const grabber = useRef(null);
    const tl = gsap.timeline({ defaults: { x: 55 } });

    const handleShowPosMess = () => {
        if(grabber !== null) {
            tl.to(grabber.current, {
                x: -250
            })
              .to(grabber.current, {
                  x: 55,
                  delay: 2
              });
        }
    };

    return [ grabber, handleShowPosMess ]
};

export default useTitleFooterForm;