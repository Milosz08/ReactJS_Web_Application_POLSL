/**
 * @file CookiesHeader.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/24/2021
 */

import React from 'react';
import classnames from 'classnames';

const UniversalHeader = React.lazy(() => import('../../../layouts/UniversalHeader/UniversalHeader'));

const { cookiesInfoHeader } = require('./../../../layouts/Navigation/Navigation.module.scss');
const { cookiesSections, cookieContent } = require('./../CookiesPolicyPage.module.scss');

/**
 * @details Component generates a header in the subpage containing the privacy policy document.
 */
const CookiesHeader = (): JSX.Element => {
   return (
      <header className = {classnames(cookiesInfoHeader, cookiesSections)}>
         <UniversalHeader
            iconP = {['fas', 'cookie-bite']}
            content = 'Polityka Cookies'
            ifCloseButtonVisible = {false}
         />
         <div className = {cookieContent}>
            Poniższa treść Polityki Cookies określa zasady zapisywania i uzyskiwania dostępu do danych na
            Urządzeniach elektronicznych, dalej nazywanych Urządzeniami Użytkowników korzystających z
            Serwisu do celów świadczenia usług drogą elektroniczną przez Administratora Serwisu.
         </div>
      </header>
   );
}

export default CookiesHeader;