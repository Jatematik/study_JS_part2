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

export default sendForm;