/**
 * @file MobileDownNav.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactIcons: "^4.2.0"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^4.7.11"
 *
 * @date final version: 08/24/2021
 */

import React, { Fragment, useContext, useState } from 'react';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes } from '../../../contextStore/MainStoreProvider';

import {
   AiFillHome, AiOutlineHome, AiFillSchedule, AiOutlineSchedule, AiFillCalendar, AiOutlineCalendar,
   AiFillBulb, AiOutlineBulb, AiFillCreditCard, AiOutlineCreditCard
} from 'react-icons/ai';

const SingleNavigationElement = React.lazy(() => import('./SingleNavigationElement'));

const { mobileDownContainer, activeIndicator, icon, active } = require('./MobileDownNav.module.scss');

/**
 * Constant that defines the number of navigation buttons on the bottom bar.
 */
const ELEMENTS_COUNT: number = 5;

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   id?: number;
}

/**
 * @details Component responsible for generating the bottom navigation bar (available only on small mobile devices - phones).
 *          In state methods it takes initial parameters based on props "id".
 * @param id { number } - active page.
 */
const MobileDownNav: React.FC<PropsProvider> = ({ id }): JSX.Element => {

   const { timeoutRoutePath } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);

   const [ activeElm, setActiveElm ] = useState<number>(id === undefined ? -1 : id);
   const [ singleWidthX ] = useState<number>(document.body.offsetWidth / ELEMENTS_COUNT);
   const [ indicatorXPos, setIndicatorXPos ] = useState<number>(id === undefined ? -1 * singleWidthX : singleWidthX * id);

   const handleMenuClick = (id: number, path: string): void => {
      setIndicatorXPos(singleWidthX * id);
      setActiveElm(id);
      timeoutRoutePath!(path);
   }

   return (
      <div className = {mobileDownContainer}>
         <span className = {activeIndicator} style = {{ transform: `translateX(${indicatorXPos}px)` }}/>

         <SingleNavigationElement
            pathAttr = {{ path: '/' , id: 0 }}
            action = {handleMenuClick}
            Component = {
               <Fragment>
                  <AiFillHome className = {classnames(icon, activeElm === 0 ? active : '')}/>
                  <AiOutlineHome className = {classnames(icon, activeElm === 0 ? '' : active)}/>
               </Fragment>
            }
         />

         <SingleNavigationElement
            pathAttr = {{ path: '/interaktywny-plan-zajęć', id: 1 }}
            action = {handleMenuClick}
            Component = {
               <Fragment>
                  <AiFillSchedule className = {classnames(icon, activeElm === 1 ? active : '')}/>
                  <AiOutlineSchedule className = {classnames(icon, activeElm === 1 ? '' : active)}/>
               </Fragment>
            }
         />

         <SingleNavigationElement
            pathAttr = {{ path: '/kalendarz-studenta', id: 2 }}
            action = {handleMenuClick}
            Component = {
               <Fragment>
                  <AiFillCalendar className = {classnames(icon, activeElm === 2 ? active : '')}/>
                  <AiOutlineCalendar className = {classnames(icon, activeElm === 2 ? '' : active)}/>
               </Fragment>
            }
         />

         <SingleNavigationElement
            pathAttr = {{ path: '/warunki-zaliczenia-przedmiotów', id: 3 }}
            action = {handleMenuClick}
            Component = {
               <Fragment>
                  <AiFillCreditCard className = {classnames(icon, activeElm === 3 ? active : '')}/>
                  <AiOutlineCreditCard className = {classnames(icon, activeElm === 3 ? '' : active)}/>
               </Fragment>
            }
         />

         <SingleNavigationElement
            pathAttr = {{ path: '/pomoce-naukowe', id: 4 }}
            action = {handleMenuClick}
            Component = {
               <Fragment>
                  <AiFillBulb className = {classnames(icon, activeElm === 4 ? active : '')}/>
                  <AiOutlineBulb className = {classnames(icon, activeElm === 4 ? '' : active)}/>
               </Fragment>
            }
         />
      </div>
   );
}

export default MobileDownNav;