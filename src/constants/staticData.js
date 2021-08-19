/**
 * @file staticData.js
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief JavaScript file storing constants values.
 *
 * @project_name "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @date final version: 08/19/2021
 */

/**
 * @details An object that stores static data about links in the header, pages used for routing, and options
 *          to choose from in the footer form.
 */
const CONSTANT_DATA = {
   TOP_NAVBAR_ELMS: [
      {
         title: 'Politechnika Śląska',
         link: 'https://www.polsl.pl/',
      },
      {
         title: 'Strona wydziału Elektrycznego',
         link: 'https://www.elektr.polsl.pl/',
      },
      {
         title: 'Poczta POLSL',
         link: 'https://outlook.office.com/mail/inbox',
      },
      {
         title: 'Pełny plan zajęć',
         link: 'https://plan.polsl.pl/',
      },
      {
         title: 'Platforma Zdalnej Edukacji',
         link: 'https://platforma.polsl.pl/re/',
      },
      {
         title: 'USOS',
         link: 'https://usoscas.polsl.pl/cas/login',
      },
   ],
   SITES: [
      {
         title: 'Interaktywny plan zajęć',
         description: 'Przejrzysty i interaktywny harmonogram spotkań dopasowany do konkretnej grupy.',
      },
      {
         title: 'Kalendarz studenta',
         description: 'Nowoczesny kalendarz z najważniejszymi datami zaliczeń i dni wolnych od nauki.',
      },
      {
         title: 'Warunki zaliczenia przedmiotów',
         description: 'Szczegółowy opis wymagań niezbędnych do uzyskania zaliczenia z danego przedmiotu.',
      },
      {
         title: 'Pomoce naukowe',
         description: 'Pod tym linkiem znajdziesz pomoce do nauki obejmujące autorskie materiały z zajęć.',
      },
   ],
   FOOTER_OPTIONS: [
      {
         name: 'Błąd na stronie',
         value: 'pageError',
      },
      {
         name: 'Modyfikacja Planu Zajęć',
         value: 'sheduleModify',
      },
      {
         name: 'Modyfikacja/dodanie ważnego terminu',
         value: 'calendarNewDate',
      },
      {
         name: 'Inny, niewymieniony wyżej',
         value: 'default',
      },
   ],
};

export default CONSTANT_DATA;