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
    const parallaxSpeed = 0.5;
    const heroParallax = () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = -(scrolled * parallaxSpeed) + 'px';
    };

    let parallaxActive = false;
    const scrollListenerOptions = { passive: true };

    const toggleHeroParallax = () => {
        const shouldEnable = window.innerWidth >= 1024;

        if (shouldEnable && !parallaxActive) {
            heroParallax();
            window.addEventListener('scroll', heroParallax, scrollListenerOptions);
            parallaxActive = true;
        } else if (!shouldEnable && parallaxActive) {
            window.removeEventListener('scroll', heroParallax, scrollListenerOptions);
            hero.style.backgroundPositionY = '';
            parallaxActive = false;
        }
    };

    toggleHeroParallax();
    window.addEventListener('resize', toggleHeroParallax);
    window.addEventListener('orientationchange', toggleHeroParallax);
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

// Premium scroll-based navigation hide/show
const nav = document.querySelector('.main-nav');
const mobileCTA = document.querySelector('.mobile-sticky-cta');
let lastScroll = 0;
const scrollThreshold = 80; // Minimum scroll before hiding nav
const scrollBuffer = 10; // Prevents jitter from small scroll movements

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Don't hide nav at the very top of the page
    if (currentScroll <= scrollThreshold) {
        nav.classList.remove('nav-hidden');
        nav.style.boxShadow = '0 4px 24px rgba(211, 47, 47, 0.25)';

        // Hide mobile CTA at top of page
        if (mobileCTA) {
            mobileCTA.classList.add('hidden');
        }

        lastScroll = currentScroll;
        return;
    }

    // Only process if scroll difference exceeds buffer (prevents jitter)
    if (Math.abs(currentScroll - lastScroll) < scrollBuffer) {
        return;
    }

    // Scrolling down - hide nav, show mobile CTA
    if (currentScroll > lastScroll) {
        if (!nav.classList.contains('nav-hidden')) {
            nav.classList.add('nav-hidden');
        }
        if (mobileCTA && mobileCTA.classList.contains('hidden')) {
            mobileCTA.classList.remove('hidden');
        }
    }
    // Scrolling up - show nav, hide mobile CTA
    else if (currentScroll < lastScroll) {
        if (nav.classList.contains('nav-hidden')) {
            nav.classList.remove('nav-hidden');
            nav.style.boxShadow = '0 8px 32px rgba(211, 47, 47, 0.35)';
        }
        if (mobileCTA && !mobileCTA.classList.contains('hidden')) {
            mobileCTA.classList.add('hidden');
        }
    }

    lastScroll = currentScroll;
}, { passive: true });

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
