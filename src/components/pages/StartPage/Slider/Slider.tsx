import React, { useEffect, useRef, useState } from 'react';

import SliderButtons from "./SliderButtons";
import SliderDots from "./SliderDots";

const {
   bannerContainer, centerSection, mainTitle, bannerNavigate, colorGrade, sliderComp
} = require('./Slider.module.scss');

const IMAGES_COUNT = 3;

interface PropsProvider {
   autoPlay: boolean;
   duration: number;
}

/**
 * Komponent generujący slider (wykorzystywany tylko na stronie głównej). W zależności od wartości przekazywanych
 * w propsach, możliwość wyłączenia autoodtwarzania, lub ustawiania własnego czasu między slajdami.
 *
 * @param autoPlay { boolean } - czy slider ma sam przerzucać zdjęcia.
 * @param duration { number } - długość trwania jednego slajdu (w sekundach).
 */
const Slider: React.FC<PropsProvider> = ({ autoPlay, duration }) => {

   const [ axiosX, setAxiosX ] = useState<number>(100);
   const autoPlayRef = useRef<any>(null);

   useEffect(() => { autoPlayRef.current = nextSlide });
   useEffect(() => {
      const play = () => autoPlayRef.current();
      if(autoPlay) {
         const interval = setInterval(play, duration * 1000);
         return () => clearInterval(interval);
      }
   }, [autoPlay, duration]);

   const nextSlide = () => {
      if(axiosX === -100 * (IMAGES_COUNT - 2)) {
         setAxiosX(100);
      } else {
         setAxiosX(axiosX - 100);
      }
   }

   const prevSlide = () => {
      if(axiosX === 100) {
         setAxiosX(-100 * (IMAGES_COUNT - 2));
      } else {
         setAxiosX(axiosX + 100);
      }
   }

   const imageStructure = Array.from({ length: IMAGES_COUNT }, (v, i) => i).map((count: number) => {
      const imageSrc = `${process.env.PUBLIC_URL}/images/bannerImages/img${count + 1}.jpg`;
      const imgStyles = {
         transform: `translateX(${axiosX}%)`,
         width: `${100 / IMAGES_COUNT}%`,
      };
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
               <h2>Informatyka</h2>
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