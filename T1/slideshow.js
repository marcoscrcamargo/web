var slides, dots, curSlide;

// Inicializando.
curSlide = 0;
slides = document.getElementsByClassName("mySlides");
dots = document.getElementsByClassName("dot");

// Mostrando o primeiro slide.
showSlide()

// Slide anterior.
function prevSlide() {
	unshowSlide()
	curSlide = (curSlide + 2) % 3
	showSlide()
}

// Slide seguinte.
function nextSlide() {
	unshowSlide()
	curSlide = (curSlide + 1) % 3
	showSlide()
}

// Seta o slide para o slide x.
function setSlide(x){
	unshowSlide()
	curSlide = x
	showSlide()
}

// Desativa o slide atual.
function unshowSlide() {
	slides[curSlide].style.display = "none";
	dots[curSlide].className = dots[curSlide].className.replace(" active", "");
}

// Ativa o slide atual.
function showSlide() {
	slides[curSlide].style.display = "block"; 
	dots[curSlide].className += " active";
}