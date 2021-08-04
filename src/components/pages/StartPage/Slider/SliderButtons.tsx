import React from 'react';
import classnames from "classnames";

const { arrow, left, right } = require('./Slider.module.scss');

interface PropsProvider {
   moveSlide: () => void;
   direction: string;
}

/**
 * Komponent implementujący pojedyńczą strzałkę (przycisk) służącą do przesuwania slajdów w sliderze. W zależności
 * od parametrów podanych w propsach, generuje się strzałka umożliwiająca przesuwanie w lewo bądź prawo.
 *
 * @param moveSlide { () => void } - funkcja wywoływana na klik, przesuwanie slajdów.
 * @param direction { string } - kierunek przesuwania slajdów (dla generowania strzałek).
 */
const SliderButtons: React.FC<PropsProvider> = ({ moveSlide, direction }) => {

   const classToggle = direction === 'left' ? left : right;

   return (
      <button
         className = {classnames(arrow, classToggle)}
         onClick = {moveSlide}
      />
   );
}

export default SliderButtons;