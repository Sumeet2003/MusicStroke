// ? jQuery selections--------
 var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
  function doCORSRequest(options, printResult) {
    var x = new XMLHttpRequest();
    x.open(options.method, cors_api_url + options.url);
    x.onload = x.onerror = function() {
      printResult(
        options.method + ' ' + options.url + '\n' +
        x.status + ' ' + x.statusText + '\n\n' +
        (x.responseText || '')
      );
    };
    if (/^POST/i.test(options.method)) {
      x.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }
    x.send(options.data);
  }


const loadingScrn = $('.loading-SECTION').get(0);
var limit = 15000

const renderAPI = `https://water-service-uadr.onrender.com/update_water_usage?apikey=fdeaf3ac-4685-4797-9577-480d130d1020&new_usage=1900`;

doCORSRequest({
        method: 'GET',
        url: renderAPI,
        data: ''
      }, function printResult(result) {
        console.log(result);
      });
// ? JS DOM "ELEMENTS" selections----------------------------
let nextBtn = document.getElementById('next');
let finishBtn = document.getElementById('finish');
let aImg = document.getElementsByClassName('a-img');

// ? JS DOM "VARIABLES AND ARRAY's" definitions--------
let selections = [];
let artistSelected = [];

if ( window.innerWidth < 1000 ) {
	var child = $("footer").children();
	$("footer").children().css({"cursor": "unset"});
}

// ! Functions declarations ( "LOGO" )------
function endLoad() {
	$('.loading-SECTION').remove();
	$('body').css({ "background-color" : "#1e1e1e", "overflow" : "auto" });
	$('main').html(`
			<section class="language-SECTION">
			<div class="container">
				<div class="text-wrapper">
					<p class="dad-text">Language Selection</p>
					<p class="son-text">Please select the language(s) of music you listen to -</p>
				</div>
				<div class="lang-select">
					<span class="lang-type" id="eng-lang" title="english">
						<p class="type-text" >English</p>
						<img src="SVG/bx-check-circle.svg" class='bx bx-check-circle' alt='selected' ></img>
					</span>
					<span class="lang-type" id="pun-lang" title="punjabi">
						<p class="type-text">Punjabi</p>
						<img src="SVG/bx-check-circle.svg" class='bx bx-check-circle' alt='selected' ></img>
					</span>
					<span class="lang-type" id="hin-lang" title="hindi">
						<p class="type-text">Hindi</p>
						<img src="SVG/bx-check-circle.svg" class='bx bx-check-circle' alt='selected' ></img>
					</span>
				</div>
			</div>
		</section>
	`);
	$('.footer-hidden').removeClass('footer-hidden');


  // ? ---------------------------------------------------------

  // ? JS DOM "ELEMENTS" selections----------------------------
	let langType = document.querySelectorAll('.lang-type');


	// ! Functions declaration ( "LANGUAGE-SELECTION" )-----------

		// ? language-type options click actions-----------------

		$('.lang-select').on( "click", ( evt ) => {
			// ? language-type on select interface UI----------

			if ( evt.target.tagName == "P" || evt.target.tagName == "I" ) {
				let parent = evt.target.parentNode;
				parent.classList.toggle("lang-type-clicked");
			}
			else if ( evt.target.tagName == "SPAN" ) {
				evt.target.classList.toggle("lang-type-clicked");
			}

			// ? language-type on click - adding in array----------

			for ( let i = 0; i < langType.length; i++ ) {

				if ( langType[i].className == "lang-type lang-type-clicked" ) {
					if ( selections.indexOf(langType[i].title) === -1 ) {
						selections = [...selections, langType[i].title];
					}
					else {}
				}
				else {
					let langTitle = selections.indexOf( langType[i].title );
						if ( langTitle !== -1 ) {
						selections.splice(langTitle , 1);
					}
					else {}
				}
			}

				// ? 'next' "BUTTON" Disabled/Enabled decider-----------

				if ( selections.length !== 0 ) {
					$('.next-btn').removeClass('disabled');
					$('.next-btn').addClass('next');
				}
				else {
					$('.next-btn').removeClass('next');
					$('.next-btn').addClass('disabled');
				}

		} );

}

// ? Ripple Effects----------

function ripple( evt ) {
	let d = '';
	let rect = '';

	let tar = evt.target;

	let circle = document.createElement('span');
	evt.target.appendChild(circle);
	circle.classList.add('circle');

		d = Math.max(tar.clientWidth, tar.clientHeight);
		rect = tar.getBoundingClientRect();

	circle.style.width = circle.style.height = d + 'px';
	let r = evt.clientX - rect.left - d/2;
	let t = evt.clientY - rect.top - d/2;
	circle.style.left = r + 'px';
	circle.style.top = t + 'px';
};

$('.ripple').on( "mousedown", ripple );


$('.next-btn').on( "click", function() {

	finishBtn.className = "ripple cancel-btn";
	finishBtn.textContent = "CANCEL";
	nextBtn.className = "disabled ripple finished-btn";
	nextBtn.textContent = "FINISHED";

	$('.language-SECTION').remove();

	$('main').delay(5000).html(`
		<section class="artist-SECTION">
		<aside class="container2">
			<span class="text-wrapper2">
				<h1>Pick some artists you like</h1>
				<p>Your experience will improve the more you listen</p>
			</span>
			<aside class="artist-display">
				<div class='a-img' style='display: none;'></div>
			</aside>
		</aside>
		</section>
	`);

	loadArtists();

 } );


// ? ARTIST-Selection related functions------------

const buildArtists = ( name ) => {
	let url;
	let width = $('.a-img').width();

	if ( width > 150 ) {
		url = `"HOLLYWOOD ARTISTS/${name}.jpg"`;
	}
	else if ( width >= 130 ) {
		url = `"HOLLYWOOD ARTISTS/medium/${name}.jpg"`;
	}
	else {
		url = `"HOLLYWOOD ARTISTS/small/${name}.jpg"`;
	}

	return `<div class='artist'>
	<div class='a-img' style='background-image: url(${url});' data-text='${name}'>
	<span class="check">
	<svg viewBox="0 0 36 36">
		<g fill="#ffffff">
		<path d="M13.5 24.26L7.24 18l-2.12 2.12 8.38 8.38 18-18-2.12-2.12z"></path>
		</g>
	</svg>
	</span>
	</div>
	<p>${name}</p>
	</div>`;
};



window.onload = function() {

	$('g').children().css({
		animation : "path 2s cubic-bezier(0.37, 0.17, 0.65, 1.3) forwards, loading 0.75s cubic-bezier(0.37, 0.17, 0.65, 1.3) infinite 2.1s"
	});
	$('#logo').css({ animation: "blow 0.5s cubic-bezier(.37,-0.01,.21,1.26) forwards 2.5s" });

	setTimeout( endLoad, 3000 );

};

// ! XHR JSON load--------------

function loadArtists() {
	let xhr = new XMLHttpRequest();

	xhr.open("GET", "assets/artist.json");
	xhr.send();

	xhr.onload = () => {
		console.log("%c FILE LOADED! 👌👌", "color: black; font-weight: bold; font-family: maven pro;");

		let data = JSON.parse(xhr.responseText);

		let s = parseInt(data.length/25);

		if ( s == 0 ) {
			for ( let i = r; i < data.length; i++ ) {
				r++;
				dom.push( buildArtists(data[i].name) );
			}
			$('.artist-display').append(dom.join(''));
		}
		else {

			setTimeout(function scroll() {

				let verticallyScrolled = $(window).scrollTop();
				let scrollableDistance = ( $( document ).height() - $( window ).height() ) - 500;
				let w = r + 25;
				dom = [];
				console.log("RUNNING", s, r, w);

				if ( s != 0 ) {

					if ( verticallyScrolled > scrollableDistance ) {
						console.log("%c RUNNING", "color: red;", s, r, w);
						for ( let i = r; i < w; i++ ) {
							r++;
							dom.push( buildArtists(data[i].name) );
						}
						$('.artist-display').append(dom.join(''));


						s--;
					}

					let time = setTimeout( arguments.callee, 300 );
				}
				else {
					console.log("%c RUNNING else", "color: green;", r, s, data.length);
					for ( let i = r; i < data.length; i++ ) {
						dom.push( buildArtists(data[i].name) );
					}
					$('.artist-display').append(dom.join(''));
				}


			}, 200);
		}

	};

	// ? adding artists to the dom process-------------------

	let artistDisplay = document.getElementsByClassName("artist-display");
	let r = 0;
	let dom = [];

	// ? -----------------------------------------

	$(".artist-display").on( "click", (evt) => {
		if ( evt.target.className == "artist" ) {
			let kiddo = evt.target.firstElementChild;

			let data = kiddo.getAttribute("data-text");

			if ( kiddo.className == "a-img" ) {
				artistSelected.push(data);
				console.log(artistSelected);
			}
			else if( kiddo.className == "a-img artist-selected" ) {
				let k = artistSelected.indexOf(`${data}`);
				artistSelected.splice( k, 1 );
				console.log(artistSelected);
			}

			// ? 'finished' "BUTTON" Disabled/Enabled decider-----------

			if ( artistSelected.length !== 0 ) {
				$('.finished-btn').removeClass('disabled');
				$('.finished-btn').addClass('finished');
			}
			else {
				$('.finished-btn').removeClass('finished');
				$('.finished-btn').addClass('disabled');
			}

			kiddo.classList.toggle("artist-selected");
		}
		else {}
	} );

}
// ! ---------------
