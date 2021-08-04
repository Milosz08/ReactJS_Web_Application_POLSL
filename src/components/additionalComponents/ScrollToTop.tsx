import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

interface ScrollToTopProps {
   history : any;
}

/**
 * Funkcja wymuszająca pozycję scrolla na pozycji 0 po każdym routingu (przejścia na nową ścieżkę adresu.
 * @param history - zapamiętany adres w polu wyszukiwania przeglądarki
 */
function ScrollToTop({ history } : ScrollToTopProps) {

   useEffect(() => {
      const unlisten = history.listen(() => window.scrollTo(0, 0));
      return () => unlisten();
   }, [history]);

   return null;
}

export default withRouter(ScrollToTop);