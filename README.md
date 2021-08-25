<h1 align="center">
  POLSL Web Application
  <br>
  <img src="https://raw.githubusercontent.com/Milosz08/ReactJS_Web_Application_POLSL/master/img/main-logo.png" width="200">
  <br>
</h1>
<p align="center" style="font-size: 1.2rem;">
Advanced, full-stack web application written using the ReactJS library and other smaller ones from NPM. This application was written for students of the "Computer Science" course at the Faculty of Electrical Engineering of the Silesian University of Technology, starting their studies in 2020/2021.
</p>

> See this website at [informatyka-pol-elektr.pl](https://informatyka-pol-elektr.pl/) <br>
> See API for this website written in NodeJS in my repo: [NodeJS_ServerAPI_POLSL](https://github.com/Milosz08/NodeJS_ServerAPI_POLSL)

<hr/>

## About the Project
This application was created to provide comprehensive information to students on the current schedule of classes, upcoming activities and information about currently held subjects. This is my first such large and advanced project using the ReactJS library. Writing the application took me about 1.5 months in total. It was a very long 1.5 months of hard work with the code, but thanks to writing the application I learned a lot of new things about ReactJS, TypeScript and the whole NodeJS development environment.

## Custom CMS (Content Management System)
I created my own CMS for this application written fully in TypeScript. It was a big challenge for me because I was creating such a system for the first time and it may not be perfect, but it works perfectly for its purposes. This system closely communicates with the global React Context Store and API written in NodeJS.

<hr/>

## Screenshot gallery

> Main Page
<img src="https://raw.githubusercontent.com/Milosz08/ReactJS_Web_Application_POLSL/master/img/screenshot-1.PNG" width="1920">

> Calendar Page
<img src="https://raw.githubusercontent.com/Milosz08/ReactJS_Web_Application_POLSL/master/img/screenshot-2.PNG" width="1920">

> CMS Login Panel
<img src="https://raw.githubusercontent.com/Milosz08/ReactJS_Web_Application_POLSL/master/img/screenshot-3.PNG" width="1920">

> CMS Main Panel
<img src="https://raw.githubusercontent.com/Milosz08/ReactJS_Web_Application_POLSL/master/img/screenshot-4.PNG" width="1920">

## Website Routing Structure
This application was written in the SPA (Single Page Application) standard. Due to this, routing between individual subpages is carried out using the `react-router-dom` library. I also used the `ProtectedRoute` component to support login systems (both for the user and for the administrator).

Main structure of all routings in this application:

```
  informatyka-pol-elektr.pl
  ├── interaktywny-plan-zajęć
  ├── kalendarz-studenta
  ├── warunki-zaliczenia-przedmiotów
  ├── pomoce-naukowe
  ├── logowanie
  ├── polityka-prywaności-cookies
  └── logowanie-do-panelu-administratora
      └── panel-administatora
```

> Simple use of protected routing component on this site (using TypeScript):

```tsx
import React from 'react';
import { Redirect, Route } from 'react-router';

interface PropsProvider {
   auth: boolean;
   setAuth: (value: boolean) => boolean;
   redirectPath: string;
   component: React.FunctionComponent;
}

const ProtectedLoginRoute: React.FC<PropsProvider | any> = ({
   auth, setAuth, redirectPath, component: Component, ...rest
}): JSX.Element => {

   const renderPathStructure = (props: any) => {
      if(auth) {
         return <Component {...props} setAuth = {setAuth}/>;
      } else {
         return <Redirect to = {redirectPath}/>;
      }
   }

   return (
      <Route {...rest} render = {(props: any) => renderPathStructure(props)}/>
   );
}

export default ProtectedLoginRoute;
```

If, like me, you had a problem with routing in a ready-made application hosted on the server (which was not on localhost) and you use express in the back-end, use this script in the main server file (for example `index.js` or `app.js`):

```js
const express = require('express');
const path = require('path');

const app = express();

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '[your index.html file path on server]'), (err) => {
    if(err) res.status(500).send(err);
  });
});
```

## Clone and Installation
If you want to clone and work with this repository, use the built-in interface in your IDE (for example WebStorm or Visual Studio Code) or use the clone project algorithm with git bash:<br>
1. Open Git Bash.
2. Change the current working directory to the location where you want the cloned directory.
3. Type `git clone` and then paste the URL you copied earlier.
  
```
$ git clone https://github.com/Milosz08/ReactJS_Web_Application_POLSL
```

> This project has quite a few dependencies that need to be installed using NPM before cloning the repository. List of all necessary dependencies below.
  
> This project is mostly written in TypeScript. For the correct operation of the cloned application, you must have the TypeScript compiler installed together with the Create React App environment. If you do not know how to initiate the Create React App environment, go to [this link](https://create-react-app.dev/docs/getting-started).

## Dependencies
All packages with dependencies used in the project can be found in the `package.json`. In addition, in each component I have included information about what packages I use and what versions they are.

## License
This application is on MIT License [terms of use](https://en.wikipedia.org/wiki/MIT_License).
