import React, { Dispatch, SetStateAction } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import STATIC_NAV from '../../../../constants/navigationStatic';

const { activeSection, cmsNavigation } = require('./AdminCmsMainPanel.module.scss');

interface PropsProvider {
   activeNavElm: number;
   setActiveNavElm: Dispatch<SetStateAction<number>>
}

/**
 * Komponent generujący nawigację po panelach administratora systemu CMS
 *
 * @param activeNavElm { number } - liczba mówiąca o aktywnym panelu.
 * @param setActiveNavElm { Dispatch<SetStateAction<number>> } - funkcja ustawiająca aktywny panel.
 */
const AdminCmsLeftNavigation: React.FC<PropsProvider> = ({ activeNavElm, setActiveNavElm  }) => {

   const generateNavStructure = STATIC_NAV.map((navElm: any, id: number) => (
      <button
         className = {activeNavElm === id ? activeSection : ''}
         onClick = {() => setActiveNavElm(id)}
         key = {id}
      >
         <FontAwesomeIcon
            icon = {['fas', navElm.icon]}
            title = {navElm.alt}
         />
      </button>
   ));

   return (
      <nav className = {cmsNavigation}>
         {generateNavStructure}
      </nav>
   )
}

export default AdminCmsLeftNavigation;