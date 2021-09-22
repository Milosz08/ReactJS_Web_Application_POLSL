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
 * @details Object that stores static data on form input options to add a new item in the CMS panel.
 */
const STATIC_OPTIONS = {
    SEMESTERS: [
        'pierwszy', 'drugi', 'trzeci', 'czwarty', 'piaty', 'szósty', 'siódmy',
    ],
    TYPE_OPTIONS: [
        'Wykłady', 'Ćwiczenia', 'Laboratoria', 'Konwersatoria', 'Seminaria', 'Warsztaty', 'Repetytoria',
        'Wszystkie Zajęcia'
    ],
    PLATFORMS_OPTIONS: [
        'Microsoft Teams', 'Google Classroom', 'Hangouts Meet', 'Zoom', 'Skype', 'Slack', 'Facebook', 'WhatsApp',
        'Big Blue Button', 'Cisco Webex Teams',
    ],
};

export default STATIC_OPTIONS;