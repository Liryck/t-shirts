'use strict';

$(document).ready(function(){

	// Mobile Menu

	const mobMenu = document.querySelector('.header__mob-menu'),
		  checkbox = document.getElementById('checkbox');

	checkbox.addEventListener('click', (e) => {
		mobMenu.classList.toggle('header__mob-menu_active');
	});

	// Color Selector

	const colorSelectors = document.querySelectorAll('.catalog__colors');

	colorSelectors.forEach(colorSelector => {
		colorSelector.addEventListener('change', function() {
			const selectedColor = this.value;
			const parentDiv = this.closest('[data-product]');
			const divs = parentDiv.querySelectorAll('[data-color]');
			
			divs.forEach(div => {
				const dataColor = div.getAttribute('data-color');
				if (dataColor === selectedColor) {
					div.classList.add('active');
				} else {
					div.classList.remove('active');
				}
			});
		});
	});

	// Slider
	
	const slides = document.querySelectorAll('.product__slide'),
		prev = document.querySelector('.product__slider-prev'),
		next = document.querySelector('.product__slider-next'),
		slidesWrapper = document.querySelector('.product__slider-wrapper'), // Use querySelector for single elements
		slidesField = document.querySelector('.product__slider-inner'), // Use querySelector for single elements
		width = window.getComputedStyle(slidesWrapper).width;

	let offset = 0;
	let touchStartX = 0;
	let touchEndX = 0;

	slidesField.style.width = 100 * slides.length + '%';

	slides.forEach(slide => {
		slide.style.width = width;
	});

	if (slides.length <= 1) {
		prev.style.display = 'none';
		next.style.display = 'none';
	}

	next.addEventListener('click', nextSlide);
	prev.addEventListener('click', prevSlide);

	slidesWrapper.addEventListener('touchstart', (event) => {
		touchStartX = event.touches[0].clientX;
	});

	slidesWrapper.addEventListener('touchmove', (event) => {
		touchEndX = event.touches[0].clientX;
	});

	slidesWrapper.addEventListener('touchend', () => {
		const difference = touchStartX - touchEndX;
		if (Math.abs(difference) > 50) { // Add additional check to avoid accidental touches
			if (difference > 0) {
				nextSlide();
			} else {
				prevSlide();
			}
		}
	});

	const slideSwipe = setInterval(nextSlide, 3500); 

	function nextSlide() {
		if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += +width.slice(0, width.length - 2);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;
	}

	function prevSlide() {
		if (offset == 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1);
		} else {
			offset -= +width.slice(0, width.length - 2);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;
	}

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