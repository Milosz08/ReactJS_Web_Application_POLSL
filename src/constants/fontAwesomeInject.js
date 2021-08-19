/**
 * @file fontAwesomeInject.js
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief JavaScript file storing constants values.
 *
 * @project_name "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactFontAwesome: "^0.1.15"
 *                ReactFontAwesomeSvgCore: "^1.2.36"
 *                ReactFontAwesomeSvgIcons: "^5.15.4"
 *                ReactFontAwesomeFreeRegularSvgIcons: "^5.15.3"
 *                ReactFontAwesomeFreeBrandsSvgIcons: "^5.15.3"
 *
 * @date final version: 08/19/2021
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