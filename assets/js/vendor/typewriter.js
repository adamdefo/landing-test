/**
 * http://www.adamdefo.ru
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 */
;(function(window) {

		'use strict';

		var extend = function (a, b) {
			for (var key in b) {
				if (b.hasOwnProperty(key)) {
					a[key] = b[key];
				}
			}
			return a;
		};

		var TypeWriter = function (selector, params) {
			this.el = document.querySelector(selector);
			if (this.el) {
				this.$codeField = this.el.querySelector('.terminal__code');
			}

			this._params = extend({}, this._params);
			extend(this._params, params);

			this.timer;

			this._init();
		};

		TypeWriter.prototype._params = {
			speed: 60, // скорость вывода символов
			timeout: 1800, // через какое время запустить терминал
			inTxt: '',
			outTxt: 'TypeWriter version 1.0.0' // выводимый текст
		};

		TypeWriter.prototype._init = function () {
			this._initEvents();
			// this._in();
			// this._out();
		};

		TypeWriter.prototype._in = function () {
			// console.log(this._params.inTxt);
		};

		TypeWriter.prototype._out = function () {
			var self = this, counter = 0;
			this._reset();
			if (!this.timer) {
				setTimeout( function () {
					self.timer = setInterval(function() {
						if (counter < self._params.outTxt.length) {
							self.$codeField.innerHTML += self._params.outTxt.charAt(counter);
				      counter++;
				    } else {
							clearInterval(self.timer);
						}
					}, self._params.speed);
				}, self._params.timeout);
			}
		};

		TypeWriter.prototype._show = function () {
			if (!classie.hasClass(this.el, '_show')) {
				classie.add(this.el, '_show');
			}
		};

		TypeWriter.prototype._hide = function () {
			if (classie.hasClass(this.el, '_show')) {
				classie.remove(this.el, '_show');
			}
		};

		// сбрасываем таймер и очищаем вывод
		TypeWriter.prototype._reset = function () {
			clearInterval(this.timer);
			this.timer = undefined;
			this.$codeField.innerHTML = '';
		};

		TypeWriter.prototype._initEvents = function () {
			var self = this;

			document.addEventListener('keydown', function(ev) {
				var keyCode = ev.keyCode || ev.which;
				if (keyCode === 13) {
					self._show();
					self._out();
				} else if (keyCode === 27) {
					self._hide();
					self._reset();
				}
			});
		};

		window.TypeWriter = TypeWriter;

})(window);
