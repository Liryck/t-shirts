$(document).ready(function(){
    // Modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('[data-modal=order]').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('[data-title]').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thx, #order').fadeOut('slow');
    });

    // $('#checkbox').click(function(){
    //     $('.header__mob-menu').toggleClass('header__mob-menu_active');
    // });

    // Mobile Menu

    const mobMenu = document.querySelector('.header__mob-menu'),
          checkbox = document.getElementById('checkbox');

    checkbox.addEventListener('click', (e) => {
        mobMenu.classList.toggle('header__mob-menu_active');
    });

    // Form Validate

    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 3,
                    maxlength: 10
                },
                phone: "required"
            },
            messages: {
                name: {
                    required: "Будь ласка, введіть своє ім'я",
                    minlength: jQuery.validator.format("Введіть мінімум {0} символів!"),
                    maxlength: jQuery.validator.format("Максимум {0} символів!")
                  },
                phone: "Будь ласка, введіть свій номер телефону"
            },
            errorClass: "form__error"
        });
    };

    validateForms('#consultation form');
    validateForms('#order form');

    // Phone mask

    $('[name=phone]').mask("+38 (999) 999-99-99");

    // Sending email

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thx').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

});