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

import { useEffect, useState } from 'react';

import { MAX_INACTIVITY_TIME } from '../../components/layouts/SessionSequencer/SessionSequencer.config';

/**
 * Custom hook, that change normal countdown (from 0 to n) into timer from up to down.
 *
 * @param counter { number } - useEffect listener and counting value.
 */
const useCountingFromUpToDown = (counter: number) => {

    const [ timeCounting, setTimeCounting ] = useState<string>('');

    useEffect(() => {
        const handleEveryTick = () => {
            const fullSeconds = MAX_INACTIVITY_TIME * 60;
            const expireTime = fullSeconds - counter;

            const onlyMinutes = Math.floor(expireTime / 60);
            const onlyMinutesWithZero = onlyMinutes < 10 ? `0${onlyMinutes}` : onlyMinutes;

            const onlySeconds = expireTime - onlyMinutes * 60;
            const onlySecondsWithZero = onlySeconds < 10 ? `0${onlySeconds}` : onlySeconds;

            setTimeCounting(`${onlyMinutesWithZero}:${onlySecondsWithZero}`);
        }
        handleEveryTick();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ counter ]);

    return timeCounting;
};

export default useCountingFromUpToDown;