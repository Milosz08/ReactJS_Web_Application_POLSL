import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';

const {
   expandInfo, infoIcon, rotateIcon, expandContainer, expandedInfo, expandActive, expandedLinks
} = require('./ScheduleSections.module.scss');

interface PropsProvider {
   tile: any;
   subjectObj: any;
}

/**
 * Komponent generujący dla każdego przedmiotu (kafelka w gridzie) planu zajęć wysuwane menu z odnośnikami do
 * warunków zaliczenia przedmiotów oraz linków do Platformy Zdalnej Edukacji.
 *
 * @param tile { object } - przekazywany jeden przedmiot (kafelek).
 * @param subjectObj { object } - przekazywany object z informacjami na temat przedmiotu znajdującego się na kafelku.
 */
const ExpandedPanel: React.FC<PropsProvider> = ({ tile, subjectObj }) => {

   const [ ifIsExpanded, setifIsExpanded ] = useState<boolean>(false);

   const titleContent = ifIsExpanded ? 'Zwiń panel' : 'Kliknij tutaj po więcej informacji.';
   const iconRotate = ifIsExpanded ? classnames(infoIcon, rotateIcon) : infoIcon;
   const activeContainer = ifIsExpanded ? expandContainer : classnames(expandContainer, expandActive);

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
            <Link
               to = '/warunki-zaliczenia-przedmiotów'
               className = {expandedLinks}
            >
               Warunki zaliczenia przedmiotu
            </Link>
         </div>
      </Fragment>
   );
}

export default ExpandedPanel;