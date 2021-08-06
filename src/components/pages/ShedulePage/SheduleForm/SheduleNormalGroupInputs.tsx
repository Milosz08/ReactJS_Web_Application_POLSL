import React, { useContext } from 'react';
import classnames from "classnames";

import { SheduleContext } from '../../../../contextStore/SheduleProvider';
import GROUPS_STATIC from '../../../../constants/allGroups';

const { groupRadio, customRadio, radioInputContainer, activeRadio } = require('./SheduleForm.module.scss');

/**
 * Komponent generujący radio inputy do wyboru grupy ogólnej. Dane pobierane z kontekstu i
 * statycznych plików JS.
 */
const SheduleNormalGroupInputs = () => {

   const { NORMAL_GROUPS } = GROUPS_STATIC;
   const { groupSelected, setGroupSelected } = useContext<any>(SheduleContext);

   const generateInputStructure = NORMAL_GROUPS.map(object => {
      const activeRadioClass = groupSelected === object.text ? classnames(radioInputContainer, activeRadio)
         : radioInputContainer;

      return (
         <div key = {object.text} className = {activeRadioClass}>
            <input
               type = 'radio'
               id = {object.text}
               name = 'groups'
               onChange = {({ target }) => setGroupSelected(target.id)}
               checked = {groupSelected === object.text}
               value = {object.text}
            />
            <label htmlFor = {object.text}>
               Grupa {object.text}
            </label>
            <div className = {customRadio}/>
         </div>
      );
   });

   return (
      <div className = {groupRadio}>
         {generateInputStructure}
      </div>
   );
}

export default SheduleNormalGroupInputs;