/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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

import axiosInstance from '../misc/request';
import bcrypt from 'bcryptjs';

import { API_ENDPOINTS } from '../structs/appEndpoints';

export enum ROLES {
    UNDEFINED, USER, MODERATOR, ADMIN
}

/**
 * Universal class responsible for fetch from database crypted login, password and token based api endpoint
 * role parameter. If in constructor token was not included, then is empty string (in user or undefined).
 * Class also validate all elements and response validate values object.
 */
class LoginValidator {

    private readonly _role: ROLES = 0;

    private readonly _inputFields: { [key: string]: string } = {
        username: '', password: '', token: ''
    };

    private _databaseFields: { [key: string]: string } = {
        username: '', password: '', token: ''
    };

    private _errorFields: { [key: string]: boolean } = {
        username: false, password: false, token: false
    };

    public constructor(username: string, password: string, role: ROLES, token = '') {
        this._inputFields.username = username;
        this._inputFields.password = password;
        this._inputFields.token = token;
        this._role = role;
    };

    private async fetchDBrole(): Promise<any> {
        const { data } = await axiosInstance.get(`${API_ENDPOINTS.AUTHENTICATIONS}/${this._role}`);
        Object.keys(this._databaseFields).forEach(key => {
            this._databaseFields[key] = data[key];
        });
    };

    private async checkAllGood() {
        Object.keys(this._inputFields).forEach(key => {
            this._errorFields[key] = !bcrypt.compareSync(this._inputFields[key], this._databaseFields[key]);
        });
    };

    public async initialise() {
        await this.fetchDBrole();
        await this.checkAllGood();
    };

    public get__errorFields(): { [value: string]: boolean } {
        return this._errorFields;
    };

}

export default LoginValidator;