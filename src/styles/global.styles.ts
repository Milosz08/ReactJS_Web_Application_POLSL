/*
 * Copyright (c) 2021-2021, by Miłosz Gilga <https://miloszgilga.pl>
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

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        backface-visibility: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html, body, button, input, select, option, textarea {
        font-family: 'Barlow Semi Condensed', sans-serif;
    }

    body {
        overflow-x: hidden;
    }
    
    body.disable-scroll {
        overflow-y: hidden;
    }
    
    * [role = 'link'] {
        cursor: pointer;
    }

    .stopTransitions * {
        animation: none !important;
        transition: none !important;
    }

    :root {
        --redColor:             #c43434;
        --greenColor:           #1d8e1d;
        --yellowColor:          #fefe00;
        --orangeColor:          #efaa15;
        --darkOrangeColor:      #df9e12;

        --blueColor:            #0056aa;
        --darkBlueColor:        #183557;
        --navyBlueColor:        #003c7d;
        --darkNavyBlueColor:    #00234a;

        --cleanWhiteColor:      #ffffff;
        --whiteColor:           #ececec;
        --blackColor:           #000000;
        --lightBlack:           #535353;
        --darkBlack:            #444444;

        --darkGray:             #797979;
        --darkGrayTint1:        #929292;
        --darkGrayTint2:        #b8b8b8;
        --darkGrayTint3:        #d0d0d0;
        --darkGrayTint4:        #cacaca;

        --lightGray:            #f2f2f2;
        --lightGrayTint1:       #e5e7e8;
        --lightGrayTint2:       #eeeeee;
        --lightGrayTint3:       #dfdfdf;
        --lightGrayTint4:       #e2e2e2;

        --boxShadowColor:       #bdbdbd;
        --boxShadowTint:        #b6b6b6;
        --boxShadowTint2:       #dbdbdb;
        --boxShadowTint3:       #878787;

        --widthVertical:        1200px; //Safearea content for 4:3 aspect ratio screens
        
        --transparentModal:     rgba(0, 0, 0, .6);
        --mobileNavigation:     rgba(229, 231, 232, .7);
        --boxShadowLight:       rgb(50 50 93 / 11%) 0 4px 6px, rgb(0 0 0 / 8%) 0 1px 3px;
        
        --transitionDuration:   .3s;
    }
`;

export default GlobalStyle;