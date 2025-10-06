'use strict';


const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const themeToggle = document.getElementById('theme-toggle');
const backToTop = document.getElementById('back-to-top');
const loadingScreen = document.querySelector('.loading-screen');
const sections = document.querySelectorAll('.section');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project__card');
const contactForm = document.getElementById('contact-form');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox__img');
const lightboxCaption = lightbox.querySelector('.lightbox__caption');
const lightboxClose = lightbox.querySelector('.lightbox__close');
const previewBtns = document.querySelectorAll('.preview-btn');


window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1000);
});


const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    
    setTimeout(() => {
        cursorFollower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
    }, 100);
});


const hoverElements = document.querySelectorAll('a, button, .project__card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.5)';
        cursorFollower.style.transform += ' scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
        cursorFollower.style.transform = cursorFollower.style.transform.replace(' scale(1.5)', '');
    });
});


// MOBILE NAVIGATION MENU
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}


navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});



const scrollHeader = () => {
    if (window.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
};

window.addEventListener('scroll', scrollHeader);



const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
};

window.addEventListener('scroll', scrollActive);



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});



const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});



const typingText = document.querySelector('.typing-text');
const phrases = [
    'Web and AI/ML Developer',
    'AI Enthusiast',
    'Problem Solver',
    'Creative Thinker'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; 
    }
    
    setTimeout(typeEffect, typingSpeed);
}
setTimeout(typeEffect, 1000);



filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.classList.remove('hide');
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = 'projectFadeIn 0.5s ease';
                }, 10);
            } else {
                card.classList.add('hide');
            }
        });
    });
});



previewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const projectCard = btn.closest('.project__card');
        const img = projectCard.querySelector('.project__img');
        const title = projectCard.querySelector('.project__title').textContent;
        
        lightboxImg.src = img.src;
        lightboxCaption.textContent = title;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});



const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('appear');
            
            if (entry.target.classList.contains('skills')) {
                animateSkillCards();
            }
        }
    });
}, observerOptions);


const fadeElements = document.querySelectorAll('.glass-card, .about__container, .projects__container');
fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});
observer.observe(document.querySelector('.skills'));



let skillsAnimated = false;

function animateSkillCards() {
    if (skillsAnimated) return;
    
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    skillsAnimated = true;
}



if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();
    
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
    
        let isValid = true;
        
        if (formData.name.length < 2) {
            showError('name', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        if (!isValidEmail(formData.email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (formData.subject.length < 3) {
            showError('subject', 'Subject must be at least 3 characters');
            isValid = false;
        }
        
        if (formData.message.length < 10) {
            showError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (!isValid) return;
        const btnText = contactForm.querySelector('.btn__text');
        const btnLoader = contactForm.querySelector('.btn__loader');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline-block';
        submitBtn.disabled = true;
        

        setTimeout(() => {
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
            showMessage('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        
            setTimeout(() => {
                hideMessage();
            }, 5000);
        }, 2000);
    });
}

function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorSpan = field.nextElementSibling;
    
    field.style.borderColor = '#ef4444';
    errorSpan.textContent = message;
}

function clearErrors() {
    const inputs = contactForm.querySelectorAll('.form__input');
    const errors = contactForm.querySelectorAll('.form__error');
    
    inputs.forEach(input => {
        input.style.borderColor = '';
    });
    
    errors.forEach(error => {
        error.textContent = '';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(text, type) {
    const messageDiv = contactForm.querySelector('.form__message');
    messageDiv.textContent = text;
    messageDiv.className = `form__message ${type}`;
    messageDiv.style.display = 'block';
}

function hideMessage() {
    const messageDiv = contactForm.querySelector('.form__message');
    messageDiv.style.display = 'none';
}



const showBackToTop = () => {
    if (window.scrollY >= 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
};

window.addEventListener('scroll', showBackToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});



window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero__blob');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});


// DOWNLOAD RESUME
const downloadCV = document.querySelector('.download-cv');
if (downloadCV) {
    downloadCV.addEventListener('click', (e) => {
        e.preventDefault();
        const link = document.createElement('a');
        link.href = 'Vishal_Patel_Resume.pdf';
        link.download = 'Vishal_Patel_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}


// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
    }
});

// mobile menu
if (navMenu) {
    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    navMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
    });
}


// Debounce scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedScrollHeader = debounce(scrollHeader, 10);
const debouncedScrollActive = debounce(scrollActive, 10);
const debouncedShowBackToTop = debounce(showBackToTop, 10);

window.addEventListener('scroll', debouncedScrollHeader);
window.addEventListener('scroll', debouncedScrollActive);
window.addEventListener('scroll', debouncedShowBackToTop);


console.log('%cHello, Developer!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%cThanks for checking out the code! Feel free to reach out if you want to collaborate.', 'color: #64748b; font-size: 14px;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #8b5cf6; font-size: 12px;');


document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
    document.body.classList.add('loaded');
});