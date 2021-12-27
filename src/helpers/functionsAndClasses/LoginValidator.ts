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

    private _extendedErrorFields: { [key: string]: boolean } = {
        passRepeat: false, adminPass: false
    };

    public constructor(username: string, password: string, role: ROLES, token = '') {
        this._inputFields.username = username;
        this._inputFields.password = password;
        this._inputFields.token = token;
        this._role = role;
    };

    private async fetchDBrole(): Promise<any> {
        const { data } = await axiosInstance.get(`${API_ENDPOINTS.AUTHENTICATIONS}/${this._role}`);
        if (Boolean(data)) {
            Object.keys(this._databaseFields).forEach(key => {
                this._databaseFields[key] = data[key];
            });
        } else {
            Object.keys(this._databaseFields).forEach(key => {
                this._databaseFields[key] = '';
            });
        }
    };

    private async checkAllGood(): Promise<any> {
        Object.keys(this._inputFields).forEach(key => {
            this._errorFields[key] = !bcrypt.compareSync(this._inputFields[key], this._databaseFields[key]);
        });
    };

    public async initialise(): Promise<any> {
        await this.fetchDBrole();
        await this.checkAllGood();
    };

    public async validateNewFields(adminPass: string, repeatPass: string): Promise<any> {
        const { data } = await axiosInstance.get(`${API_ENDPOINTS.AUTHENTICATIONS}/${ROLES.ADMIN}`);
        const validateAdminPass = !bcrypt.compareSync(adminPass, data.password);
        if (adminPass.length < 4 || validateAdminPass) {
            this._extendedErrorFields.adminPass = true;
        }
        if (repeatPass !== this._inputFields.password) {
            this._extendedErrorFields.passRepeat = true;
        }
        Object.keys(this._inputFields).forEach(key => {
            if (this._inputFields[key].length < 4) {
                this._errorFields[key] = true;
            }
        });
    };

    public get__errorFields(): { [value: string]: boolean } {
        return this._errorFields;
    };

    public get__extendedErrorFields(): { [value: string]: boolean } {
        return this._extendedErrorFields;
    };

}

export default LoginValidator;