import React from 'react';
import { Redirect, Route } from 'react-router';

interface PropsProvider {
   auth: boolean;
   setAuth: (value: boolean) => boolean;
   handleCookie: any;
   redirectPath: any;
   component: any;
}

/**
 * Komponent blokujący przejście na podstronę, jeśli użytkownik/administrator nie ma autentykacji.
 *
 * @param auth { boolean } - informacja o autentykacji uzytkownika/administratora.
 * @param setAuth { (value: boolean) => boolean } - ustawianie autentykacji dla użytkownika/administratora.
 * @param handleCookie { any } - funkcja obsługucjąca obiekt Cookie (usuwanie/dodawanie).
 * @param redirectPath { string } - ścieżka na którą ma przenieść react router.
 * @param Component - komponent do wyrenderowania.
 * @param rest - reszta parametrów przekazywanych do komponentów dziedziczących.
 */
const ProtectedLoginRoute: React.FC<PropsProvider | any> = ({
   auth, setAuth, handleCookie, redirectPath, component: Component, ...rest
}) => {

   const renderPathStructure = (props: any) => {
      if(auth) {
         return (
            <Component {...props} setAuth = {setAuth} handleCookie = {handleCookie}/>
         );
      } else {
         return (
            <Redirect to = {redirectPath}/>
         );
      }
   }

   return (
      <Route
         {...rest}
         render = {(props: any) => renderPathStructure(props)}
      />
   );
}

export default ProtectedLoginRoute;