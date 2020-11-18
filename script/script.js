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

    // Hover for img

    const hoverImg = () => {
        const img = document.querySelectorAll('.command__photo');

        img.forEach((item) => {
            let a = item.getAttribute('src');
            item.addEventListener('mouseover', (event) => {
                event.target.src = event.target.dataset.img;
            });
            item.addEventListener('mouseleave', (event) => {
                event.target.src = a;
            });

        });
    };

    hoverImg();

    // Validate calculator

    const validate = () => {
        const calcBlock = document.querySelector('.calc-block');

        calcBlock.addEventListener('input', (event) => {
            const target = event.target;
            if (target.matches('.calc-square') || target.matches('.calc-count') || target.matches('.calc-day')) {
                target.value = target.value.replace(/^0|\D/g, '');
            }
        });
    };

    validate();

    // Calculator

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcCount = document.querySelector('.calc-count'),
            calcDay = document.querySelector('.calc-day'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = Number(calcSquare.value);

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
    };

    calc(100);

    //send-ajax-form

    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const form = document.getElementById('form1'),
            formModal = document.getElementById('form3'),
            formFooter = document.getElementById('form2');
        const statusMessage = document.createElement('div');
        statusMessage.style.cssText = `font-size: 2rem;
        color: white;`;

        const inputForm = form.querySelectorAll('input'),
            inputFormModal = formModal.querySelectorAll('input'),
            inputFormFooter = formFooter.querySelectorAll('input');

        //validate in forms

        inputForm.forEach(item => {
            if (item === document.getElementById('form1-email')) {
                item.setAttribute('required', '');
            }
            item.addEventListener('input', () => {
                if (item.matches('#form1-phone')) {
                    item.value = item.value.replace(/(?!^\+)\D/g, '');
                }
                if (item.matches('#form1-name')) {
                    item.value = item.value.replace(/(?!\s|[а-яА-Я])\D/g, '');
                }
            });    
        });

        inputFormModal.forEach(item => {
            if (item === document.getElementById('form3-email')) {
                item.setAttribute('required', '');
            }
            item.addEventListener('input', () => {
                if (item.matches('#form3-phone')) {
                    item.value = item.value.replace(/(?!^\+)\D/g, '');
                }
                if (item.matches('#form3-name')) {
                    item.value = item.value.replace(/(?!\s|[а-яА-Я])\D/g, '');
                }
            });
        });

        inputFormFooter.forEach(item => {
            if (item === document.getElementById('form2-email')) {
                item.setAttribute('required', '');
            }
            item.addEventListener('input', () => {
                if (item.matches('#form2-phone')) {
                    item.value = item.value.replace(/(?!^\+)\D/g, '');
                }
                if (item.matches('#form2-name') || item.matches('#form2-message')) {
                    item.value = item.value.replace(/(?!\s|[а-яА-Я])\D/g, '');
                }
            });
        });


        // form submit

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;

            const formData = new FormData(form);
            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body).then((response) => {
                if (response.status !== 200) {
                    throw new Error('status network not 200.');
                }
                statusMessage.textContent = successMessage;
                function deleteMessageTime(){
                    statusMessage.remove();
                    clearInterval(deleteMessage);
                }
                let deleteMessage = setInterval(deleteMessageTime, 5000);
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
                console.log(error);
                function deleteMessageTime(){
                    statusMessage.remove();
                    clearInterval(deleteMessage);
                }
                let deleteMessage = setInterval(deleteMessageTime, 5000);
            }).finally(() => {
                inputForm.forEach((item) => {     
                    item.value = '';
                });
            });
        });

        formModal.addEventListener('submit', (event) => {
            event.preventDefault();
            formModal.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;

            const formDataModal = new FormData(formModal);
            let bodyModal = {};
            formDataModal.forEach((val, key) => {
                bodyModal[key] = val;
            });
            postData(bodyModal).then((response) => {
                if (response.status !== 200) {
                    throw new Error('status network not 200.');
                }
                statusMessage.textContent = successMessage;
                function deleteMessageTime(){
                    statusMessage.remove();
                    clearInterval(deleteMessage);
                }
                let deleteMessage = setInterval(deleteMessageTime, 5000);
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
                console.log(error);
                function deleteMessageTime(){
                    statusMessage.remove();
                    clearInterval(deleteMessage);
                }
                let deleteMessage = setInterval(deleteMessageTime, 5000);
            }).finally(() => {
                inputFormModal.forEach((item) => {     
                    item.value = '';
                });
            });
        });

        formFooter.addEventListener('submit', (event) => {
            event.preventDefault();
            formFooter.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;

            const formFooterData = new FormData(formFooter);
            let bodyFooter = {};
            formFooterData.forEach((val, key) => {
                bodyFooter[key] = val;
            });
            postData(bodyFooter).then((response) => {
                if (response.status !== 200) {
                    throw new Error('status network not 200.');
                }
                statusMessage.textContent = successMessage;
                function deleteMessageTime(){
                    statusMessage.remove();
                    clearInterval(deleteMessage);
                }
                let deleteMessage = setInterval(deleteMessageTime, 5000);
            })
            .catch((error) => {
                statusMessage.textContent = errorMessage;
                console.log(error);
                function deleteMessageTime(){
                    statusMessage.remove();
                    clearInterval(deleteMessage);
                }
                let deleteMessage = setInterval(deleteMessageTime, 5000);
            }).finally(() => {
                inputFormFooter.forEach((item) => {     
                    item.value = '';
                });
            });
        });

        // Promise

        const postData = (body) => {
            return fetch('./server.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            });
        };
    };

    sendForm();
});
