import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const { bannerDots, activeDot } = require('./Slider.module.scss');

interface PropsProvider {
   dotsCount: number;
   actualState: number;
}

/**
 * Komponent generujący kropki na sliderze, wskazujące na aktualną pozycję slidera. W zależności od parametrów w
 * propsach, generuje się odpowiednia ilość kropek, oraz następuje aktywowanie stanu kropki.
 *
 * @param dotsCount { number } - ilość kropek do wygenerowania.
 * @param actualState { number } - przekazywanie akualnego stanu (aktualnie wyświetlanego obrazka)
 */
const SliderDots: React.FC<PropsProvider> = ({ dotsCount, actualState }) => {

   const generateDots = Array.from({length: dotsCount}).map((nullVal: unknown, index: number) => {
      const activeToggle = ((dotsCount - 1) - index) === actualState / 100 + 1 ? activeDot : null;

      console.log()
      return (
         <div key={uuidv4()} className = {activeToggle}/>
      );
   });

   return (
      <div className = {bannerDots}>
         {generateDots}
      </div>
   );
}

export default SliderDots;