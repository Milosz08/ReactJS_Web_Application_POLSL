/**
 * @file ScheduleNormalGroupInputs.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                classnames: "^2.3.1"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { useContext } from 'react';
import classnames from 'classnames';

import { ScheduleContext, ScheduleType } from '../../../../contextStore/ScheduleProvider';
import GROUPS_STATIC, { NormalGroupsTypes } from '../../../../constants/allGroups';

const { groupRadio, customRadio, radioInputContainer, activeRadio } = require('./ScheduleForm.module.scss');

/**
 * @details Component that generates radio inputs for general group selection.
 *          Data retrieved from context and static TS files.
 */
const ScheduleNormalGroupInputs = (): JSX.Element => {

    const { NORMAL_GROUPS } = GROUPS_STATIC;
    const { groupSelected, setGroupSelected } = useContext<Partial<ScheduleType>>(ScheduleContext);

    const generateInputStructure = NORMAL_GROUPS.map((object: NormalGroupsTypes) => {
        const activeRadioClass = groupSelected === object.text
            ? classnames(radioInputContainer, activeRadio) : radioInputContainer;

        return (
            <div key = {object.text} className = {activeRadioClass}>
                <input
                    type = 'radio'
                    id = {object.text}
                    name = 'groups'
                    onChange = {({ target }) => setGroupSelected!(target.id)}
                    checked = {groupSelected === object.text}
                    value = {object.text}
                />
                <label htmlFor = {object.text}>
                    Grupa {object.text}
                </label>
                <div className = {customRadio}/>
            </div>
        );
    });

    return (
        <div className = {groupRadio}>
            {generateInputStructure}
        </div>
    );
}

export default ScheduleNormalGroupInputs;