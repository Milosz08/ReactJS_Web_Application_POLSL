/**
 * @file cookiesPolicyContent.ts
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript file storing constants values.
 *
 * @project_name "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @date final version: 08/18/2021
 */

/**
 * Interfaces that defines the data types in the object.
 */
interface StaticStructureTypes {
   LIST_STRUCTURE: ListTypes[];
   NON_LIST_STRUCTURE: NonListTypes[];
}
export interface ListTypes {
   sectionID: string;
   sectionArray: { [value: string]: string }[];
}
export interface NonListTypes {
   sectionID: string;
   sectionArray: string[];
}

/**
 * @details An object representing each static cookies document structure element.
 */
const STATIC_STRUCTURE: StaticStructureTypes = {
   LIST_STRUCTURE: [
      {
         sectionID: 'Definicje',
         sectionArray: [
            {
               title: 'serwis',
               description: `serwis internetowy działający pod adresem ${window.location.hostname}`,
            },
            {
               title: 'serwis zewnętrzny',
               description: `serwis internetowy partnerów, usługodawcy lub usługobiorców Administratora serwera`,
            },
            {
               title: 'administrator',
               description: `firma, świadcząca usługi drogą elektroniczną za pośrednictwem Serwisu oraz przechowująca 
                             i uzyskująca dostęp do informacji w urządzeniach Użytkownika`,
            },
            {
               title: 'użytkownik',
               description: `osoba fizyczna, dla której Administrator świadczy usługi drogą elektroniczna 
                             za pośrednictwem Serwisu`,
            },
            {
               title: 'urządzenie',
               description: `elektroniczne urządzenie wraz z oprogramowaniem, za pośrednictwem, którego 
                             Użytkownik uzyskuje dostęp do Serwisu`,
            },
            {
               title: 'cookies (ciasteczka)',
               description: `dane tekstowe gromadzone w formie plików zamieszczanych na Urządzeniu Użytkownika`,
            },
            {
               title: 'system CMS',
               description: `system zarządzania treścią (Content Management System) popularnie nazywany CMS-em`,
            },
         ],
      },
      {
         sectionID: 'Rodzaje Cookies',
         sectionArray: [
            {
               title: 'cookies wewnętrzne (inside Cookies)',
               description: `pliki zamieszczane i odczytywane z Urządzenia Użytkownika przes system teleinformatyczny 
                             Serwisu`,
            },
            {
               title: 'cookies zewnętrzne (outside Cookies)',
               description: `pliki zamieszczane i odczytywane z Urządzenia Użytkownika przez systemy teleinformatyczne 
                             Serwisów zewnętrznych`,
            },
            {
               title: 'cookies sesyjne (session Cookies)',
               description: `pliki zamieszczane i odczytywane z Urządzenia Użytkownika przez Serwis lub Serwisy 
                             zewnętrzne podczas jednej sesji danego Urządzenia. Po zakończeniu sesji pliki są usuwane z
                             Urządzenia Użytkownika`,
            },
            {
               title: 'cookies trwałe (persistent Cookies)',
               description: `pliki zamieszczane i odczytywane z Urządzenia Użytkownika przez Serwis lub Serwisy 
                             zewnętrzne do momentu ich ręcznego usunięcia. Pliki nie są usuwane automatycznie po 
                             zakończeniu sesji Urządzenia chyba że konfiguracja Urządzenia Użytkownika jest ustawiona 
                             na tryb usuwanie plików Cookie po zakończeniu sesji Urządzenia`,
            },
         ],
      },
      {
         sectionID: 'Bezpieczeństwo',
         sectionArray: [
            {
               title: 'mechanizmy składowania i odczytu',
               description: `mechanizmy składowania i odczytu Cookies nie pozwalają na pobierania jakichkolwiek danych 
                             osobowych ani żadnych informacji poufnych z Urządzenia Użytkownika. Przeniesienie na 
                             Urządzenie Użytkownika wirusów, koni trojańskich oraz innych robaków jest praktynie 
                             niemożliwe`,
            },
            {
               title: 'cookie wewnętrzne (inside Cookie)',
               description: `zastosowane przez Administratora Cookie wewnętrzne są bezpieczne dla Urządzeń Użytkowników`,
            },
            {
               title: 'cookie zewnętrzne (outside Cookie)',
               description: `za bezpieczeństwo plików Cookie pochodzących od partnerów Serwisu Administrator nie 
                             ponosi odpowiedzialności. Powyższa strona internetowa nie korzysta z plików Cookie 
                             pochodzących z zewnętrznych źródeł`,
            },
         ],
      },
      {
         sectionID: 'Cele do których wykorzystywane są pliki Cookies',
         sectionArray: [
            {
               title: 'usprawnienie i ułatwienie dostępu do Serwisu',
               description: `Administrator może przechowywać w plikach Cookie informacje o prefernecjach i 
                             ustawieniach użytkownika dotyczących Serwisu aby usprawnić, polepszyć i przyśpieszyć 
                             świadczenie usług w ramach Serwisu`,
            },
            {
               title: 'dane statystyczne',
               description: `Administrator wykorzystuje pliki Cookie do zbirania i przetwarzania danych statystycznych 
                             takich jak np. statystyki odwiedzin, statystyki Urządzeń Użytkowników czy statystyki 
                             zachowań użytkowników. Dane te zbierane są w celu analizy i ulepszania Serwisu`,
            },
            {
               title: 'serwowanie usług multimedialnych',
               description: `Administrator wykorzystuje pliki Cookie do serwowania Użytkownikom usług multimedialnych`,
            },
            {
               title: 'usprawnienie logowania do systemu CMS',
               description: `Administrator wykorzystuje pliki Cookie w celu usprawnienia logowania do panelu CMS 
                             (panelu zarządzania treścią) dla pozostałych administratorów i webmasterów Serwisu`,
            },
         ],
      },
   ],
   NON_LIST_STRUCTURE: [
      {
         sectionID: 'Określanie warunków Cookies',
         sectionArray: [
            `Użytkownik może w dowolnym momencie, samodzielnie zmienić ustawienia dotyczące zapisywania, usuwania oraz 
             dostępu do danych zapisanych plików Cookies`,

            `Informacje o sposobie wyłączenia plików Cookie w najpopularniejszych przeglądarkach komputerowych i 
             urządzeń mobilnych dostępna jest w dalszej sekcji dokumentu`,

            `Użytkownik może w dowolnym momencie usunąć wszelkie zapisane do tej pory pliki Cookie korzystając z 
             narzędzi Urządzenia Użytkownika za pośrednictwem którego Użytkowanik korzysta z usług Serwisu`,
         ],
      },
      {
         sectionID: 'Odroczenia',
         sectionArray: [
            `Administrator stosuje wszelkie możliwe środki w celu zapewnienia bezpieczeństwa danych umieszczanych w 
             plikach Cookie. Należy jednak zwrócić uwagę, że zapewnienie bezpieczeństwa tych danych zależy od obu stron, 
             w tym działalności Użytkownika oraz stanu zabezpieczeń urządzenia z którego korzysta`,

            `Administrator nie bierze odpowiedzialności za przechwycenie danych zawartych w plikach Cookie, podszycie 
             się pod sesję Użytkownika lub ich usunięcie, na skutek świadomej lub nieświadomej działalność Użytkownika, 
             wirusów, koni trojańskich i innego oprogramowania szpiegującego, którymi może być zainfekowane Urządzenie 
             Użytkownika`,

            `Użytkownicy w celu zabezpieczenia się przed wskazanymi w punkcie poprzednim zagrożeniami powinni stosować 
             się do zasad bezpiecznego korzystania z internetu`,

            `Usługi świadczone przez podmioty trzecie są poza kontrolą Administratora. Podmioty te mogą w każdej 
             chwili zmienić swoje warunki świadczenia usług, cel oraz wykorzystanie plików cookie. Administrator nie 
             odpowiada na tyle na ile pozwala na to prawo za działanie plików cookies używanych przez serwisy 
             partnerskie. Użytkownicy w każdej chwili mogą samodzielnie zarządzać zezwoleniami i ustawieniami plików 
             cookie dla każedej dowolnej witryny`,
         ],
      },
      {
         sectionID: 'Wymagania Serwisu',
         sectionArray: [
            `Ograniczenie zapisu i dostępu do plików Cookie na Urządzeniu Użytkownika może spowodować nieprawidłowe 
             lub ograniczone działanie niektórych funkcji Serwisu`,

            `Administrator nie ponosi żadnej odpowiedzialności za nieprawidłowo działające funkcje Serwisu w 
             przypadku gdy Użytkownik ograniczy w jakikolwiek sposób możliwość zapisywania i odczytu plików Cookie`,
         ],
      },
      {
         sectionID: 'Zmiany w Polityce Cookie',
         sectionArray: [
            `Administrator zastrzega sobie prawo do dowolnej zmiany niniejszej Polityki Cookie bez konieczności 
             informowania o tym użytkowników`,

            `Wprowadzone zmiany w Polityce Cookie zawsze będą publikowane na tej stronie`,

            `Wprowadzone zmiany wchodzą w życie w dniu publikacji Polityki Cookie`,
         ],
      },
   ],
}

export default STATIC_STRUCTURE;