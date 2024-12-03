// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Gallery Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('hide');
                item.classList.add('show');
            } else {
                item.classList.remove('show');
                item.classList.add('hide');
            }
        });
    });
});

// Lightbox Functionality
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxCaption = document.querySelector('.lightbox-caption');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
let currentImageIndex = 0;
const galleryImages = document.querySelectorAll('.gallery-item-inner img');

// Open lightbox
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImageIndex = index;
        showImage(currentImageIndex);
        lightbox.classList.add('active');
    });
});

// Close lightbox
lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Next image
lightboxNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage(currentImageIndex);
});

// Previous image
lightboxPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentImageIndex);
});

// Show image in lightbox
function showImage(index) {
    const img = galleryImages[index];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    const caption = img.closest('.gallery-item-inner').querySelector('.gallery-info h3').textContent;
    lightboxCaption.textContent = caption;
}

// Close lightbox with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        lightbox.classList.remove('active');
    }
});

// Navigation with arrow keys
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            showImage(currentImageIndex);
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            showImage(currentImageIndex);
        }
    }
});

// Mobile Menu Toggle
const burger = document.querySelector('.burger');
const navElements = document.querySelector('.nav-elements');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Navigation
    navElements.classList.toggle('active');
    burger.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navElements.classList.contains('active')) {
            navElements.classList.remove('active');
            burger.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            navLinks.forEach(link => {
                link.style.animation = '';
            });
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navElements.classList.contains('active') && 
        !navElements.contains(e.target) && 
        !burger.contains(e.target)) {
        navElements.classList.remove('active');
        burger.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    }
});

// Handle scroll events
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add/remove scrolled class
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Active section highlighting
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});

// Smooth scroll for Safari
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle resize events
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Form Submission
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    // Here you would typically send this data to a server
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Project Cards Hover Effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Skills Animation
const skillCards = document.querySelectorAll('.skill-card');
const animateSkills = () => {
    skillCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in', 'active');
        }, index * 200);
    });
};

// Run skills animation when skills section is in view
const skillsSection = document.querySelector('.skills');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

observer.observe(skillsSection);
