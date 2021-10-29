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

import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook responsible for animating the header along with its componentsAndMiddleware.
 * Takes one parameter and returns an object.
 *
 * @param listenerElement { boolean } - based on the actuation value of useEffect.
 */
const useHeaderOnScroll = (listenerElement: boolean) => {

    const grabber = useRef<HTMLDivElement>(null);

    const [ width, setWidth ] = useState<number>(window.innerWidth);
    const [ offset, setOffset ] = useState<number>(width < 1250 ? 0 : window.pageYOffset);

    const [ menuSticky, setMenuSticky ] = useState<boolean>(false);
    const [ headerHide, setHeaderHide ] = useState<boolean>(false);
    const [ elmHeight, setElmHeight ] = useState<number>(0);

    useEffect(() => {
        let prevScrollpos = window.pageYOffset;
        const handleScroll = () => {
            if (grabber.current != null && width > 1250) {
                if (offset > grabber.current.offsetHeight) {
                    setMenuSticky(true);
                } else {
                    setMenuSticky(false);
                }
            } else if (grabber.current != null && width < 1250) {
                if (offset > 200 && !listenerElement) {
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
        };
        if (grabber.current != null && width > 1250) {
            setElmHeight(grabber.current.offsetHeight);
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
    }, [ listenerElement, offset, width ]);

    return { grabber, menuSticky, headerHide, elmHeight, width, offset };
};

export default useHeaderOnScroll;