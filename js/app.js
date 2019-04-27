// ? jQuery selections--------
const loadingScrn = $('.loading-SECTION').get(0);

// ? JS DOM "VARIABLES AND ARRAY's" definitions--------
let selections = [];


// ! Functions declarations ( "LOGO" )------
const endLoad = () => {
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
						<img src="SVG/bx-check.svg" class='bx bx-check' alt='selected' ></img>
						<img src="SVG/bx-check-circle.svg" class='bx bx-check-circle' alt='selected' ></img>
					</span>
					<span class="lang-type" id="pun-lang" title="punjabi">
						<p class="type-text">Punjabi</p>
						<img src="SVG/bx-check.svg" class='bx bx-check' alt='selected' ></img>
						<img src="SVG/bx-check-circle.svg" class='bx bx-check-circle' alt='selected' ></img>
					</span>
					<span class="lang-type" id="hin-lang" title="hindi">
						<p class="type-text">Hindi</p>
						<img src="SVG/bx-check.svg" class='bx bx-check' alt='selected' ></img>
						<img src="SVG/bx-check-circle.svg" class='bx bx-check-circle' alt='selected' ></img>
					</span>
				</div>
			</div>
		</section>
	`);
	$('.footer-hidden').removeClass('footer-hidden');



	// ? JS DOM "ELEMENTS" selections----------------------------
	let langType = document.querySelectorAll('.lang-type');
	let nextBtn = document.getElementById('next');
	let finishBtn = document.getElementById('finish');

	// ? ---------------------------------------------------------



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
						let r = selections.indexOf( langType[i].title );
						if ( r !== -1 ) {
							selections.splice(r , 1);
						}
						else {}
					}
				}

				// ? 'next' "BUTTON" Disabled/Enabled decider-----------

				if ( selections.length !== 0 ) {
					$('footer span').removeClass('disabled');
					$('footer span').addClass('next');
				}
				else {
					$('footer span').removeClass('next');
					$('footer span').addClass('disabled');
				}

		} );

		// ? Ripple Effects----------

		const ripple = ( evt, type ) => {
			let d = '';
			let rect = '';

			let circle = document.createElement('span');
			evt.target.appendChild(circle);
			circle.classList.add('circle');
			if ( type == "next" ) {
				d = Math.max(nextBtn.clientWidth, nextBtn.clientHeight);
				rect = nextBtn.getBoundingClientRect();
			}
			else if ( type == "finish" ) {
				d = Math.max(finishBtn.clientWidth, finishBtn.clientHeight);
				rect = finishBtn.getBoundingClientRect();
			}
			circle.style.width = circle.style.height = d + 'px';
			let r = evt.clientX - rect.left - d/2;
			let t = evt.clientY - rect.top - d/2;
			circle.style.left = r + 'px';
			circle.style.top = t + 'px';
		};

		$('#next').on( "mousedown", (evt) => { ripple(evt, "next"); } );
		$('#finish').on( "mousedown", (evt) => { ripple(evt, "finish"); } );


		$('#next').on( "click", () => {  } );

};




$(window).on( 'load', () => {

	$('g').children().css({
		animation : "path 2s cubic-bezier(0.37, 0.17, 0.65, 1.3) forwards, loading 0.75s cubic-bezier(0.37, 0.17, 0.65, 1.3) infinite 2.1s"
	});
	$('#logo').css({ animation: "blow 0.5s cubic-bezier(.37,-0.01,.21,1.26) forwards 2.5s" });

	setTimeout( endLoad, 3000 );

} );
