var calculator = new Calculator('#calculator');

$(function() {
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

	$('.js-callback').on('click', function() {
		$('.md').addClass('_show');
	});

	$('.js-md-close').on('click', function() {
		$(this).parent().parent().parent().removeClass('_show');
	});

	$('.md__overlay').on('click', function() {
		$(this).parent().removeClass('_show');
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
