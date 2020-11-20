'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import hoverImg from './modules/hoverImg';
import validate from './modules/validate';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Timer
countTimer('25 nov 2020 00:00');
// Menu
toggleMenu();
// popup
togglePopUp();
// tabs
tabs();
// Slider
slider();
// Hover for img
hoverImg();
// Validate calculator
validate();
// Calculator
calc(100);
//send-ajax-form
sendForm();