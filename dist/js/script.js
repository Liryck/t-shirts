// Modal
const modalTrigger = document.querySelectorAll('[data-modal]'),
      modalClose = document.querySelector('[data-close]'),
      modal = document.querySelector('.modal');

function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    // clearInterval(modalTimerId);
}

function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

modalTrigger.forEach(modalTrigger => {
    modalTrigger.addEventListener('click', openModal);
});

modalClose.addEventListener('click', () => {
    closeModal();
});

modal.addEventListener('click', (e) => {
    if(e.target === modal) {
    closeModal();
    
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
    closeModal();
    }
});

    //Validate form

    function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Будь ласка, введіть своє ім'я",
                    minlength: jQuery.validator.format("Введіть як мінімум {4} символа!")
                },
                phone: "Будь ласка введіть свій номер телефона",
            }
        });
    }

    valideForms('form');

    $('input[name=phone]').mask("+38 (999) 999-9999");


    // Sending email
    $('form').submit(function(e) {
        e.preventDefault();                 //відмінити стандартну поведінку браузера

        if(!$(this).valid()) {
            return;                         //заборона відправки пустої форми
        }

        $.ajax({                            //технологія обміну данними без перезавантаження сторінки
            type: "POST",                   //відправка
            url: "mailer/smart.php",        //файл для роботи з сервером
            data: $(this).serialize()       //вказуємо яку інформацію відправляємо на сервер
        }).done(function() {                //обробка відповіді від сервера
            $(this).find("form__input").val("");  //очистити поля форми
            $('form').fadeOut();
            $('.overlay, #thx').fadeIn('slow');

            $('form').trigger('reset');     //оновити форму
        });
        return false;                       //повторити, якщо помилка
    });