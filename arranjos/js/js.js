"use strict";

(function() {

	let GuitarDiagramsGenerator = io.github.crisstanza.GuitarDiagramsGenerator;

	function init(event) {
		document.body.setAttribute('data-arrangement', document.location.href.replace(/.*\/arranjos\/(.*)\/(index\.html)?/, '$1'));
		GuitarDiagramsGenerator.reinit();
	}

	window.addEventListener('load', init);

})();
