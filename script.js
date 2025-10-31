// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target) && navMenu.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });
}

// Smooth scroll for anchor links
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

// Form submission handler
const franchiseForm = document.querySelector('.franchise-form');
if (franchiseForm) {
    franchiseForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect form data
        const formData = new FormData(franchiseForm);
        const data = Object.fromEntries(formData);

        // In a real application, you would send this data to a server
        console.log('Form submitted with data:', data);

        // Show success message
        alert('Thank you for your interest in SmackEm Seafood! We will contact you within 24-48 hours.');

        // Reset form
        franchiseForm.reset();
    });
}

// Enhanced scroll-triggered animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
        }
    });
}, observerOptions);

// Observe all major sections and cards for fade-in animations
document.querySelectorAll('.step-card, .stat-item, .testimonial-card, .fastest-growing-card, .franchise-opportunities, .experience-section, .own-franchise, .location-design, .looking-for, .benefit-item, .experience-highlights li, .design-feature').forEach(el => {
    el.classList.add('fade-in');
    fadeInObserver.observe(el);
});

// Parallax effect on hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.backgroundPositionY = -(scrolled * parallaxSpeed) + 'px';
    });
}

// Parallax effect on images
const parallaxImages = document.querySelectorAll('.experience-image-container, .own-franchise-image, .location-design-image');
parallaxImages.forEach(img => {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const imgTop = img.offsetTop;
        const imgHeight = img.offsetHeight;
        const windowHeight = window.innerHeight;

        if (scrolled + windowHeight > imgTop && scrolled < imgTop + imgHeight) {
            const yPos = -((scrolled + windowHeight - imgTop) / 10);
            img.style.transform = `translateY(${yPos}px)`;
        }
    });
});

// Sticky nav background change on scroll
const nav = document.querySelector('.main-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }

    lastScroll = currentScroll;
});

// Add counter animation for stats
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
};

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.dataset.animated) {
                statNumber.dataset.animated = 'true';
                const text = statNumber.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                if (!isNaN(number)) {
                    statNumber.textContent = '0';
                    setTimeout(() => {
                        animateCounter(statNumber, number);
                    }, 200);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ===================================
// INSTAGRAM FEED - ELFSIGHT WIDGET
// ===================================

/**
 * Instagram Feed is now powered by Elfsight
 * The widget automatically displays the latest posts from @smackemseafood
 * No manual configuration needed - it updates automatically!
 *
 * To customize the widget appearance, visit:
 * https://elfsight.com/instagram-feed-instashow/
 */

// Observe Instagram section for animations
const instagramSection = document.querySelector('.instagram-section');
if (instagramSection) {
    fadeInObserver.observe(instagramSection);
}
