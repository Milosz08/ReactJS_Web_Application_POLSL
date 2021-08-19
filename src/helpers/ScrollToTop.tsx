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
 * @date final version: 08/19/2021
 */

import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

/**
 * Interface defining the type of props values.
 */
interface ScrollToTopProps {
   history: any;
}

/**
 * @details A function that forces a scroll to position X: 0, Y: 0 after each routing (transition to a new address path).
 *
 * @param history { any } - remembered address in the browser's search field
 */
const ScrollToTop: React.FC<ScrollToTopProps> = ({ history }): null => {

   useEffect(() => {
      const unlisten = history.listen(() => window.scrollTo(0, 0));
      return () => unlisten();
   }, [history]);

   return null;
}

export default withRouter(ScrollToTop);