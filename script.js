// Page Loader Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// Navigation Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Logic
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('#nav-links li a');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'fas fa-times';
            document.body.style.overflow = 'hidden';
        } else {
            icon.className = 'fas fa-bars';
            document.body.style.overflow = 'auto';
        }
    });
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (mobileToggle) mobileToggle.querySelector('i').className = 'fas fa-bars';
        document.body.style.overflow = 'auto';
    });
});

// Reveal Animations (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Lightbox Gallery
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
const closeLightbox = document.querySelector('.close-lightbox');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        if (lightboxImg) lightboxImg.src = imgSrc;
        if (lightbox) {
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
});

if (closeLightbox) {
    closeLightbox.addEventListener('click', () => {
        if (lightbox) lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Back to Top Button Logic
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (backToTopBtn) {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
});

// WhatsApp Booking Redirect Logic
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('cust-name').value;
        const phone = document.getElementById('cust-phone').value;
        const date = document.getElementById('cust-date').value;
        const time = document.getElementById('cust-time').value;
        const location = document.getElementById('cust-location').value;
        const requirements = document.getElementById('cust-requirements').value;
        
        // Multi-select Services
        const selectedServices = Array.from(document.querySelectorAll('input[name="service"]:checked'))
                                    .map(el => el.value);
        
        if (selectedServices.length === 0) {
            alert('Please select at least one service.');
            return;
        }

        const servicesString = selectedServices.join(', ');

        const message = `*New Booking Inquiry - Great Delhi Band*%0A%0A` +
                        `*Name:* ${name}%0A` +
                        `*Phone:* ${phone}%0A` +
                        `*Event Date:* ${date}%0A` +
                        `*Event Time:* ${time}%0A` +
                        `*Venue Location:* ${location}%0A` +
                        `*Selected Services:* ${servicesString}%0A` +
                        `*Requirements:* ${requirements || 'None'}`;

        const whatsappUrl = `https://wa.me/919711609909?text=${message}`;

        const submitBtn = contactForm.querySelector('button');
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Opening WhatsApp...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Redirected!';
            submitBtn.style.backgroundColor = '#28a745';
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalContent;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1200);
    });
}