const togglePopUp = () => {
    const popUp = document.querySelector('.popup'),
        btnPopup = document.querySelectorAll('.popup-btn'),
        btnPopupClose = document.querySelector('.popup-close'),
        popUpContent = document.querySelector('.popup-content'),
        form = document.getElementById('form3'),
        inputs = form.querySelectorAll('input');
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
            inputs.forEach((item) => {
                item.value = '';
            });
        } else {
            target = target.closest('.popup-content');
            if (!target) {
                popUp.style.display = `none`;
                inputs.forEach((item) => {
                    item.value = '';
                });
            }
        }
    });
};

export default togglePopUp;