/**
 * @file CmsInfoBar.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Statefull class component.
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactFontAwesome: "^0.1.15"
 *                ReactCSSmodules: "^4.7.11"
 *
 * @date final version: 08/18/2021
 */

import React, { Fragment, PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../../../helpers/request';

import getSingleDateObjects from '../../../constants/getSingleDateObjects';
import GROUPS_STATIC from '../../../constants/allGroups';

const {
    container, headerPrint, datesPrint, weekDaysPrint, separator, infoPrint, reactIcon
} = require('./ComponentToPrint.module.scss');

/**
 * The table of constants typeof string that stores the consecutive days of the week.
 */
const DAYS: string[] = [ 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek' ];
const START_STUDY: number = 2020;

/**
 * Interface defining the types of scheduleSubjecst object.
 */
interface ScheduleSubjects {
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
}

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
    date: Date;
    subjects: ScheduleSubjects[];
    groupSelected: string;
    engSelected: string;
}

/**
 * Interface defining the type of state values.
 */
interface StateProvider {
    semesterInfos: {
        semester: string;
        semesterType: string;
        year: string;
    };
    updateSchedule: {
        [value: string]: number;
    };
}

/**
 * @details A class component that dynamically renders a plan based on records retrieved from the database and
 *          user selections. It uses a static stora and sets the values for state in the constructor when the
 *          component is mounted.
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

    componentDidMount(): void {
        this._isMounted = true;
        const date = new Date();

        const yearValue = (): string => {
            return date.getMonth() > 9
                ? `${date.getFullYear()}/${date.getFullYear() + 1}` : `${date.getFullYear() - 1}/${date.getFullYear()}`
        }

        const fetchData = async () => {
            const scheduleUpdate = await axiosInstance.get(`/last-update/${process.env.REACT_APP_SCHEDULE_ID}`);
            const sheduleUpdateResp = JSON.parse(scheduleUpdate.request.response);
            const { day, month, year, hour, minutes, seconds } = sheduleUpdateResp.updateDate;
            if (this._isMounted) {
                this.setState({
                    semesterInfos: {
                        semester: String((date.getFullYear() - START_STUDY) * 2),
                        semesterType: String(date.getMonth() > 0 && date.getMonth() < 9 ? 'letni' : 'zimowy'),
                        year: yearValue(),
                    },
                    updateSchedule: {
                        dayS: day, monthS: month, yearS: year, hourS: hour, minutesS: minutes, secondsS: seconds,
                    }
                });
            }
        }
        fetchData();
    }

    componentWillUnmount(): void {
        this._isMounted = false;
    }

    generateSubjectsStructure = (): JSX.Element[] => {
        const subjects = this.props.subjects;
        const { NORMAL_GROUPS } = GROUPS_STATIC;
        let subjectsPerDayArray: ScheduleSubjects[] = [];
        let filteredArray: any = [];

        const returFilteredArray = (engGroup: string, normalGroup: string): ScheduleSubjects[] => (
            subjects.filter((object: ScheduleSubjects): boolean => (
                object.group === engGroup || object.group === normalGroup || object.group === 'all'
            ))
        );

        if (this.props.groupSelected !== '') {
            switch (this.props.groupSelected) {
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

        DAYS.forEach((day: string): void => {
            subjectsPerDayArray.push(filteredArray.filter((subject: ScheduleSubjects) => subject.day === day).sort(
                (prevH: any, secH: any): number => (
                    parseInt(prevH.start.replace(':', '')) - parseInt(secH.start.replace(':', ''))
                )
            ));
        });

        return subjectsPerDayArray.map((perDay: any, indexDay: number): JSX.Element =>
            <Fragment key = {indexDay}>
                {perDay.map((subject: ScheduleSubjects, index: number) => (
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

    render(): JSX.Element {
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
                        icon = {[ 'fab', 'react' ]}
                        className = {reactIcon}
                    />
                    React Printer
                </div>
            </div>
        );
    }
}

export default ComponentToPrint;