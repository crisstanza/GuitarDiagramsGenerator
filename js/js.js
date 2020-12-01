"use strict";

(function() {

	let GuitarDiagramsGenerator = io.github.crisstanza.GuitarDiagramsGenerator;

	let Form = {
		strings: null, name: null, variation: null,
		positions: null, leftHand: null, rightHand: null		
	}, DISPLAY;

	function initGlobals(event) {
		DISPLAY = document.querySelector('.display');
		Form.strings = document.querySelectorAll('input[type=radio][name=strings]');
		Form.name = document.querySelector('input[type=text][name=name]');
		Form.variation = document.querySelector('input[type=number][name=variation]');
		Form.positions = document.querySelector('input[type=text][name=positions]');
		Form.leftHand = document.querySelector('input[type=text][name=leftHand]');
		Form.rightHand = document.querySelector('input[type=text][name=rightHand]');
	}

	function reinitDisplay() {
		if (Form.name.value) {
			DISPLAY.setAttribute('data-chord', Form.name.value);
			DISPLAY.setAttribute('data-variation', Form.variation.value);
		} else {
			DISPLAY.setAttribute('data-chord', '');
			DISPLAY.setAttribute('data-variation', '');
		}
		DISPLAY.setAttribute('data-positions', Form.positions.value);
		DISPLAY.setAttribute('data-leftHand', Form.leftHand.value);
		DISPLAY.setAttribute('data-rightHand', Form.rightHand.value);
		reinitSvg();
	}

	function reinitSvg(strings) {
		GuitarDiagramsGenerator.reinit(strings);
		DISPLAY.querySelector('svg').setAttribute('class', 'flip');
	}

	function init(event) {
		initGlobals(event);
		Form.strings.forEach(string => string.addEventListener('change', function(event) { reinitSvg(event.target.value); }));
		Form.name.addEventListener('keyup', reinitDisplay);
		Form.variation.addEventListener('keyup', reinitDisplay);
		Form.positions.addEventListener('keyup', reinitDisplay);
		Form.leftHand.addEventListener('keyup', reinitDisplay);
		Form.rightHand.addEventListener('keyup', reinitDisplay);
		setTimeout(reinitDisplay, 100);
	}

	window.addEventListener('load', init);
})();
