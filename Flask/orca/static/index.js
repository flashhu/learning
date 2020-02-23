'use strict';

const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = true;
const intervalTime = 5000;
let slideInterval;

const nextSlide = () => {
	//get current class
	const current = document.querySelector('.current');
	//remove current class
	current.classList.remove('current');
	//check for next slide
	if(current.nextElementSibling) {
		//Add current to next sibling
		current.nextElementSibling.classList.add('current');
	} else {
		//add current to start
		slides[0].classList.add('current');
	}
	setTimeout(() => current.classList.remove('current'));
};

const prevSlide = () => {
	//get current class
	const current = document.querySelector('.current');
	//remove current class
	current.classList.remove('current');
	//check for next slide
	if(current.previousElementSibling) {
		//Add current to next sibling
		current.previousElementSibling.classList.add('current');
	} else {
		//add current to last
		slides[slides.length - 1].classList.add('current');
	}
	setTimeout(() => current.classList.remove('current'));
};

//button events
next.addEventListener('click', e => {
  nextSlide();
  if(auto) {
  	clearInterval(slideInterval);
	slideInterval = setInterval(nextSlide, intervalTime);
  }
});

prev.addEventListener('click', e => {
  prevSlide();
  if(auto) {
  	clearInterval(slideInterval);
  	slideInterval = setInterval(nextSlide, intervalTime);
  }
});

//auto slide
if(auto) {
	slideInterval = setInterval(nextSlide, intervalTime);
}



//menu
$(document).ready(function(){
	$('#search').click(function(){
	 	$('.menu-item').addClass('hide-item')
 		$('.search-form').addClass('active')
 		$('.close').addClass('active')
 		$('#search').hide()
	})
	$('.close').click(function(){
	 	$('.menu-item').removeClass('hide-item')
	 	$('.search-form').removeClass('active')
	 	$('.close').removeClass('active')
        $('#search').show()
	})
})

$(window).scroll(function(){
	var top = $(window).scrollTop();
	if (top >=  200){
		$("nav").addClass('fixed')
		$(".logo").addClass('fixed')
		$(".menu ul li").addClass('fixed')
		$(".menu ul li a").addClass('fixed')
		$("#search i").addClass('fixed')
		$("#list i").addClass('fixed')
		$(".search-form").addClass('fixed')
		$(".close").addClass('fixed')
	} else {
		$('nav').removeClass('fixed')
		$('.logo').removeClass('fixed')
		$(".menu ul li").removeClass('fixed')
		$(".menu ul li a").removeClass('fixed')
		$("#search i").removeClass('fixed')
		$("#list i").removeClass('fixed')
		$(".search-form").removeClass('fixed')
		$(".close").removeClass('fixed')
	}
})