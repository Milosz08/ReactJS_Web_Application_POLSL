/**
 * Interfejs typów obiektów przechwytywanych z bazy danych. Interfejs eksportowany do głównego stora
 * (MainStoreContext) przechowującego w obiekcie wszystkie pobrane dane z API
 */
interface MainStoreStateProvider {
   covidData: Array<{
      _id: string,
      description: string,
      actualRiskNumber: number,
      __v: number
   }>;
   footerForms: Array<{
      _id: string,
      userIdentity: string,
      userChoice: string,
      userMessage: string,
      sendDate: {
         fullDate: string,
         fullTime: string
      }, __v: number
   }>;
   subjectsData: Array<{
      _id: string,
      semesters: Array<string>,
      departments: Array<string>,
      icon: Array<string>,
      ifEnd: boolean;
      classesPlatforms: Array<{
         type: string,
         place: string,
         link: string
      }>,
      title: string,
      __v: number
   }>;
   scheduleSubjects: Array<{
      _id: string,
      title: string,
      group: string,
      day: string,
      type: string,
      start: string,
      end: string,
      pzeInfo: {
         platform: string,
         pzeLink: string
      }
   }>;
   calendarRecords: Array<{
      day: number,
      month: number,
      year: number,
      items: Array<{
         start: string,
         message: string,
         importantLevel: string
      }>
   }>;
}

export default MainStoreStateProvider;