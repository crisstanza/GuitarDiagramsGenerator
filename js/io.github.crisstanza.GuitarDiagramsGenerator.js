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
			'Cm9':   { '1': {'positions': 'x-3-x-0-3-x', 'leftHand': 'x-3-x-x-4-x', 'rightHand': 'x-P-x-I-M-x'} },
			'Fm6/C': { '1': {'positions': 'x-3-x-1-3-x', 'leftHand': 'x-3-x-1-4-x', 'rightHand': 'x-P-x-I-M-x'} },
			'G7/B': { '1': {'positions': 'x-2-x-0-3-x', 'leftHand': 'x-1-x-x-4-x', 'rightHand': 'x-P-x-I-M-x'} },
			'G7': { '1': {'positions': '3-x-3-4-x-x', 'leftHand': '1-x-2-3-x-x', 'rightHand': 'P-x-I-M-x-x'} },

			'Bb7': { '1': {'positions': '6-x-6-7-x-x', 'leftHand': '1-x-2-3-x-x', 'rightHand': 'P-x-I-M-x-x'} },
			'Eb/G': { '1': {'positions': '3-x-1-3-x-x', 'leftHand': '3-x-1-4-x-x', 'rightHand': 'P-x-I-M-x-x'} },
			'Cm/G': { '1': {'positions': '3-x-1-0-x-x', 'leftHand': '3-x-1-x-x-x', 'rightHand': 'P-x-I-M-x-x'} },
			'Am7(b5)': { '1': {'positions': 'x-0-5-5-x-x', 'leftHand': 'x-x-2-3-x-x', 'rightHand': 'x-P-I-M-x-x'} },
			'Ab7(#11)': { '1': {'positions': '4-x-4-5-x-x', 'leftHand': '1-x-2-3-x-x', 'rightHand': 'P-x-I-M-x-x'} },
			'Gm7': { '1': {'positions': '3-x-3-3-x-x', 'leftHand': '1-x-2-3-x-x', 'rightHand': 'P-x-I-M-x-x'} },
			'Eb7M/G': { '1': {'positions': '3-x-0-3-x-x', 'leftHand': '2-x-x-3-x-x', 'rightHand': 'P-x-I-M-x-x'} },

			'C':   { '1': {'positions': 'x-3-x-0-1-x', 'leftHand': 'x-3-x-x-1-x', 'rightHand': 'x-P-x-I-M-x'} },
			'G7(4)': { '1': {'positions': '3-x-3-5-x-x', 'leftHand': '1-x-2-4-x-x', 'rightHand': 'P-x-I-M-x-x'} },
			'A7': { '1': {'positions': 'x-0-x-0-2-x', 'leftHand': 'x-x-x-x-1-x', 'rightHand': 'x-P-x-I-M-x'} },
			'D7/A': { '1': {'positions': 'x-0-x-2-1-x', 'leftHand': 'x-x-x-2-1-x', 'rightHand': 'x-P-x-I-M-x'} },
			'Cm7/G': { '1': {'positions': '3-x-x-3-4-x', 'leftHand': '1-x-x-2-3-x', 'rightHand': 'P-x-x-I-M-x'} }
		},

		'injuriado_simplificado': {
			'E7M(9)': { '1': {'positions': 'x-7-x-8-7-x', 'leftHand': 'x-2-x-4-3-x', 'rightHand': 'x-P-x-I-M-x'} },
			'G#7/D#': { '1': {'positions': 'x-6-x-7-5-x', 'leftHand': 'x-3-x-4-1-x', 'rightHand': 'x-P-x-I-M-x'} },
			'C#m7': { '1': {'positions': 'x-4-x-4-5-x', 'leftHand': 'x-1-x-2-3-x', 'rightHand': 'x-P-x-I-M-x'} },
			'Bm6': { '1': {'positions': '7-x-x-7-7-x', 'leftHand': '2-x-x-3-4-x', 'rightHand': 'P-x-x-I-M-x'} },
			'Em6(9)/B': { '1': {'positions': '7-x-5-6-x-x', 'leftHand': '3-x-1-2-x-x', 'rightHand': 'P-x-I-M-x-x'} },
			'Em7(9)/B': { '1': {'positions': '7-x-5-7-x-x', 'leftHand': '3-x-1-4-x-x', 'rightHand': 'P-x-I-M-x-x'} },
			'G#7/B#': { '1': {'positions': '8-x-6-8-x-x', 'leftHand': '3-x-1-4-x-x', 'rightHand': 'P-x-I-M-x-x'} },
			'G#7(#5)/B#': { '1': {'positions': '8-x-6-9-x-x', 'leftHand': '3-x-1-4-x-x', 'rightHand': 'P-x-I-M-x-x'} },

			'Bm6/D': { '1': {'positions': 'x-5-x-4-7-x', 'leftHand': 'x-2-x-1-4-x', 'rightHand': 'x-P-x-I-M-x'} },
			'C#7': { '1': {'positions': 'x-4-x-4-6-x', 'leftHand': 'x-1-x-2-4-x', 'rightHand': 'x-P-x-I-M-x'} },
			'A7M/C#': { '1': {'positions': 'x-4-x-2-5-x', 'leftHand': 'x-3-x-1-4-x', 'rightHand': 'x-P-x-I-M-x'} },
			'Am6/C': { '1': {'positions': 'x-3-x-2-5-x', 'leftHand': 'x-2-x-1-4-x', 'rightHand': 'x-P-x-I-M-x'} },
			'E7M(9)/B': { '1': {'positions': 'x-2-x-1-4-x', 'leftHand': 'x-2-x-1-4-x', 'rightHand': 'x-P-x-I-M-x'} },
			'Bb7(#11)': { '1': {'positions': 'x-1-x-1-4-x', 'leftHand': 'x-1-x-1-4-x', 'rightHand': 'x-P-x-I-M-x'} },
			'A7M': { '1': {'positions': 'x-0-x-1-2-x', 'leftHand': 'x-0-x-1-2-x', 'rightHand': 'x-P-x-I-M-x'} },
			'B7(b9)': { '1': {'positions': 'x-2-x-2-1-x', 'leftHand': 'x-2-x-3-1-x', 'rightHand': 'x-P-x-I-M-x'} },

			'Am6': { '1': {'positions': 'x-0-x-5-5-x', 'leftHand': 'x-0-x-3-4-x', 'rightHand': 'x-P-x-I-M-x'} },
			'F#/A#': { '1': {'positions': '6-x-x-6-7-x', 'leftHand': '2-x-x-3-4-x', 'rightHand': 'P-x-x-I-M-x'} },
			'F#m/A': { '1': {'positions': '5-x-x-6-7-x', 'leftHand': '1-x-x-3-4-x', 'rightHand': 'P-x-x-I-M-x'} },
			'E/G#': { '1': {'positions': '0-x-x-4-5-x', 'leftHand': '0-x-x-2-3-x', 'rightHand': 'x-P-x-I-M-x'} },

			'C#/B': { '1': {'positions': 'x-2-x-1-2-x', 'leftHand': 'x-2-x-1-3-x', 'rightHand': 'x-P-x-I-M-x'} },
			'A#m7(b5)': { '1': {'positions': '6-x-x-6-5-x', 'leftHand': '2-x-x-3-1-x', 'rightHand': 'P-x-x-I-M-x'} }
		},

		'o-homem-do-mar': {
			'Em': { '1': {'positions': '0-2-2-0-0-x', 'leftHand': 'x-2-3-x-x-x', 'rightHand': 'P-x-I-M-A-x'} },
			'Em7+/Eb': { '1': {'positions': 'x-x-1-0-0-0', 'leftHand': 'x-x-3-x-x-x', 'rightHand': 'x-x-P-I-M-A'} },
			'F#': { '1': {'positions': '2-4-4-3-2-2', 'leftHand': '1-3-4-2-1-1', 'rightHand': 'P-x-I-M-A-x'} },
			'F#m': { '1': {'positions': '2-4-4-2-2-2', 'leftHand': '1-3-4-1-1-1', 'rightHand': 'P-x-I-M-A-x'} },
			'C#m': { '1': {'positions': '4-4-6-6-5-4', 'leftHand': '1-1-3-4-2-1', 'rightHand': 'x-P-I-M-A-x'} },
			'A': { '1': {'positions': 'x-0-2-2-2-x', 'leftHand': 'x-x-2-3-4-x', 'rightHand': 'x-P-I-M-A-x'} },
		}
	};

	let ROMANS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

	let WIDTH = 155;
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
		let x = 2 + PADDING + (WIDTH - (STRINGS - 1)*STRINGS_DISTANCE)/2;
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
			let higherPosition = getHigherPosition(positions);
			let delta = higherPosition >= FRETS ? higherPosition - FRETS + 1 : 0;
			if (delta > 0) {
				firstLine.remove();
			}
			let leftHand = dataLeftHand ? dataLeftHand.split('-') : null;
			let rightHand = dataRightHand ? dataRightHand.split('-') : null;
			let firstPositionIndex = -1;
			let firstPosition = -1;
			for (let i = 0 ; i < positions.length ; i++) {
				let position = positions[i];
				let positionsMultiString = position.split('');
				for (let j = 0 ; j < positionsMultiString.length ; j++) {
					position = positionsMultiString[j];
					let positionIndex = (position == 'x' ? -1 : position - 1 - delta);
					if (firstPositionIndex == -1 && position != 'x') {
						firstPositionIndex = positionIndex;
						firstPosition = position - 1;
					}
					if (position >= 0) {
						if (position == 0) {
							positionIndex = -1;
							ElementsCreator.create.svg('circle', {cx: x + STRINGS_DISTANCE*i, cy: y1 + positionIndex*FRETS_DISTANCE + FRETS_DISTANCE/2 + 2, r: STRINGS_DISTANCE/3, fill: '#EEE', stroke: 'black', 'stroke-width': 1}, svg)
						} else if (positionIndex >= 0) {
							let leftFinger = leftHand ? leftHand[i] : null;
							ElementsCreator.create.svg('circle', {cx: x + STRINGS_DISTANCE*i, cy: y1 + positionIndex*FRETS_DISTANCE + FRETS_DISTANCE/2 + 2, r: STRINGS_DISTANCE/2.5, fill: '#EEE', stroke: 'black', 'stroke-width': 1}, svg)
							ElementsCreator.create.svg('text', {'text-anchor': 'middle', 'dominant-baseline': 'middle', x: x + STRINGS_DISTANCE*i, y: y1 + positionIndex*FRETS_DISTANCE + FRETS_DISTANCE/2 + 2 + 2, 'font-size': '11pt'}, svg, leftFinger);
						}
					} else if (position == 'x') {
						ElementsCreator.create.svg('text', {'text-anchor': 'middle', 'dominant-baseline': 'middle', x: x + STRINGS_DISTANCE*i, y: y1 + positionIndex*FRETS_DISTANCE/2 + 2 + 2, 'font-size': '11pt'}, svg, 'X');
					}
				}
				let rightFinger = rightHand ? rightHand[i] : null;
				if (rightFinger != 'x') {
					ElementsCreator.create.svg('text', {'text-anchor': 'middle', 'dominant-baseline': 'hanging', x: x + STRINGS_DISTANCE*i, y: y1 + (FRETS - 1)*FRETS_DISTANCE + 2 + FRETS_DISTANCE/4, 'font-size': '10pt', fill: '#555'}, svg, rightFinger);
				}
			}
			ElementsCreator.create.svg('text', {'text-anchor': 'middle', 'dominant-baseline': 'middle', x: x - STRINGS_DISTANCE - 2, y: y1 + firstPositionIndex*FRETS_DISTANCE + FRETS_DISTANCE/2 + 2 + 1, 'font-size': '11pt'}, svg, ROMANS[firstPosition]);
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

	function getHigherPosition(positions) {
		let allPositions = [];
		for (let i = 0 ; i < positions.length ; i++) {
			let position = positions[i];
			let positionsMultiString = position.split('');
			allPositions.push(...positionsMultiString);
		}
		return allPositions.reduce(function(a, b) { return Math.max(a == 'x' ? 0 : a, b == 'x' ? 0 : b); });
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
