import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from "../../../helpers/request";

import CONSTANT_DATA from "../../../constants/staticData";
import getSingleDateObjects from "../../../constants/getSingleDateObjects";

const {
   errorSomeInput, posSendForm, quantityChars, showPositiveMess, selectFieldCont, selectArrowIcon, checkField,
   checkmark, formBtnSubmitContainer, footerFormCSS
} = require('./FooterForm.module.scss');

const MIN_LENGTH_TEXTAREA: number = 10;
const MAX_LENGTH_TEXTAREA: number = 300;
const TEXTAREA_ROWS: number | undefined = 7;

interface StateProvider {
   userName: string;
   typeOfMessage: string;
   messageArea: string;
   agreeCheck: boolean;
}

interface ErrorsStateProvider {
   userName: boolean;
   messageArea: boolean;
   agreeCheck: boolean;
   allCorrect: boolean;
}

interface ValidateProvider {
   userNameBool: boolean;
   messageAreaBool: boolean;
   agreeCheckBool: boolean;
   allCorrectBool: boolean;
}

/**
 * Komponent implementujący formularz do stopki. Odpowiada również za wysłanie danych ze stanu React do
 * bazy danych w postaci pojedyńczego obiektu (rekordu). W komponencie zawarta jest również pełna walidacja
 * formularza.
 */
const FooterForm = () => {

   const [ formInputs, setFormInputs ] = useState<StateProvider>({
      userName: '', typeOfMessage: 'pageError', messageArea: '', agreeCheck: false
   });
   const [ errors, setErrors ] = useState<ErrorsStateProvider>({
      userName: false, messageArea: false, agreeCheck: false, allCorrect: false
   });
   const [ showPosMess, setShowPosMess ] = useState<boolean>(false);

   const handleFormElms = ({ target }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      switch(target.type) {
         case 'text':
            setFormInputs({ ...formInputs, userName: target.value });
            setErrors({ ...errors, userName: false });
            break;
         case 'textarea':
            setFormInputs({ ...formInputs, messageArea: target.value });
            setErrors({ ...errors, messageArea: false });
            break;
         case 'checkbox':
            setFormInputs(prevState => ({ ...formInputs, agreeCheck: !prevState.agreeCheck }));
            setErrors({ ...errors, agreeCheck: false });
            break;
         default:
            throw new Error('Unexpected name. Unknow type of form field.');
      }
   }

   const handleSelectField = ({ target }: React.ChangeEvent<HTMLSelectElement>): void => (
      setFormInputs({ ...formInputs, typeOfMessage: target.value })
   );

   const validateForm = (): ValidateProvider => {
      const { userName, messageArea, agreeCheck } = formInputs;
      let userNameBool = false, messageAreaBool = false, agreeCheckBool = false, allCorrectBool = false;

      if(userName.length > 5 && userName.indexOf(' ') === -1 && userName.length < 20) {
         userNameBool = true;
      }
      if(messageArea.length > MIN_LENGTH_TEXTAREA && messageArea.length < MAX_LENGTH_TEXTAREA) {
         messageAreaBool = true;
      }
      if(agreeCheck) {
         agreeCheckBool = true;
      }
      if(userNameBool && messageAreaBool && agreeCheckBool) {
         allCorrectBool = true;
      }

      return { userNameBool, messageAreaBool, agreeCheckBool, allCorrectBool };
   }

   const postSendFormData = async (): Promise<any> => {
      const date = new Date()
      const { day, month, hours, minutes, seconds } = getSingleDateObjects(date);
      const { userName, typeOfMessage, messageArea } = formInputs;
      await axiosInstance.post('/footer-form', {
         userIdentity: userName,
         userChoice: typeOfMessage,
         userMessage: messageArea,
         sendDate: {
            fullDate: `${day}/${month}/${date.getFullYear()}`,
            fullTime: `${hours}:${minutes}:${seconds}`,
         }
      });
   }

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const showPositiveMessage = (): void => {
         setShowPosMess(true);
         const hidePositiveMessage = () => setShowPosMess(false);
         setTimeout(hidePositiveMessage, 4000);
      }

      const { userNameBool, messageAreaBool, agreeCheckBool, allCorrectBool } = validateForm();
      if(allCorrectBool) {
         setFormInputs({ userName: '', typeOfMessage: 'pageError', messageArea: '', agreeCheck: false });
         setErrors({ userName: false, messageArea: false, agreeCheck: false, allCorrect: false });
         showPositiveMessage();
         postSendFormData(); //strzał do API - wysyłanie do bazy danych
      } else {
         setErrors({
            userName: !userNameBool, messageArea: !messageAreaBool,
            agreeCheck: !agreeCheckBool, allCorrect: !allCorrectBool
         });
      }
   }

   const generateOptions = CONSTANT_DATA.FOOTER_OPTIONS.map(option => (
      <option
         value = {option.value}
         key = {uuidv4()}
      >{option.name}</option>
   ));

   return (
      <form onSubmit = {handleSubmit} className = {footerFormCSS} noValidate >
         <input
            type = 'text'
            placeholder = 'Imię lub nick (bez spacji)'
            onChange = {handleFormElms}
            value = {formInputs.userName}
            className = {errors.userName ? errorSomeInput : ''}
         />
         <div className = {selectFieldCont}>
            <select
               id = 'chooseOptions'
               onChange = {handleSelectField}
               value = {formInputs.typeOfMessage}
            >
               {generateOptions}
            </select>
            <FontAwesomeIcon
               icon = {['fas', 'chevron-down']}
               className = {selectArrowIcon}
            />
         </div>
         <textarea
            placeholder = 'Wpisz tutaj swoją wiadomość'
            onChange = {handleFormElms}
            value = {formInputs.messageArea}
            rows = {TEXTAREA_ROWS}
            minLength = {MIN_LENGTH_TEXTAREA}
            maxLength = {MAX_LENGTH_TEXTAREA}
            className = {errors.messageArea ? errorSomeInput : ''}
         />
         <span className = {quantityChars}>
            {formInputs.messageArea.length} / {MAX_LENGTH_TEXTAREA}
         </span>
         <div className = {checkField}>
            <input
               type = 'checkbox'
               id = 'agreeCheckfield'
               checked = {formInputs.agreeCheck}
               onChange = {handleFormElms}
            />
            <span className = {`${checkmark} ${errors.agreeCheck ? errorSomeInput : ''}`}/>
            <label htmlFor = 'agreeCheckfield'>
               Wyrażam zgodę na przetwarzanie wyżej podanych przeze mnie informacji.
            </label>
         </div>
         <div className = {formBtnSubmitContainer}>
            <button>
               <p className = {`${posSendForm} ${showPosMess ? showPositiveMess : ''}`}>
                  Wiadomość została wysłana.
               </p>
               Wyślij
            </button>
         </div>
      </form>
   );
}

export default FooterForm;