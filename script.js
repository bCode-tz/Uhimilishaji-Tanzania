// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards and education cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.service-card, .education-card, .stat-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Language Translation System
const translations = {
    en: {
        nav: {
            home: "Home",
            about: "About Us",
            services: "Services",
            education: "Education",
            contact: "Contact"
        },
        hero: {
            tagline: "Empowering farmers with modern Breeding Solutions"
        },
        buttons: {
            learnMore: "Learn More",
            ourServices: "Our Services",
            getInTouch: "Get in Touch",
            sendMessage: "Send Message"
        },
        sections: {
            about: "About Us",
            benefits: "Key Benefits",
            services: "Our Services",
            education: "Educational Resources",
            contact: "Contact Us"
        }
    },
    sw: {
        nav: {
            home: "Nyumbani",
            about: "Kuhusu Sisi",
            services: "Huduma",
            education: "Elimu",
            contact: "Wasiliana"
        },
        hero: {
            tagline: "Kuwawezesha wakulima na Suluhisho za Uzazi za Kisasa"
        },
        buttons: {
            learnMore: "Jifunze Zaidi",
            ourServices: "Huduma Zetu",
            getInTouch: "Wasiliana Nasi",
            sendMessage: "Tuma Ujumbe"
        },
        sections: {
            about: "Kuhusu Sisi",
            benefits: "Faida Kuu",
            services: "Huduma Zetu",
            education: "Rasilimali za Elimu",
            contact: "Wasiliana Nasi"
        }
    }
};

// Get saved language or default to English
let currentLang = localStorage.getItem('language') || 'en';

// Language Selector Toggle
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const currentLangSpan = document.getElementById('currentLang');
const langOptions = document.querySelectorAll('.lang-option');

langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    document.querySelector('.language-selector').classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.language-selector')) {
        document.querySelector('.language-selector').classList.remove('active');
    }
});

// Language Selection
langOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedLang = option.getAttribute('data-lang');
        changeLanguage(selectedLang);
        document.querySelector('.language-selector').classList.remove('active');
    });
});

// Change Language Function
function changeLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    currentLangSpan.textContent = lang.toUpperCase();
    
    // Update active language option
    langOptions.forEach(opt => {
        opt.classList.remove('active');
        if (opt.getAttribute('data-lang') === lang) {
            opt.classList.add('active');
        }
    });
    
    // Translate navigation
    document.querySelectorAll('[data-translate^="nav."]').forEach(element => {
        const key = element.getAttribute('data-translate').replace('nav.', '');
        if (translations[lang].nav[key]) {
            element.textContent = translations[lang].nav[key];
        }
    });
    
    // Translate hero tagline
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline && translations[lang].hero.tagline) {
        heroTagline.textContent = translations[lang].hero.tagline;
    }
    
    // Translate buttons
    document.querySelectorAll('[data-translate^="buttons."]').forEach(element => {
        const key = element.getAttribute('data-translate').replace('buttons.', '');
        if (translations[lang].buttons[key]) {
            element.textContent = translations[lang].buttons[key];
        }
    });
    
    // Translate section titles
    document.querySelectorAll('[data-translate^="sections."]').forEach(element => {
        const key = element.getAttribute('data-translate').replace('sections.', '');
        if (translations[lang].sections[key]) {
            element.textContent = translations[lang].sections[key];
        }
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLang);
});

