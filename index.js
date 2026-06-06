// ============================================
// CAROUSEL/SLIDER FUNCTIONALITY
// ============================================

class Carousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentSlide = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startAutoPlay();
    }

    setupEventListeners() {
        // Arrow buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Pause autoplay on hover
        const hero = document.querySelector('.hero');
        hero.addEventListener('mouseenter', () => this.pauseAutoPlay());
        hero.addEventListener('mouseleave', () => this.startAutoPlay());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }

    goToSlide(index) {
        // Remove active class from all slides and indicators
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.indicators.forEach(indicator => indicator.classList.remove('active'));

        // Set new slide and indicator
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');

        // Reset autoplay
        this.pauseAutoPlay();
        this.startAutoPlay();
    }

    nextSlide() {
        this.goToSlide((this.currentSlide + 1) % this.slides.length);
    }

    prevSlide() {
        this.goToSlide((this.currentSlide - 1 + this.slides.length) % this.slides.length);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }

    pauseAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }
}

// Initialize carousel when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize carousel on pages that have carousel slides
    if (document.querySelectorAll('.carousel-slide').length > 0) {
        new Carousel();
    }
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Toggle hamburger menu
hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');

        // set active class on clicked nav link
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        // smooth-scroll to section (preserve anchor behavior)
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.replaceState(null, '', href);
            }
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 0) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 100%)';
    }
});

// ============================================
// TRENDING ROW CONTROLS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const row = document.getElementById('trendingRow');
    const prev = document.querySelector('.small-arrow.prev');
    const next = document.querySelector('.small-arrow.next');

    if (!row || !prev || !next) return;

    const scrollBy = () => {
        // calculate scroll amount based on card width
        const card = row.querySelector('.card');
        const amount = card ? card.getBoundingClientRect().width + 16 : 220;
        return amount;
    };

    prev.addEventListener('click', () => {
        row.scrollBy({ left: -scrollBy(), behavior: 'smooth' });
    });

    next.addEventListener('click', () => {
        row.scrollBy({ left: scrollBy(), behavior: 'smooth' });
    });
});
