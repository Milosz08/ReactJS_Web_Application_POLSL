import { library } from '@fortawesome/fontawesome-svg-core';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import * as Regular from '@fortawesome/free-regular-svg-icons';
import * as Brand from '@fortawesome/free-brands-svg-icons';

const iconList = Object
   .keys(Icons)
   .filter(key => key !== 'fas' && key !== 'prefix')
   .map(icon => Icons[icon]);

const iconRegular = Object
   .keys(Regular)
   .filter(key => key !== 'far' && key !== 'prefix')
   .map(icon => Regular[icon]);

const iconBrand = Object
   .keys(Brand)
   .filter(key => key !== 'fab' && key !== 'prefix')
   .map(icon => Brand[icon]);

library.add(...iconList, ...iconRegular, ...iconBrand);