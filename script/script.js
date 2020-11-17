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
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', () => handlerMenu());

        menu.addEventListener('click', (event) => {
            if (!event.target.matches('.close-btn') && !event.target.matches('ul>li>a')) {
                return;
            }
            handlerMenu(event);
        });

    };
    toggleMenu();

    // popup

    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            btnPopup = document.querySelectorAll('.popup-btn'),
            btnPopupClose = document.querySelector('.popup-close'),
            popUpContent = document.querySelector('.popup-content');
        popUpContent.style.transform = `translate(-50%)`;
        let transformModal = 0;

        const modalAnimate = () => {
            transformModal++;
            console.log(transformModal);
            popUpContent.style.left = `${transformModal}%`;
            if (transformModal < 50) {
                window.requestAnimationFrame(modalAnimate);
            }
        };

        btnPopup.forEach((item) => {
            item.addEventListener('click', () => {
                popUp.style.display = `block`;
                if (document.documentElement.clientWidth > 768) {
                    modalAnimate();
                } else {
                    popUpContent.style.left = `50%`;
                }
            });
        });

        popUp.addEventListener('click', (event) => {
            let target = event.target;
            transformModal = 0;
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

});
