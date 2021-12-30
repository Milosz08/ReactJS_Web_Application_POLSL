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

import CryptoJS, { AES } from 'crypto-js';
import { decrypt } from 'react-crypt-gsm';

/**
 * Utils methods class.
 */
class Utils {

    public static setScrollPositionToZero(): void {
        window.onbeforeunload = () => window.scrollTo(0, 0);
    };

    public static disableAnimationsOnResize(): void {
        let resizeTimer: NodeJS.Timeout;
        window.addEventListener('resize', (): void => {
            document.body.classList.add('stopTransitions');
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout((): void => {
                document.body.classList.remove('stopTransitions');
            }, 400);
        });
    };

    public static decrData(data: string, salt: string = '') {
        return CryptoJS.enc.Utf8.stringify(AES.decrypt(data, salt));
    };

    public static cookieDecrData({ content, tag }: any) {
        return decrypt({ content, tag: new Uint8Array(tag.data) });
    }

}

export default Utils;