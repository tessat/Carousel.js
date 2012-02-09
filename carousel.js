(function($) {

	var Carousel = function(element, options) {

		// **************
		// Private vars
		// **************
		var c_elem;
		var c_elem_c;
		var c_count;

		// **************
		// Private functions
		// **************
		
		// Layout functions
		
		var setup_elem = function(options) {
			// Set up the class
			$(c_elem).addClass('carousel');
			// Add the content DOM object
			$(c_elem).prepend('<div class="c-content"></div>');
			c_elem_c = $(c_elem).children('.c-content');
			// Set up css
			$(c_elem).width(options.width);
			$(c_elem).height(options.height);
			
			// Add arrows
			add_arrows();
			// Add bottom nav
			add_bottom_nav();
			
			// Add images
			add_images(options);
			
			// Initialize first element as selected
			$(c_elem_c).find('.nav ul li:first').addClass('selected');
		};
		
		var add_arrows = function() {
			// Add the container
			$(c_elem_c).prepend('<div class="arrows"></div>');
			// Add the arrows
			$(c_elem_c).children('.arrows').append('<a href="#" class="left"><img src="images/carousel-left-arrow.png"><img src="images/carousel-left-arrow-hover.png" class="hover"></a>');
			$(c_elem_c).children('.arrows').append('<a href="#" class="right"><img src="images/carousel-right-arrow.png"><img src="images/carousel-right-arrow-hover.png" class="hover"></a>');
		};

		var add_bottom_nav = function() {
			// Add the container
			$(c_elem_c).append('<div class="nav"><ul></ul></div>');
			
			// Setup css
			var width = 18*c_count;
			$(c_elem_c).children('.nav').children('ul').width(width);

			// Add the nav items
			var i = 1;
			for (i=1; i<=c_count; i++) {
				var class_name = "section-"+i;
				$(c_elem_c).children('.nav').children('ul').append('<li class="'+class_name+'"></li>');
				$(c_elem_c).children('.nav').children('ul').children('.'+class_name).prepend('<a href="#"><img src="images/carousel-nav.png"><img src="images/carousel-nav-hover.png" class="hover"></a>');
			}		
		};
		
		var add_images = function(options) {
			// Add the container
			$(c_elem_c).prepend('<div class="sliding-content"><ul></ul></div>');
			
			// Setup css
			var width = options.width*c_count;
			$(c_elem_c).children('.sliding-content').width(width);
			
			// Add the nav items
			var i = 1;
			for (i=1; i<=c_count; i++) {
				var class_name 	= "section-"+i;
				var img_name		= "0"+i;
				$(c_elem_c).children('.sliding-content').children('ul').append('<li class="'+class_name+'"></li>');
				$(c_elem_c).children('.sliding-content').children('ul').children('.'+class_name).prepend('<img src="content_images/'+img_name+'.jpg" />');
			}
		}
		
		// Navigation Functions
		
		var goto_previous_section = function() {
			if ($('.carousel .nav li.selected').prev('li').length > 0) {
				goto_section($('.carousel .nav li.selected').prev('li'));
			} else {
				goto_section($('.carousel .nav li:last'));
			}
		}

		var goto_next_section = function() {
			if ($('.carousel .nav li.selected').next('li').length > 0) {
				goto_section($('.carousel .nav li.selected').next('li'));
			} else {
				goto_section($('.carousel .nav li:first'));
			}
		}

		var goto_section = function(nav_elem) {

			// Slide the content
			var new_section_num = parseInt($(nav_elem).attr('class').replace(/[^0-9]*/, ''));
			var new_left = -$('.sliding-content ul li').width()*(new_section_num-1);
			$('.carousel .sliding-content').animate({
				left: new_left+'px'
			});

			// Change the nav
			$('.carousel .nav li').removeClass('selected');
			$(nav_elem).addClass('selected');

		}
		
		// **************
		// Setup
		// **************
		
		// Initialize vars
		c_elem = $(element);
		c_count = options.c_count;
		
		// Setup element
		setup_elem(options);
		
		
		// **************
		// Events
		// **************

		// Arrows clicked
		$('.carousel .arrows a').live('click', function() {
			if ($(this).hasClass('left')) {
				goto_previous_section();
			} else {
				goto_next_section();
			}
			return false;
		});

		// Bottom Nav clicked
		$('.carousel .nav a').live('click', function() {
			var nav_elem = $(this).parent('li');
			goto_section(nav_elem);
			return false;
		});

		// Keyboard arrows pressed
		$(document).keypress(function(e) {
			// left arrow key pressed
			if (e.keyCode == 37) {
				goto_previous_section();
			// right arrow key pressed
			} else if (e.keyCode == 39) {
				goto_next_section();
			}
		});
		
	};
	
	// **************
	// Constructor
	// **************
	$.fn.carousel = function(options) {
    
		return this.each(function(key, value){
			var element = $(this);
			// Return early if this element already has a plugin instance
			if (element.data('caro')) return element.data('caro');
			// Pass options to plugin constructor
			var caro = new Carousel(this, options);
			// Store plugin object in this element's data
			element.data('caro', caro);
		});

	};
	

})(jQuery);

