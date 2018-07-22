// проверяет значение в инпуте
var validateInput = function(input) {
	var error = 0
	if (!input.value) {
		error++;
	}
	return !error;
}

// валидатор на email
var validateEmail = function(email) {
	var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return reg.test(email);
}

$(function() {
	var calculator = new Calculator('#calculator');

	$('#summa').rangeslider({
		polyfill: false,
		onInit: function() {
			this.value = calculator._params.summa;
		},
		onSlide: function(position, value) {
			calculator.updateInputValue(calculator.summaCtrl, value);
			calculator.calculate();
		},
		onSlideEnd: function(position, value) {}
	});

	$('#refil').rangeslider({
		polyfill: false,
		onInit: function() {
			this.value = calculator._params.refil;
		},
		onSlide: function(position, value) {
			calculator.updateInputValue(calculator.refilCtrl, value);
			calculator.calculate();
		},
		onSlideEnd: function(position, value) {}
	});

	// маска номера телефона
	$('.js-phone').mask('+7 (999) 999-9999');

	var $answerForm = $('.answer-form'),
		$answerFormPhone = $answerForm.find('.answer-form__phone > strong'),
		$answerFormBtn = $answerForm.find('.answer-form__btn > button');

	// заявка на обратный звонок
	var $callbackForm = document.querySelector('.js-form-callback'), // форма
		$clientName = $callbackForm.querySelector('input[name=name]'), // инпут Имя
		$clientPhone = $callbackForm.querySelector('input[name=phone]'), // инпут Номер телефона
		$clientIsAgree = $callbackForm.querySelector('input[name=isAgree]'), // чекбокс
		$sendCallback = $callbackForm.querySelector('.js-send-callback'); // кнопка Перезвоните

	var validateCallbackForm = function() {
		if (validateInput($clientName) && validateInput($clientPhone) && $clientIsAgree.checked) {
			$sendCallback.disabled = false;
		} else {
			$sendCallback.disabled = true;
		}
	}

	$clientName.addEventListener('blur', function() {
		validateCallbackForm();
	});

	$clientPhone.addEventListener('blur', function() {
		validateCallbackForm();
	});

	$clientIsAgree.addEventListener('change', function() {
		validateCallbackForm();
	});


	$sendCallback.addEventListener('click', function(event) {
		event.preventDefault();
		var error = 0;
	
		var name = $clientName.value;
		if (!name) {
			classie.add($clientName, '_error');
			error++;
		};
	
		var phone = $clientPhone.value;
		if (!phone) {
			classie.add($clientPhone, '_error');
			error++;
		};
	
		if(!error) {
			$.ajax({
				async: true,
				type: "POST",
				url: "/ajax/callback.php",
				dataType: "json",
				data: {name: name, phone: phone},
				success: function(data) {
					console.log(data)
					$answerFormPhone.text(phone);
				},
				error: function(data) {
					console.log(data)
				}
			});
		};
	
		return false;
	});

	$('.js-show-callback').on('click', function() {
		$('.md').addClass('_show');
	});

	$('.js-md-close').on('click', function() {
		$(this).parent().parent().parent().removeClass('_show');
	});

	$('.md__overlay').on('click', function() {
		$(this).parent().removeClass('_show');
	});

	// закрывает модалку с формой обратного звонка
	$answerFormBtn.on('click', function() {
		$('.md-callback').removeClass('_show');
	});

});

var myMap, myPlacemark;
ymaps.ready(initMap);
function initMap() { 
	myMap = new ymaps.Map("map", {
		center: [55.76, 37.64],
		zoom: 13,
		controls: ['zoomControl', 'fullscreenControl']
	});
	myPlacemark = new ymaps.Placemark([55.76, 37.64], {
		hintContent: 'Подсказка',
		balloonContent: 'Содержимое метки'
	});
	myMap.geoObjects.add(myPlacemark);
	myMap.behaviors.disable('scrollZoom');
};
