// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', function() {
	mobileMenu.classList.toggle('active');
	navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
	link.addEventListener('click', () => {
		mobileMenu.classList.remove('active');
		navMenu.classList.remove('active');
	});
});

// Smooth scrolling para los enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	});
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
	const navbar = document.querySelector('.navbar');
	if (window.scrollY > 50) {
		navbar.style.background = 'rgba(28, 61, 110, 0.98)';
	} else {
		navbar.style.background = 'rgba(28, 61, 110, 0.95)';
	}
});

// Active navigation highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
	let current = '';
	sections.forEach(section => {
		const sectionTop = section.offsetTop - 100;
		const sectionHeight = section.offsetHeight;
		if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
			current = section.getAttribute('id');
		}
	});

	navLinks.forEach(link => {
		link.classList.remove('active');
		if (link.getAttribute('href') === `#${current}`) {
			link.classList.add('active');
		}
	});
});

// Animación de entrada para las secciones
const observerOptions = {
	threshold: 0.15,
	rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
			// Para las tarjetas de cursos y testimonios
			if (entry.target.classList.contains('course-card') || entry.target.classList.contains('testimonial')) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		}
	});
}, observerOptions);

// Observar todas las secciones con fade-in-up
document.querySelectorAll('.fade-in-up').forEach(section => {
	observer.observe(section);
});

// Aplicar animación a las tarjetas de cursos y testimonios con delay escalonado
document.querySelectorAll('.course-card, .testimonial').forEach((card, index) => {
	card.style.opacity = '0';
	card.style.transform = 'translateY(30px)';
	card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
	observer.observe(card);
});

// Animación de aparición del logo en el header
window.addEventListener('load', () => {
	document.querySelector('.logo').style.animation = 'logoScale 1s ease-out 0.3s both';
});