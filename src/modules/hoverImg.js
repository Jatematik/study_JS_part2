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

export default hoverImg;