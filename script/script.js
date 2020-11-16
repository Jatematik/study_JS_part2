'use strict';

window.addEventListener('DOMContentLoaded', () => {

    // Timer
    function countTimer(deadLine) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };
        }

        function updateClock() {
            const timer = getTimeRemaining();

            timerHours.textContent = timer.hours;
            timerMinutes.textContent = ('0' + timer.minutes).slice(-2);
            timerSeconds.textContent = ('0' + timer.seconds).slice(-2);

            if (timer.hours.toString().length < 2) {
                timerHours.textContent = ('0' + timer.hours).slice(-2);
            }

            if (timer.timeRemaining < 1) {
                clearInterval(stopTimer);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        }

        const stopTimer = setInterval(updateClock, 1000);
        updateClock();
    }

    countTimer('20 nov 2020 00:00');

    // Menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu');
        let transformModal = -100;

        const handlerMenu = () => {
            transformModal += 5;
            menu.style.transform = `translateX(${transformModal}%)`;
            if (transformModal < 0) {
                window.requestAnimationFrame(handlerMenu);
            }
        };

        const menuAnimate = () => {
            if (!menu.style.transform || menu.style.transform === `translateX(-100%)`) {
                if (document.documentElement.clientWidth >= 768) {
                    window.requestAnimationFrame(handlerMenu);
                } else {
                    menu.style.transform = `translateX(0)`;
                }
            } else {
                menu.style.transform = `translateX(-100%)`;
                transformModal = -100;
            }
        };

        menu.addEventListener('click', (event) => {
            if (!event.target.matches('.close-btn') && !event.target.matches('ul>li>a')) {
                return;
            }
            menuAnimate(event);
        });
        btnMenu.addEventListener('click', () => menuAnimate());

    };

    toggleMenu();

    // popup
    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            btnPopup = document.querySelectorAll('.popup-btn');

        btnPopup.forEach((item) => {
            item.addEventListener('click', () => {
                popUp.style.display = `block`;
            });
        });

        popUp.addEventListener('click', (event) => {
            let target = event.target;

            if (target.matches('.popup-close')) {
                popUp.style.display = `none`;
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popUp.style.display = `none`;
                }
            }
        });
    };

    togglePopUp();

    // tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        
        const toggleTabContent = (index) => {
            for(let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
                target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }

        });
    };

    tabs();

    // Slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content'),
            dots = document.querySelector('.portfolio-dots');

        const dot = document.createElement('li');
         
        for (let i = 0; i < slide.length; i++) {
            const dotClone = dot.cloneNode();
            dotClone.classList.add('dot');  
            dots.append(dotClone);
        }
        
        const createDot = document.querySelectorAll('.dot');
        createDot[0].classList.add('dot-active');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(createDot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(createDot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(createDot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                createDot.forEach((item, index) => {
                    if (item === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(createDot, currentSlide, 'dot-active');
        });


        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                startSlide();
            }
        });

        startSlide(1500);
    };

    slider();
});
