// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// Initialize Splide for Projects
document.addEventListener('DOMContentLoaded', function() {
    // Projects Slider
    new Splide('.projects-splide', {
        type: 'slide',
        perPage: 1,
        perMove: 1,
        gap: '2rem',
        padding: { left: '5%', right: '5%' },
        arrows: true,
        pagination: true,
        autoplay: false,
        interval: 4000,
        speed: 800,
        rewind: true,
        rewindSpeed: 1000,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        focus: 'center',
        breakpoints: {
            768: {
                padding: { left: '1rem', right: '1rem' }
            }
        }
    }).mount();

    // Skills Slider
    new Splide('.skills-splide', {
        type: 'slide',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        padding: { left: '5%', right: '5%' },
        arrows: true,
        pagination: true,
        autoplay: false,
        speed: 800,
        rewind: true,
        rewindSpeed: 1000,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        breakpoints: {
            1200: {
                perPage: 2
            },
            768: {
                perPage: 1,
                padding: { left: '1rem', right: '1rem' }
            }
        }
    }).mount();
});

// Navigation elements
const navElements = {
    sections: document.querySelectorAll('section'),
    links: document.querySelectorAll('.nav-links a'),
    toggle: document.querySelector('.nav-toggle'),
    container: document.querySelector('.nav-links')
};

// Navigation active state
window.addEventListener('scroll', () => {
    let current = '';
    
    navElements.sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - sectionHeight/3)) {
            current = section.getAttribute('id');
        }
    });

    navElements.links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile Navigation
navElements.toggle.addEventListener('click', () => {
    navElements.container.style.display = navElements.container.style.display === 'flex' ? 'none' : 'flex';
});

// Reset mobile nav on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navElements.container.style.display = 'flex';
    } else {
        navElements.container.style.display = 'none';
    }
});

// Form handling
const form = document.querySelector('.contact-form');
form.addEventListener('submit', function(e) {
    const submitBtn = form.querySelector('button');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Reset button after submission
    setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }, 2000);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Close mobile nav if open
            if (window.innerWidth <= 768) {
                navElements.container.style.display = 'none';
            }
            
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Skill bars animation
const skillLevels = document.querySelectorAll('.skill-level');

const animateSkillLevels = () => {
    skillLevels.forEach(level => {
        const width = level.style.width;
        level.style.width = '0';
        setTimeout(() => {
            level.style.width = width;
        }, 100);
    });
};

// Trigger skill bars animation when skills section is in view
const skillsSection = document.querySelector('.skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillLevels();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    observer.observe(skillsSection);
}

// Project hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
        card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Typing effect for hero section
const heroText = document.querySelector('.hero-text h1');
if (heroText) {
    const text = heroText.innerHTML;
    heroText.innerHTML = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            heroText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing effect when page loads
    window.addEventListener('load', typeWriter);
} 