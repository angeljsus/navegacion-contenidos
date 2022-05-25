# Navegación entre contenidos
### Descripción
Ejemplo de página, para que la navegación identifique en que elementos de contenido se encuentra para que sean marcados.

### Elementos de contenido y navegación
Se cargan elementos de la barra de navegación con sus identificadores, la clase `element` permitirá acceder a cada sección existente dentro de la página.

#### Ejemplo
```html
<!-- NAV -->
<div class="container-nav">
	<div class="item-nav" id="navpage1">
		<div>Tema 1</div>
	</div>
	<div class="item-nav" id="navpage2">
		<div>Tema 2</div>
	</div>
	<div class="item-nav" id="navpage3">
		<div>Tema 3</div>
	</div>
</div>
<!-- END NAV -->
<!-- CONTENT -->
<div class="container-content">
	<div class="content-elements" id="scrollContainer">
	    <!-- SECTION -->
	    <div class="element" id="page1">lorem...</div>
	    <!-- SECTION -->
	    <!-- SECTION -->
	    <div class="element" id="page2">lorem...</div>
	    <!-- SECTION -->
	    <!-- SECTION -->
	    <div class="element" id="page3">lorem...</div>
	    <!-- SECTION -->
	</div>
</div>
<!-- CONTENT -->
```
Existe una propiedad CSS que especificará el comportamiento del desplazamiento entre las secciones, esto servirá para recorrer las secciones desde la barra de navegación, detecte el avance del contenido y aplique estilos al elemento seleccionado, `scroll-behavior:smooth;`

```css
.main-container .container-content .content-elements {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -o-box-lines: multiple;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  scroll-behavior: smooth;
}
```

#### Comportamiento
Para ir directamente hacia un contenido se envía por parámetro en la función `referencia(id)` el nombre del identificador del elemento html que contendrá la información de la sección.
###### Ejemplo:
#
```javascript
navpage1.addEventListener('click', function(){
	referencia('page1')
});
```
##### Detectando posicionamiento
Por medio del evento `scroll` del contenedor se lee la cantidad de contenido recorrido por el usuario y permite añadir los esitlos para que sea marcada la navegación, este evento es habilitado ejecutando la siguiente función:
* `detectarScroll(style, limiteRecorrido)`
    * style: cadena de estilo que contendra el elemento de navegación de la posición en que se encuentra.
    * limiteRecorrido: valor numerico de la cantidad que se espera recorrer como límite para marcar el contenido siguiente del 1 al 100.
###### Ejemplo:
Cada sección tendrá estilos de border de 2px de color rojo y cada sección puede ser navegada hasta el 80% de contenido, para marcar el siguiente contenido, las demás no tendrán bordes.
```javascript
let stylSelected = 'color:red; border: 2px solid;';
let stylNoSelect = 'border: none;';
detectarScroll(stylSelected, stylNoSelect, 80)
```

