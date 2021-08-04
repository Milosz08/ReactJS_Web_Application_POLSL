interface ReturnProvider {
   day: string | number;
   month: string | number;
   hours: string | number;
   minutes: string | number;
   seconds: string | number;
}

/**
 * Funkcja wyciągająca z przekazywanego obiektu Date poszczególne wartości (dzień, miesiąc, godziny, minuty,
 * sekundy). Jeśli wartość jest mniejsza od 10, dodawane jest do niej 0 w celu równego zapełnienia wartości.
 *
 * @param date { Date } - przekazywany obiekt Date z którego będą wyciągane poszczególne wartości.
 */
const getSingleDateObjects = (date: Date): ReturnProvider => {
   const day: string | number = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
   const month: string | number = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
   const hours: string | number = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
   const minutes: string | number = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
   const seconds: string | number = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

   return { day, month, hours, minutes, seconds };
}

export default getSingleDateObjects;