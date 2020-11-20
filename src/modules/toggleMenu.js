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

export default toggleMenu;