import React from 'react';
import classnames from 'classnames';

const { panelContainer, panelActive } = require('./Panels.module.scss');

interface PropsProvider {
   activeNavElm: number;
}

/**
 * Komponent generujący panel zarządzania planem zajęć w systemie CMS.
 *
 * @param activeNavElm { number } - liczba mówiąca o aktywności danego elementu.
 */
const ShedulePanel: React.FC<PropsProvider> = ({ activeNavElm }) => {

   const classToggle = activeNavElm === 3 ? panelActive : ''

   return (
      <div className = {classnames(panelContainer, classToggle)}>
         Shedule Panel
      </div>
   );
}

export default ShedulePanel;