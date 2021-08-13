import React, { Fragment, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import classnames from "classnames";

import { FormCalendarModalContext } from '../../../../../../contextStore/FormCalendarModalProvider';
import { TEXTFIELD_SIZE } from '../../../../../../contextStore/FormCalendarModalProvider';

const { modalAddIcon } = require('./../WarningDeleteModal/WarningDeleteModal.module.scss');
const { singleRadio, radiomark } = require('./../AddChangeSubjectModal/AddChangeSubjectModal.module.scss');
const {
   messageModuleContainer, timeAndImportant, messageTextfield, quantityChars, removeInputField,
   importantsRadio, inputTime, timePicker, radioImportants, messageAndExitField
} = require('./AddChangeCalendarModal.module.scss');

/**
 * Komponent generujący formularz wprowadzania/edytowania wpisu kalendarza. Komponent generuje formularz w modalu
 * (panel administratora systemu CMS - panel wpisów kalendarza).
 */
const MessageModule = () => {

   const { entries, setEntries } = useContext<any>(FormCalendarModalContext);

   const generateEntries = entries.map((entrie: any, index: number) => {

      const handleInputs = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
         const copy = [...entries];
         switch(target.type) {
            case 'radio': copy[index].importantLevel = target.value; break;
            case 'time': copy[index].start = target.value; break;
            case 'textarea': copy[index].message = target.value; break;
            default: throw new Error('Unexpected input! Type of input not exist');
         }
         setEntries(copy);
      }

      const handleRemoveField = () => {
         const copy = [...entries];
         copy.splice(index, 1);
         if(index !== -1) {
            setEntries(copy);
         }
      }

      const generateImportants = Array.from(['low', 'medium', 'high']).map(level => {
         const id = uuidv4();
         return (
            <div key = {level} className = {classnames(singleRadio, radioImportants)}>
               <input
                  checked = {entrie.importantLevel === level}
                  type = 'radio'
                  value = {level}
                  id = {`${level}_${id}`}
                  onChange = {handleInputs}
               />
               <label htmlFor = {`${level}_${id}`}>{level}</label>
               <div className = {radiomark}/>
            </div>
         );
      });

      return (
         <div className = {messageModuleContainer} key = {entrie._id}>
            <div className = {timeAndImportant}>
               <div className = {inputTime}>
                  <label htmlFor = {`${inputTime}_${index}`}>Start</label>
                  <input
                     type = 'time'
                     id = {`${inputTime}_${index}`}
                     value = {entrie.start}
                     onChange = {handleInputs}
                  />
                  <div className = {timePicker}>
                     <FontAwesomeIcon
                        icon = {['fas', 'clock']}
                        className = {modalAddIcon}
                     />
                  </div>
               </div>
               <div className = {importantsRadio}>
                  {generateImportants}
               </div>
            </div>
            <div className = {messageAndExitField}>
               <div className = {messageTextfield}>
            <textarea
               placeholder = 'Wpisz tutaj krótki opis aktywności'
               value = {entrie.message}
               onChange = {handleInputs}
               minLength = {TEXTFIELD_SIZE.MIN_LENGTH}
               maxLength = {TEXTFIELD_SIZE.MAX_LENGTH}
               rows = {2}
            />
                  <span className = {quantityChars}>
              {entrie.message.length} / {TEXTFIELD_SIZE.MAX_LENGTH}
            </span>
               </div>
               {index !== 0 && <button
                  type = 'button'
                  onClick = {handleRemoveField}
                  title = 'Usuń pole'
               >
                  <FontAwesomeIcon
                     icon = {['fas', 'times']}
                     className = {removeInputField}
                  />
               </button>}
            </div>
         </div>
      );
   });

   return (
      <Fragment>
         {generateEntries}
      </Fragment>
   );
}

export default MessageModule;