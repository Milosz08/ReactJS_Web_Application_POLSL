/**
 * @file SubjectsPassPage.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactRouterDOM: "^5.2.0"
 *
 * @date final version: 08/24/2021
 */

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * @details A function that forces a scroll to position X: 0, Y: 0 after each routing (transition to a new address path).
 */
const ScrollToTop = (): null => {

   const { pathname } = useLocation();

   useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

   return null;
}

export default ScrollToTop;