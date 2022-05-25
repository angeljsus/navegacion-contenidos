document.addEventListener('DOMContentLoaded', initialize);

function initialize(){
	// EVENTOS NAV
	const navpage1 = document.getElementById('navpage1');
	const navpage2 = document.getElementById('navpage2');
	const navpage3 = document.getElementById('navpage3');
	const navpage4 = document.getElementById('navpage4');
	const navpage5 = document.getElementById('navpage5');

	// EVENTOS CLICK
	navpage1.addEventListener('click', function(){
		referencia('page1')
	});
	navpage2.addEventListener('click', function(){
		referencia('page2')
	});
	navpage3.addEventListener('click', function(){
		referencia('page3')
	});
	navpage4.addEventListener('click', function(){
		referencia('page4')
	});
	navpage5.addEventListener('click', function(){
		referencia('page5')
	});

	let stylSelected = 'color:gray; border: 2px solid;';
	let stylNoSelect = 'border: none;';
	detectarScroll(stylSelected, stylNoSelect,80)
}


// enlazar a inicio del contenido de la sección
function referencia(idReferencia){
	const scroller = document.getElementById('scrollContainer');
	const element = document.getElementById(idReferencia);
	let offsetTop = 0;
	if (element) {
		offsetTop = element.offsetTop;
		scroller.scrollTo(0, offsetTop);
	} else {
		console.error('La sección %s a la que hace referencia no esta registrada en el html', idReferencia)
	}
	// desliza al inicio de la sección
}

// detectar la posicion del scroll
function detectarScroll(stylSelected, stylNoSelect, limitePermitido){
	const sections = document.getElementsByClassName('element');
	const scroller = document.getElementById('scrollContainer');
	let arrayId = [], posterior = true, sectionProps =0, heightRecorrida = 0;
	let elementoPosterior = 0, nuevo = 0, porcentaje = 0;
	for(let i = 0; i < sections.length; i++){
		// marcando el primer elemento
		if (i == 0) {
			document.getElementById('nav'+sections[i].id).style = stylSelected;
		}
		arrayId.push(sections[i].id)
	}
	let scrollAvance = 0;
	scroller.addEventListener('scroll', function(e){
		scrollAvance = e.srcElement.scrollHeight - e.srcElement.scrollTop - e.srcElement.clientHeight;
		arrayId.forEach(function(id, index){
			posterior = true;
			sectionProps = document.getElementById(id).getBoundingClientRect();
			sectionProps.id = id;
			// y recorrida
			heightRecorrida = sectionProps.y;
			if (Math.sign(sectionProps.y) == -1) {
				heightRecorrida = sectionProps.y*-1;
			}
			// obtener el porcentaje recorrido
			porcentaje = heightRecorrida*100 / sectionProps.height
			porcentaje = porcentaje.toFixed(2)
			// si el porcentaje revasa el 100% paso a otro elemento
			if (porcentaje > 100 || Math.sign(sectionProps.y) == 1) {
				// reiniciar
				porcentaje = 0;
			}
			nuevo = index+1;
			if (arrayId[nuevo]) {
				elementoPosterior = document.getElementById('nav'+arrayId[nuevo]); 
			} else {
				posterior = false;
			}

			// si el porcentaje es menor, marca el elemento actual
			if (posterior && porcentaje > 0 && porcentaje <= limitePermitido) {
				document.getElementById('nav'+id).style = stylSelected;
				elementoPosterior.style = stylNoSelect;
			}

			// si el porcentaje es mayor, es tiempo de marcar el elemento posterior
			if (posterior && porcentaje > limitePermitido) {
				elementoPosterior.style = stylSelected;
				document.getElementById('nav'+id).style = stylNoSelect;
			}
			// si ya no hay posterior es el último elemento
			if (!posterior && porcentaje > 0) {
				document.getElementById('nav'+id).style = stylSelected;
			}
		})
	});
}