/*
 * Copyright (c) 2021, by Miłosz Gilga <https://miloszgilga.pl>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     <http://www.apache.org/license/LICENSE-2.0>
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the license.
 */

import * as React from 'react';
import { PureComponent } from 'react';

import { ComponentToPrintContainer } from './ComponentToPrint.styles';

import ComponentToPrintGenerateInfo from './subcomponents/ComponentToPrintGenerateInfo';
import ComponentToPrintHeaderData from './subcomponents/ComponentToPrintHeader';
import ComponentToPrintGrid from './subcomponents/ComponentToPrintGrid';

interface PropsProvider {
    date: string;
}

/**
 * Class component that dynamically renders a plan based on records retrieved from the database and
 * user selections. It uses a static stora and sets the values for state in the constructor when the
 * component is mounted.
 */
class ComponentToPrint extends PureComponent<PropsProvider> {

    render(): JSX.Element {
        return (
            <ComponentToPrintContainer>
                <ComponentToPrintHeaderData
                    date = {this.props.date}
                />
                <ComponentToPrintGrid/>
                <ComponentToPrintGenerateInfo/>
            </ComponentToPrintContainer>
        );
    }
}

export default ComponentToPrint;