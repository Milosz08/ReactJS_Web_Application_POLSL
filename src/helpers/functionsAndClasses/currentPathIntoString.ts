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

/**
 * Class responsible for convertsion multiple raw browser path names in single string into
 * fancy names for navigate section under the header.
 */
class CurrentPathIntoString {

    private readonly _currPath: string = decodeURI(window.location.pathname).toString().slice(1);
    private _allLinks: string[] = this._currPath.split('/', this._currPath.split('/').length);

    public convertData(): { name: string, path: string }[] {
        let prevPathname: string = '';
        return this._allLinks.map(pathname => {
            const withoutDot: string = pathname.replaceAll('-', ' ');
            const sigleWordArray = withoutDot.split(' ', withoutDot.split(' ').length + 1);
            return {
                name: this.capitaliseFirstLetter(sigleWordArray),
                path: prevPathname += `/${pathname}`
            };
        });
    };

    private capitaliseFirstLetter(word: string[]): string {
        return word.map((character: string) => {
            const lower: string = character.toLocaleLowerCase();
            return character.charAt(0).toUpperCase() + lower.slice(1);
        }).join(' ');
    };
}

export default CurrentPathIntoString;