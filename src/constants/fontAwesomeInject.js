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

import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import * as Regular from '@fortawesome/free-regular-svg-icons';
import * as Brand from '@fortawesome/free-brands-svg-icons';

/**
 * List of all normal icons.
 */
const iconList = Object
    .keys(Icons)
    .filter(key => key !== 'fas' && key !== 'prefix')
    .map(icon => Icons[icon]);

/**
 * List of all narrow icons.
 */
const iconRegular = Object
    .keys(Regular)
    .filter(key => key !== 'far' && key !== 'prefix')
    .map(icon => Regular[icon]);

/**
 * List of all brands icons.
 */
const iconBrand = Object
    .keys(Brand)
    .filter(key => key !== 'fab' && key !== 'prefix')
    .map(icon => Brand[icon]);

library.add(...iconList, ...iconRegular, ...iconBrand);