/**
 * @file request.js
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief JavaScript file storing functions.
 *
 * @project_name "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @date final version: 08/24/2021
 */

import axios from 'axios';

/**
 * @details Function that sets a prefix for the API. Fixed value for the local server.
 */
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'https://localhost:3000/api',
});

export default axiosInstance;