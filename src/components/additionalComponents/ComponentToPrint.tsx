import React, { PureComponent, Fragment } from 'react';
import axiosInstance from '../../helpers/request';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import getSingleDateObjects from '../../constants/getSingleDateObjects';
import GROUPS_STATIC from '../../constants/allGroups';


const {
   container, headerPrint, datesPrint, weekDaysPrint, separator, infoPrint, reactIcon
} = require('./ComponentToPrint.module.scss');

const DAYS = [
   'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek'
];

interface StateProvider {
   semesterInfos: {
      semester: string;
      semesterType: string;
      year: string;
   };
   updateSchedule: {
      dayS: number;
      monthS: number;
      yearS: number;
      hourS: number;
      minutesS: number;
      secondsS: number;
   };
}

interface PropsProvider {
   date: Date;
   subjects: Array<any>;
   groupSelected: string;
   engSelected: string;
}

/**
 * Komponent klasowy renderujący dynamicznie plan na podstawie rekordów pobieranych z bazy danych i wyborów
 * użytkownika. Korzysta ze statycznego stora i przy zamontowaniu komponentu ustawia wartości dla state w
 * konstruktorze.
 */
class ComponentToPrint extends PureComponent<PropsProvider, StateProvider> {
   _isMounted = false;

   constructor(props: any) {
      super(props);
      this.state = {
         semesterInfos: { semester: '', semesterType: '', year: '' },
         updateSchedule: { dayS: 0, monthS: 0, yearS: 0, hourS: 0, minutesS: 0, secondsS: 0 },
      };
   }

   componentDidMount() {
      this._isMounted = true;
      const fetchData = async () => {
         const schedulePrint = await axiosInstance.get(`/last-update/${process.env.REACT_APP_PRINTSCHEDULE_ID}`);
         const scheduleUpdate = await axiosInstance.get(`/last-update/${process.env.REACT_APP_SCHEDULE_ID}`);
         const shedulePrintResp = JSON.parse(schedulePrint.request.response);
         const sheduleUpdateResp = JSON.parse(scheduleUpdate.request.response);
         const { day, month, year, hour, minutes, seconds } = sheduleUpdateResp.updateDate;
         if(this._isMounted) {
            this.setState({
               semesterInfos: shedulePrintResp.updateDate,
               updateSchedule: {
                  dayS: day, monthS: month, yearS: year, hourS: hour, minutesS: minutes, secondsS: seconds,
               }
            });
         }
      }
      fetchData();
   }

   componentWillUnmount() {
      this._isMounted = false;
   }

   generateSubjectsStructure = () => {
      const subjects = this.props.subjects;
      const { NORMAL_GROUPS,  } = GROUPS_STATIC;
      let subjectsPerDayArray: Array<any> = [];
      let filteredArray: Array<any> = [];

      const returFilteredArray = (engGroup: string, normalGroup: string) => (
         subjects.filter((object: any) => (
            object.group === engGroup || object.group === normalGroup || object.group === 'all')
         )
      );

      if(this.props.groupSelected !== '') {
         switch(this.props.groupSelected) {
            case NORMAL_GROUPS[0].text:
               filteredArray = returFilteredArray(NORMAL_GROUPS[0].field, this.props.engSelected);
               break;
            case NORMAL_GROUPS[1].text:
               filteredArray = returFilteredArray(NORMAL_GROUPS[1].field, this.props.engSelected);
               break;
            default:
               throw new Error('Selected group not exist!');
         }
      }

      DAYS.forEach((day: string) => {
         subjectsPerDayArray.push(filteredArray.filter(subject => subject.day === day).sort(
            (prevH: any, secH: any): number => (
               parseInt(prevH.start.replace(':', '')) - parseInt(secH.start.replace(':', ''))
            )
         ));
      });

      return subjectsPerDayArray.map((perDay: any, indexDay: number) =>
         <Fragment key = {indexDay}>
            {perDay.map((subject: any, index: number) => (
               <tr key = {index}>
                  {index === 0 && <th rowSpan = {perDay.length} className = {weekDaysPrint}>{DAYS[indexDay]}</th>}
                  <td>{subject.start} - {subject.end}</td>
                  <td>{subject.title}</td>
                  <td>{subject.type}</td>
                  <td>{subject.pzeInfo.platform}</td>
               </tr>
            ))}
            <tr className = {separator}/>
         </Fragment>
      );
   }

   render() {
      const { semester, semesterType, year } = this.state.semesterInfos;
      const { dayS, monthS, yearS, hourS, minutesS, secondsS } = this.state.updateSchedule;
      const dayF = dayS < 10 ? `0${dayS}` : dayS;
      const monthF = monthS < 10 ? `0${monthS}` : monthS;
      const hourF = hourS < 10 ? `0${hourS}` : hourS;
      const minutesF = minutesS < 10 ? `0${minutesS}` : minutesS;
      const secondsF = secondsS < 10 ? `0${secondsS}` : secondsS;

      const date = this.props.date;
      const selectGroup = this.props.groupSelected === 'Pierwsza' ? '1' : '2';
      const { day, month, hours, minutes, seconds } = getSingleDateObjects(date);

      return (
         <div className = {container}>
            <header className = {headerPrint}>
               <div>Plan zajęć - I S1 {semester}/{selectGroup}, semestr {semesterType}, rok {year}</div>
               <div className = {datesPrint}>
                  <span>
                     Wygenerowano dnia: {`${day}/${month}/${date.getFullYear()}, ${hours}:${minutes}:${seconds}`}
                  </span>
                  <span>
                     Aktualizacja planu: {`${dayF}/${monthF}/${yearS}, ${hourF}:${minutesF}:${secondsF}`}
                  </span>
               </div>
            </header>
            <table>
               <tbody>
                  {this.generateSubjectsStructure()}
               </tbody>
            </table>
            <div className = {infoPrint}>
               Wygenerowano przy użyciu:
               <FontAwesomeIcon
                  icon = {['fab', 'react']}
                  className = {reactIcon}
               />
               React Printer
            </div>
         </div>
      );
   }
}

export default ComponentToPrint;