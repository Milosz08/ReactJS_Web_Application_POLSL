import React, { useEffect, useState } from 'react';
import classnames from "classnames";

const { gotoTopWrapper, showGotoButton } = require('./GotoTopButton.module.scss');

/**
 * Komponent dodający przycik (w pozycji fixed) umożliwiający po kliknięciu przejście do góry strony.
 * Przycisk widoczny jest, tylko gdy pozycja scrolla (od szczytu strony) przekroczy wartość 200 jednostek.
 */
const GotoTopButton = () => {

   const [ offset, setOffset ] = useState<number>(0);
   const [ showGoto, setShowGoto ] = useState<boolean>(false);

   useEffect(() => {
      const handleOnScroll = () => {
         if(offset > 200) {
            setShowGoto(true);
         } else {
            setShowGoto(false);
         }
         setOffset(window.pageYOffset);
      }
      if(offset === 0) {
         setShowGoto(false);
      }
      window.addEventListener('scroll', handleOnScroll);
      return () => window.removeEventListener('scroll', handleOnScroll);
   }, [offset]);


   const handleClickGotoTop = () => document.body.scrollIntoView({ behavior: 'smooth' });
   const toggleClass = showGoto ? showGotoButton : '';

   return (
      <button
         className = {classnames(gotoTopWrapper, toggleClass)}
         onClick = {handleClickGotoTop}
      />
   );
}

export default GotoTopButton;