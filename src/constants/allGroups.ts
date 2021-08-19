/**
 * @file allGroups.ts
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
export interface GroupsStaticTypes {
   NORMAL_GROUPS: NormalGroupsTypes[];
   ENG_GROUPS: string[];
}
export interface NormalGroupsTypes {
   [value: string]: string;
}

/**
 * @details An object representing each groups.
 */
const GROUPS_STATIC: GroupsStaticTypes = {
   NORMAL_GROUPS: [
      {
         field: 'firstGroup',
         text: 'Pierwsza',
      },
      {
         field: 'secondGroup',
         text: 'Druga',
      }
   ],
   ENG_GROUPS: [
      'b2a',
      'b2b',
      'c1a',
      'c1b',
   ],
};

export default GROUPS_STATIC;