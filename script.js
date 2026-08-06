document.addEventListener('DOMContentLoaded', () => {

    // 1. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when link clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 3. Dynamic Footer Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // 4. Interactive Experiences Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterCards = document.querySelectorAll('.filter-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            filterCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 5. Contact Form Submission Handling
    const tourForm = document.getElementById('tourForm');
    const formStatus = document.getElementById('formStatus');

    tourForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const travelers = document.getElementById('travelers').value;
        const date = document.getElementById('date').value;
        const message = document.getElementById('message').value;

        // Construct WhatsApp message
        const whatsappNumber = '94710747041'; // International format without +
        const text = `Hello Nalaka,%0A%0AName: ${name}%0AEmail: ${email}%0ATravelers: ${travelers}%0ADate: ${date}%0AMessage: ${encodeURIComponent(message)}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

        // Open WhatsApp chat in a new tab
        window.open(whatsappUrl, '_blank');

        // Show temporary status
        formStatus.className = 'form-status success';
        formStatus.textContent = 'Opening WhatsApp to send your enquiry...';

        // Reset form after short delay
        setTimeout(() => {
            tourForm.reset();
            formStatus.textContent = '';
        }, 3000);
    });

    // 6. Hero Image Slideshow
    const heroBgs = document.querySelectorAll('.hero-bg');
    if (heroBgs.length > 0) {
        let currentBgIndex = 0;
        
        setInterval(() => {
            // Remove active class from current image
            heroBgs[currentBgIndex].classList.remove('active');
            
            // Move to next image, wrapping around to the first
            currentBgIndex = (currentBgIndex + 1) % heroBgs.length;
            
            // Add active class to new image
            heroBgs[currentBgIndex].classList.add('active');
        }, 5000); // Change image every 5 seconds
    }
});
