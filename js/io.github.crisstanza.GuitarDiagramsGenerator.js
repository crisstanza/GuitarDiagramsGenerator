"use strict";

if (!io) var io = {};
if (!io.github) io.github = {};
if (!io.github.crisstanza) io.github.crisstanza = {};
if (!io.github.crisstanza.ElementsCreator) io.github.crisstanza.ElementsCreator = {};

(function() {

	io.github.crisstanza.ElementsCreator.create = function(name, attributes, parent, innerHTML) {
		let element = name ? document.createElement(name) : document.createTextNode(innerHTML);
		if (attributes) {
			for (var key in attributes) {
				element.setAttribute(key, attributes[key]);
			}
		}
		if (parent) {
			parent.appendChild(element);
		}
		if (innerHTML) {
			element.innerHTML = innerHTML;
		}
		return element;
	};

	io.github.crisstanza.ElementsCreator.create.svg = function(name, attributes, parent, innerHTML) {
		let element = document.createElementNS('http://www.w3.org/2000/svg', name);
		if (attributes) {
			for (var key in attributes) {
				element.setAttributeNS(null, key, attributes[key]);
			}
		}
		if (parent) {
			parent.appendChild(element);
		}
		if (innerHTML) {
			element.innerHTML = innerHTML;
		}
		return element;
	};

})();

if (!io.github.crisstanza.GuitarDiagramsGenerator) io.github.crisstanza.GuitarDiagramsGenerator = {};

(function() {

	let ElementsCreator =  io.github.crisstanza.ElementsCreator;

	let CHORDS = {
		'geni-e-o-zepelim_simplificado': {
			'Cm9': {
				'1': {'positions': 'x-3-x-x-x-x', 'leftHand': 'x-3-x-x-x-x', 'rightHand': 'x-P-x-I-M-x'}
			}
		}
	};

	let ROMANS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

	let WIDTH = 149;
	let HEIGHT = 235;
	let PADDING = 12;
	let STRINGS = 6;
	let FRETS = 6;
	let STRINGS_DISTANCE = 20;
	let FRETS_DISTANCE = 30;
	let STRING_HEIGHT = 155;

	function showChord(display) {
		display.innerHTML = '';

		let dataChord = display.getAttribute('data-chord');
		let dataVariation = display.getAttribute('data-variation');

		let name, variation, chord;
		if (!dataChord) {
			name = '?';
		} else {
			name = dataChord;
			variation = dataVariation;
			let dataArrangement = document.body.getAttribute('data-arrangement');
			let arrangement = CHORDS[dataArrangement];
			if (arrangement) {
				let chordAndVariations = arrangement[name];
				if (chordAndVariations) {
					chord = chordAndVariations[variation ? variation : 1];
				}
			}
		}

		let dataPositions = chord ? chord.positions : display.getAttribute('data-positions');
		let dataLeftHand = chord ? chord.leftHand : display.getAttribute('data-leftHand');
		let dataRightHand = chord ? chord.rightHand : display.getAttribute('data-rightHand');
		let dataDownload = display.getAttribute('data-download');
		dataDownload = dataDownload ? dataDownload == 'true' : document.body.getAttribute('data-download') == 'true';

		let svg = ElementsCreator.create.svg('svg', {width: WIDTH, height: HEIGHT, 'font-family': 'Arial'}, display);
		let borders = ElementsCreator.create.svg('rect', {width: '100%', height: '100%', x: 0, y: 0, stroke: 'gray', 'stroke-width': 1, fill: '#FFF'}, svg);
		let textName = ElementsCreator.create.svg('text', {'text-anchor': 'middle', 'dominant-baseline': 'hanging', x: '50%', y: PADDING, 'font-size': '15pt'}, svg, name);
		if (variation) {
			let textVariation = ElementsCreator.create.svg('text', {'text-anchor': 'end', 'dominant-baseline': 'hanging', x: WIDTH - PADDING, y: PADDING + 2, 'font-size': '12pt', 'font-style': 'italic', fill: 'gray'}, svg, variation);
		}
		let y1 = textName.getBBox().y + textName.getBBox().height + PADDING*2;
		let y2 = y1 + STRING_HEIGHT;
		let x = PADDING + (WIDTH - (STRINGS - 1)*STRINGS_DISTANCE)/2;
		for (let i = 0 ; i < STRINGS ; i++) {
			let line = ElementsCreator.create.svg('line', {x1: x + i*STRINGS_DISTANCE, y1: y1, x2: x + i*STRINGS_DISTANCE, y2: y2, stroke: 'black', 'stroke-width': 1}, svg);
		}
		let firstLine = ElementsCreator.create.svg('line', {x1: x - 2, y1: y1 - 1, x2: x + 2 + (STRINGS - 1)*STRINGS_DISTANCE, y2: y1 - 1, stroke: 'black', 'stroke-width': 2}, svg);
		for (let i = 0 ; i < FRETS ; i++) {
			let y = y1 + i*FRETS_DISTANCE + 2;
			let line = ElementsCreator.create.svg('line', {x1: x - 2, y1: y, x2: x + 2 + (STRINGS - 1)*STRINGS_DISTANCE, y2: y, stroke: 'black', 'stroke-width': 1}, svg);
		}

		if (dataPositions) {
			let positions = dataPositions.split('-');
			positions.length = STRINGS;
			let higherPosition = positions.reduce(function(a, b) { return Math.max(a == 'x' ? 0 : a, b == 'x' ? 0 : b); });
			let delta = higherPosition >= FRETS ? higherPosition - FRETS + 1 : 0;
			if (delta > 0) {
				firstLine.remove();
			}
			let leftHand = dataLeftHand ? dataLeftHand.split('-') : null;
			let rightHand = dataRightHand ? dataRightHand.split('-') : null;
			for (let i = 0 ; i < positions.length ; i++) {
				let position = positions[i];
				let positionIndex = (position == 'x' ? -1 : position - 1 - delta);
				let leftFinger = leftHand ? leftHand[i] : null;
				let rightFinger = rightHand ? rightHand[i] : null;
				if (position >= 0) {
					if (position == 0) {
						positionIndex = -1;
						ElementsCreator.create.svg('circle', {cx: x + STRINGS_DISTANCE*i, cy: y1 + positionIndex*FRETS_DISTANCE + FRETS_DISTANCE/2 + 2, r: STRINGS_DISTANCE/3, fill: '#EEE', stroke: 'black', 'stroke-width': 1}, svg)
					} else if (positionIndex >= 0) {
						ElementsCreator.create.svg('circle', {cx: x + STRINGS_DISTANCE*i, cy: y1 + positionIndex*FRETS_DISTANCE + FRETS_DISTANCE/2 + 2, r: STRINGS_DISTANCE/2.5, fill: '#EEE', stroke: 'black', 'stroke-width': 1}, svg)
						ElementsCreator.create.svg('text', {'text-anchor': 'middle', 'dominant-baseline': 'middle', x: x + STRINGS_DISTANCE*i, y: y1 + positionIndex*FRETS_DISTANCE + FRETS_DISTANCE/2 + 2 + 2, 'font-size': '11pt'}, svg, leftFinger);
					}
				} else if (position == 'x') {
					ElementsCreator.create.svg('text', {'text-anchor': 'middle', 'dominant-baseline': 'middle', x: x + STRINGS_DISTANCE*i, y: y1 + positionIndex*FRETS_DISTANCE/2 + 2 + 2, 'font-size': '11pt', 'font-weight': 'bold'}, svg, 'X');
				}
				if (rightFinger != 'x') {
					ElementsCreator.create.svg('text', {'text-anchor': 'middle', 'dominant-baseline': 'hanging', x: x + STRINGS_DISTANCE*i, y: y1 + (FRETS - 1)*FRETS_DISTANCE + 2 + FRETS_DISTANCE/4, 'font-size': '10pt', fill: '#555'}, svg, rightFinger);
				}
			}
			ElementsCreator.create.svg('text', {'text-anchor': 'middle', 'dominant-baseline': 'middle', x: x - STRINGS_DISTANCE/1, y: y1 + FRETS_DISTANCE/2 + 2 + 1, 'font-size': '11pt'}, svg, ROMANS[delta]);
		}

		if (dataDownload) {
			let downloadName = dataChord + (dataVariation ? '_' + dataVariation : '');
			ElementsCreator.create('br', {}, display);
			let downloadLinks = ElementsCreator.create('span', {style: 'font-size: 11pt'}, display, 'download: ');
			ElementsCreator.create('br', {}, downloadLinks);
			let img = ElementsCreator.create('img', {width: WIDTH, height: HEIGHT, style: 'display: none'}, display);
			var svgData = new XMLSerializer().serializeToString(svg);
			img.onload = function() {
				let canvas = ElementsCreator.create('canvas', {width: WIDTH, height: HEIGHT, style: 'display: none'}, display);
				var ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);
				let downloadImage = ElementsCreator.create('a', {download: downloadName + '.png'}, downloadLinks, 'imagem');
				downloadImage.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
				ElementsCreator.create('br', {}, downloadLinks);
				ElementsCreator.create('br', {}, downloadLinks);
			};
			img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(svgData));
			let downloadSvg = ElementsCreator.create('a', {download: downloadName + '.svg'}, downloadLinks, 'SVG');
			downloadSvg.href = 'data:image/octet-stream;base64,' + btoa(svgData) ;
			ElementsCreator.create(null, {}, downloadLinks, ' | ');
		}
	}

	io.github.crisstanza.GuitarDiagramsGenerator.init = function(event) {
		console.log('io.github.crisstanza.GuitarDiagramsGenerator [init]');
		let displays = document.querySelectorAll('[data-chord]');
		displays.forEach(showChord);
	}

	io.github.crisstanza.GuitarDiagramsGenerator.reinit = function(strings) {
		console.log('io.github.crisstanza.GuitarDiagramsGenerator [reinit]');
		if (strings) {
			STRINGS = strings;
		}
		io.github.crisstanza.GuitarDiagramsGenerator.init();
	};

})();
