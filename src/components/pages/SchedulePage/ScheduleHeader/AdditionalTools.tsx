import React from 'react';
import UniversalHeader from "../../../layouts/UniversalHeader/UniversalHeader";

const { sheduleRender } = require('./../../../layouts/Navigation/Navigation.module.scss');

/**
 * Komponent generujący sekcję dodatkowe narzędzia do planu zajęć (możliwość stworzenia pliku pdf).
 */
const AdditionalTools = () => {
   return (
      <section className = {sheduleRender}>
         <UniversalHeader
            iconP = {['fas', 'tools']}
            content = 'Dodatkowe narzędzia'
            ifCloseButtonVisible = {false}
         />
      </section>
   );
}

export default AdditionalTools;