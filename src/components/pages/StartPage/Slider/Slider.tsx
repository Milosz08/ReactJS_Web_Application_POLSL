/**
 * @file Slider.tsx
 * @author Miłosz Gilga (gilgamilosz451@gmail.com)
 * @brief TypeScript React Stateless functional component (simplify state with React Hooks).
 *
 * @projectName "polsl-web-application-frontend"
 * @version "^0.1.0"
 *
 * @dependencies  ReactJS: "^17.0.2"
 *                ReactCSSmodules: "^1.0.2"
 *
 * @date final version: 08/19/2021
 */

import React, { useEffect, useRef, useState } from 'react';

const SliderButtons = React.lazy(() => import('./SliderButtons'));
const SliderDots = React.lazy(() => import('./SliderDots'));

const {
   bannerContainer, centerSection, mainTitle, bannerNavigate, colorGrade, sliderComp
} = require('./Slider.module.scss');

/**
 * Constant representing the number of photos in the "Public Folder" used by Slider.
 */
const IMAGES_COUNT: number = 3;

/**
 * Interface defining the type of props values.
 */
interface PropsProvider {
   autoPlay: boolean;
   duration: number;
}

/**
 * @details A component generating Slider (used only on the home page). Depending on the values transmitted in props,
 *          the ability to turn off autoops, or set your own time between slides.
 *
 * @param autoPlay { boolean } - automatic scrolling.
 * @param duration { number } - length of one slide (in seconds).
 */
const Slider: React.FC<PropsProvider> = ({ autoPlay, duration }): JSX.Element => {

   const [ axiosX, setAxiosX ] = useState<number>(100);
   const autoPlayRef:  React.MutableRefObject<any> = useRef<HTMLElement>(null);

   useEffect(() => {
      autoPlayRef.current = nextSlide;
   });

   useEffect(() => {
      const play = () => autoPlayRef.current();
      if(autoPlay) {
         const interval = setInterval(play, duration * 1000);
         return () => clearInterval(interval);
      }
   }, [autoPlay, duration]);

   const nextSlide = (): void => {
      if(axiosX === -100 * (IMAGES_COUNT - 2)) {
         setAxiosX(100);
      } else {
         setAxiosX(axiosX - 100);
      }
   }

   const prevSlide = (): void => {
      if(axiosX === 100) {
         setAxiosX(-100 * (IMAGES_COUNT - 2));
      } else {
         setAxiosX(axiosX + 100);
      }
   }

   const imageStructure: JSX.Element[] = Array.from({ length: IMAGES_COUNT }, (v, i) => i).map((count: number): JSX.Element => {
      const imageSrc = `${process.env.PUBLIC_URL}/images/bannerImages/img${count + 1}.jpg`;
      const imgStyles: { [value: string]: string } = { transform: `translateX(${axiosX}%)`, width: `${100 / IMAGES_COUNT}%` };
      return (
         <img
            src = {imageSrc}
            style = {imgStyles}
            alt = {`banner__setNumber${count}`}
            key = {`banner__setNumber${count}`}
         />
      )
   });

   return (
      <div className = {bannerContainer}>
         <div className = {centerSection}>
            <div className = {mainTitle}>
               <h2>informatyka</h2>
               <h3>Wydział Elektryczy, Politechnika Śląska.</h3>
               <h4>Rocznik 2020/2021.</h4>
            </div>
            <SliderDots
               dotsCount = {IMAGES_COUNT}
               actualState = {axiosX}
            />
         </div>
         <div className = {bannerNavigate}>
            <SliderButtons
               moveSlide = {prevSlide}
               direction = {'left'}
            />
            <SliderButtons
               moveSlide = {nextSlide}
               direction = {'right'}
            />
         </div>
         <div className = {colorGrade}/>
         <div
            className = {sliderComp}
            style = { {width: `${IMAGES_COUNT * 100}%`} }
         >
            {imageStructure}
         </div>
      </div>
   );
}

export default Slider;