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

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import useMultipleRef from './useMultipleRef';
import useIsMount from './useIsMount';

/**
 * Custom hook responsible for providing modal open/close smooth animation, based on Y axios
 * and autoAlpha gsap property (opacity + visibility).
 *
 * @param modalListener { boolean } - listener, which indicated if modal is open or close.
 * @param movePX { number } - value of move modal into Y axios (default 30px).
 */
const useModalShowHide = (modalListener: boolean, movePX: number = 30) => {

    const tl = useRef<gsap.core.Timeline>(gsap.timeline());

    const [ modal, background ] = useMultipleRef(2);
    const isMount = useIsMount();

    useEffect(() => {
        const timeline = tl.current;
        if (modal && background && !isMount) {
            if (modalListener) {
                document.body.style.overflowY = 'hidden';
                timeline
                    .to(background['current'], { autoAlpha: 1 })
                    .fromTo(modal['current'], { y: movePX }, { autoAlpha: 1, y: 0 });
            } else {
                document.body.style.overflowY = 'scroll';
                timeline
                    .to(modal['current'], { autoAlpha: 0, y: Number(`-${movePX}`) })
                    .to(background['current'], { autoAlpha: 0 })
            }
        }
    }, [ background, isMount, modal, modalListener, movePX ]);

    return [ modal, background ];
};

export default useModalShowHide;