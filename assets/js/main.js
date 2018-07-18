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

	$('.js-show-callback').on('click', function() {
		$('.md').addClass('_show');
	});

	$('.js-md-close').on('click', function() {
		$(this).parent().parent().parent().removeClass('_show');
	});

	$('.md__overlay').on('click', function() {
		$(this).parent().removeClass('_show');
	});

	$('.js-phone').mask('+7 (999) 999-9999');
	
	// заявка на обратный звонок
	var $formCallback = $(".js-form-callback");
	$(".js-send-callback").on('click', function(ev) {
		console.log('send callback')
		ev.preventDefault();
		var error = 0;
	
		var name = $formCallback.find('input[name=name]').val();
		if (!name) {
			error++;
			$formCallback.find('input[name=name]').parent().addClass("_error");
		};
	
		var phone = $formCallback.find('input[name=phone]').val();
		if (!phone) {
			error++;
			$formCallback.find('input[name=phone]').parent().addClass("_error");
		};
	
		if(error == 0) {
			$.ajax({
				async: true,
				type: "POST",
				url: "/ajax/callback.php",
				dataType: "json",
				data: {name: name, phone: phone, email: email, message: message},
				success: function(data) {
					console.log(data)
				},
				error: function(data) {
					// if (data.status == 200) {
					// 	alert('Сообщение отправлено!');
					// 	$.each(formInputs, function() {
					// 		$(this).val('');
					// 	});
					// } else {
					// 	console.log('Статус ошибки: ' + data.status);
					// }
				}
			});
		};
	
		return false;
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
