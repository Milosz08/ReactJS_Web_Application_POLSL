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
import IconComponent, { IconFamiliesType } from '../../../../../../../helpers/componentsAndMiddleware/IconComponent';

import { DeleteContentIconsArrow, DeleteContentIconsContainer, DeleteContentIconsTrash } from '../DeleteContentModal.styles';

interface PropsProvider {
    deleteContentIcon: string;
}

/**
 * High order component responsible for generating header icons structure for deleting modal component.
 *
 * @param deleteContentIcon { string } - main icon name (from bootstrap icons library).
 */
const DeleteContentModalIconsComponent: React.FC<PropsProvider> = ({ deleteContentIcon }): JSX.Element => (
    <DeleteContentIconsContainer>
        <IconComponent
            family = {IconFamiliesType.BootStrapIcons}
            name = {deleteContentIcon}
        />
        <DeleteContentIconsArrow/>
        <DeleteContentIconsTrash/>
    </DeleteContentIconsContainer>
);

export default DeleteContentModalIconsComponent;