$(document).ready(function(){
	
	$('.slider-for').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  arrows: false,
	  fade: true,
	  asNavFor: '.slider-nav',
	  responsive: [
	    {
	      breakpoint: 1024,
	      settings: {
	        slidesToShow: 3,
	        slidesToScroll: 3,
	      }
	    },
	    {
	      breakpoint: 600,
	      settings: {
	        slidesToShow: 2,
	        slidesToScroll: 2
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	      	dots: false,
	        slidesToShow: 1,
	        slidesToScroll: 1
	      }
	    }
	  ]
	});

	$('.slider-nav').slick({
	  slidesToShow: 3,
	  slidesToScroll: 1,
	  asNavFor: '.slider',
	  dots: true,
	  centerMode: true,
	  focusOnSelect: true
	  //  responsive: [
	  //   // {
	  //   //   breakpoint: 1024,
	  //   //   settings: {
	  //   //     slidesToShow: 3,
	  //   //     slidesToScroll: 3,
	  //   //   }
	  //   // },
	  //   {
	  //     breakpoint: 600,
	  //     settings: {
	  //       slidesToShow: 2,
	  //       slidesToScroll: 2
	  //     }
	  //   },
	  //   {
	  //     breakpoint: 480,
	  //     settings: {
	  //     	dots: true,
	  //       slidesToShow: 0,
	  //       slidesToScroll: 0
	  //     }
	  //   }
	  // ]
	});

});
