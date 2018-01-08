	$(document).ready(function() {

		//Objeto del Banner
		var banner = {
			padre: $('#banner'),
			numeroSlides: $('#banner').children('.slide').length,
			posicion: 1
		};

		//bjeto del Slider de Info
		var info = {
			padre: $('#info'),
			numeroSlides: $('#info').children('.slide').length,
			posicion: 1
		}	

		// Establecemos que el primer slide de Banner aparecera desplazado
		banner.padre.children('.slide').first().css({
			'left': 0
		});

		// Establecemos que el primer slide de Info aparecera desplazado
		info.padre.children('.slide').first().css({
			'left': 0
		});

		// Funcion para calcular el alto que tendran los contenedores padre de Banner
		var altoBanner = function(){
			var alto = banner.padre.children('.slide').outerHeight();

			banner.padre.css({
				'height': alto +'px'
			});

		}

		// Funcion para calcular el alto que tendran los contenedores padre de info
		var altoInfo = function(){
			var alto = info.padre.children('.active').outerHeight();

			info.padre.animate({
				'height': alto +'px'
			});

		}

		// Establecemos que el #contenedor tenga el 100% del alto de la pagina. 
		// Para despues centrarlo verticalente con flexbox.
		var altoContenedor = function(){
			var altoVentana = $(window).height();
			if (altoVentana <= $('#contenedor').outerHeight() + 200){
				$('#contenedor').css({
					'height': ''
				});
			}else{
				$('#contenedor').css({
					'height': altoVentana + 'px'

				});
			}
		}

		// Ejecutamos las funciones para calcular los altos.
		altoBanner();
		altoInfo();
		altoContenedor();

		// Si cambiamos el tamaño de la pantalla se
		// ejecuta esta funcion para saber el nuevo
		// tamaño del elemento padre
		$(window).resize(function(){
			altoBanner();
			altoInfo();
			altoContenedor();
		});

		// Agregamos un puntito por cada slide que tengamos
		$('#info').children('.slide').each(function(){
			$('#botones').append('<span>');
		});

		// Declaramos que el primer elemento inicie con su clase active
		$('#botones').children('span').first().addClass('active');

	//----------------------
	//-----Banner-----------
	//----------------------

		//Botón siguiente
		$('#banner_next').on('click', function(e){
			e.preventDefault();

			if(banner.posicion < banner.numeroSlides){
				//NOs aseguramos de que las demas slides empiecen desde la derecha.
				banner.padre.children().not('.active').css({
					'left': '100%'
				});

				//Quitamos la clase active y se la ponemos al siguiente elemento, y lo animamos.
				$('#banner .active').removeClass('active').next().addClass('active').animate({
				'left': '0'
				});

				//Animamos el slide anterior para que se deslice hacia la izquierda.
				$('#banner .active').prev().animate({
					'left':'-100%'
				});

				banner.posicion = banner.posicion + 1;
			}else{
				//Hacemos que el slide activo(es decir, el último) se anime hacia la derecha
				$('#banner .active').animate({
					'left': '-100%'
				});

				//Seleccionamos todos los slides que no tengan la clase .active
				// y los posicionamos a la derecha
				banner.padre.children().not('.active').css({
					'left': '100%'
				});

				//Eliminamos la clase active y se la ponemos al primer elemento.
				// Después lo animamos.
				$('#banner .active').removeClass('active');
				banner.padre.children('.slide').first().addClass('active').animate({
					'left': '0'
				});

				//Reseteamos la posición a 1.
				banner.posicion = 1;
			}

			
		});

		//Botón Anterior

		$('#banner_prev').on('click', function(e){
			e.preventDefault();

			if (banner.posicion > 1) {

			banner.padre.children().not('.active').css({
				'left': '-100%'
			});

			$('#banner .active').animate({
				'left': '100%'
			});

			$('#banner .active').removeClass('active').prev().addClass('active').animate({
				'left': 0
			});

			banner.posicion = banner.posicion -1;
		}else{
			banner.padre.children().not('.active').css({
				'left': '-100%'
			});

			$('#banner .active').animate({
				'left': '100%'
			});

			$('#banner .active').removeClass('active');
			banner.padre.children().last().addClass('active').animate({
				'left': 0
			});

			//Reiniciamos la posición a la última slide, teniendo en cuenta
			// el númoero de slides que tenemos
			banner.posicion = banner.numeroSlides;
		}

		});


	//----------------------
	//-------Info-----------
	//----------------------

		//Botón siguiente
		$('#info-next').on('click', function(e){
			e.preventDefault();

			if(info.posicion < info.numeroSlides){
				//NOs aseguramos de que las demas slides empiecen desde la derecha.
				info.padre.children().not('.active').css({
					'left': '100%'
				});

				//Quitamos la calse active y se la ponemos al siguiente elemento, y lo animamos.
				$('#info .active').removeClass('active').next().addClass('active').animate({
				'left': '0'
				});

				//Animamos el slide anterior para que se deslice hacia la izquierda.
				$('#info .active').prev().animate({
					'left':'-100%'
				});

				// Eliminamos la clase active y se la ponemos al siguiente elemento
				$('#botones').children('.active').removeClass('active').next().addClass('active');

				//Incrementamos la posici`´on en 1
				info.posicion = info.posicion + 1;
			}else{
				//Hacemos que el slide activo(es decir, el último) se anime hacia la derecha
				$('#info .active').animate({
					'left': '-100%'
				});

				//Seleccionamos todos los slides que no tengan la clase .active
				// y los posicionamos a la derecha
				info.padre.children().not('.active').css({
					'left': '100%'
				});

				//Eliminamos la clase active y se la ponemos al primer elemento.
				// Después lo animamos.
				$('#info .active').removeClass('active');
				info.padre.children('.slide').first().addClass('active').animate({
					'left': '0'
				});

				// Eliminamos la clase active y se la ponemos al primer elemento
				$('#botones').children('.active').removeClass('active');
				$('#botones').children('span').first().addClass('active');

				//Reseteamos la posición a 1.
				info.posicion = 1;
			}

			altoInfo();

			
		});

		//Botón Anterior

		$('#info-prev').on('click', function(e){
			e.preventDefault();

			if (info.posicion > 1) {

			// Nos asegramos de todos los elementos hijos (que no sean) .active
			// se posicionen a la izquierda
			info.padre.children().not('.active').css({
				'left': '-100%'
			});

			// Deslpazamos el slide activo de izquierda a derecha
			$('#info .active').animate({
				'left': '100%'
			});

			// Eliminamos la clase active y se la ponemos al slide anterior.
			// Y lo animamos
			$('#info .active').removeClass('active').prev().addClass('active').animate({
				'left': 0
			});

			$('#botones').children('.active').removeClass('active').prev().addClass('active');

			//Reiniciamos la posiciòn a 1
			info.posicion = info.posicion -1;
		}else{

			// Nos aseguramos de que los slides empiecen a la izquierda
			info.padre.children().not('.active').css({
				'left': '-100%'
			});

			// Animamos el slide activo hacia la derecha
			$('#info .active').animate({
				'left': '100%'
			});

			// Eliminamos la clase active y se la ponemos al primer elemento.
			// Despues lo animamos.
			$('#info .active').removeClass('active');
			info.padre.children().last().addClass('active').animate({
				'left': 0
			});

			//Le quitamos la clase active al nuestra primera slide del boton prev y 
			//le entregamos el active a la primera slide (boton) desde la derecha.
			$('#botones').children('.active').removeClass('active');
			$('#botones').children('span').last().addClass('active');

			//Reiniciamos la posición a la última slide, teniendo en cuenta
			// el númoero de slides que tenemos
			info.posicion = info.numeroSlides;
		}

		altoInfo();

		});		

	});