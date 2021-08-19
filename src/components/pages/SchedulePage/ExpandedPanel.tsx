/**
 * @file ExpandedPanel.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactDelayLink: "^1.1.6"
 *                ReactFontAwesome: "^2.3.1"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, {Fragment, useContext, useState} from 'react';
import DelayLink from 'react-delay-link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

import { MainStoreContext, MainStoreProviderTypes, ROUTER_INTERVAL_TIME } from '../../../contextStore/MainStoreProvider';
import { ScheduleSubjectsProvider } from './ScheduleSections';
import { SubjectsProvider } from '../../layouts/Subjects/Subjects';

const {
   expandInfo, infoIcon, rotateIcon, expandContainer, expandedInfo, expandActive, expandedLinks
} = require('./ScheduleSections.module.scss');

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   tile: ScheduleSubjectsProvider;
   subjectObj: SubjectsProvider;
}

/**
 * @details Component generating for each object (tiled in grid) of the program of classes sliding menu with references to
 *          the conditions for passing objects and links to remote education platform.
 *
 * @param tile { object } - transmitted one object (tile).
 * @param subjectObj { object } - transmitted object with information on the subject on the tiled.
 */
const ExpandedPanel: React.FC<PropsProvider> = ({ tile, subjectObj }) => {

   const { timeoutRoutePath } = useContext<Partial<MainStoreProviderTypes>>(MainStoreContext);
   const [ ifIsExpanded, setifIsExpanded ] = useState<boolean>(false);

   const titleContent: string = ifIsExpanded ? 'Zwiń panel' : 'Kliknij tutaj po więcej informacji.';
   const iconRotate: string = ifIsExpanded ? classnames(infoIcon, rotateIcon) : infoIcon;
   const activeContainer: string = ifIsExpanded ? expandContainer : classnames(expandContainer, expandActive);

   return (
      <Fragment>
         <button
            className = {expandInfo}
            onClick = {() => setifIsExpanded(prevState => !prevState)}
            title = {titleContent}
         >
            <FontAwesomeIcon
               icon = {['fas', 'chevron-down']}
               className = {iconRotate}
            />
         </button>
         <div className = {activeContainer} >
            <p className = {expandedInfo}>
               <span>{tile.type === 'wykład' ? 'wykłady' : tile.type} </span>
               {subjectObj.ifEnd ? 'odbywały' : 'odbywają'} się przez komunikator
               <strong> {tile.pzeInfo.platform}</strong>. Wszystkie linki znajdziesz na PZE.
            </p>
            <a
               href = {tile.pzeInfo.pzeLink} rel = 'noreferrer'
               className = {expandedLinks}
            >
               Przejdź do PZE
            </a>
            <DelayLink
               to = '/warunki-zaliczenia-przedmiotów'
               delay = {(ROUTER_INTERVAL_TIME + .3) * 1000}
               replace = {false}
               clickAction = {timeoutRoutePath}
            >
               <a href = {'/warunki-zaliczenia-przedmiotów'}>
                  Warunki zaliczenia przedmiotu
               </a>
            </DelayLink>
         </div>
      </Fragment>
   );
}

export default ExpandedPanel;