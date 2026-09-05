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

    if (tourForm) {
        tourForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const travelers = document.getElementById('travelers').value;
            const date = document.getElementById('date').value;
            const vehicle = document.getElementById('vehicle')?.value || 'Flexible / Any Suitable Vehicle';
            const message = document.getElementById('message').value;

            // Construct formatted WhatsApp message
            const whatsappNumber = '94710747041'; // International format without +
            const text = `Hello Nalaka,%0A%0A*Tour Booking & Enquiry*%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APreferred Vehicle: ${encodeURIComponent(vehicle)}%0ATravelers: ${encodeURIComponent(travelers)}%0AArrival Date: ${encodeURIComponent(date)}%0AMessage: ${encodeURIComponent(message)}`;
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
    }

    // 5.1 Vehicle Data and Dynamic Preview in Booking Form
    const vehicleData = {
        'Perodua Bezza Sedan (1 - 3 Guests)': {
            title: 'Perodua Bezza Sedan',
            category: 'Comfort Air-Conditioned Sedan',
            desc: 'Modern, clean & fuel-efficient private sedan with plush seating, crisp A/C, and smooth suspension — ideal for relaxed island touring.',
            capacity: '1 - 3 Seats',
            baggage: '2 Large Bags',
            ac: 'Dual A/C & Chauffeur Guide',
            image: 'images/vehicle-sedan.jpg'
        },
        'Comfort Air-Conditioned Sedan (Bezza / Prime)': {
            title: 'Perodua Bezza Sedan',
            category: 'Comfort Air-Conditioned Sedan',
            desc: 'Modern, clean & fuel-efficient private sedan with plush seating, crisp A/C, and smooth suspension — ideal for relaxed island touring.',
            capacity: '1 - 3 Seats',
            baggage: '2 Large Bags',
            ac: 'Dual A/C & Chauffeur Guide',
            image: 'images/vehicle-sedan.jpg'
        },
        'Toyota Axio Fielder (1 - 4 Guests)': {
            title: 'Toyota Axio Fielder',
            category: 'Hybrid Touring Wagon / Sedan',
            desc: 'Spacious, smooth, and fuel-efficient Toyota Axio Fielder hybrid with plush seating, crisp A/C, and generous luggage capacity.',
            capacity: '4 Passengers (1 - 4)',
            baggage: '3 - 4 Large Bags',
            ac: 'Dual Climate A/C & Chauffeur Guide',
            image: 'images/toyota-axio-fielder.jpg'
        },
        'Luxury Toyota KDH Van (4 - 7 Guests)': {
            title: 'Luxury Toyota KDH Van',
            category: '7-Seater Tourist Van (KDH / HiAce)',
            desc: 'Spacious high-roof Toyota KDH tourist van featuring 7 passenger seats, reclining captain chairs, dual multi-zone air conditioning, and panoramic tinted windows.',
            capacity: '7 Passengers (4 - 7)',
            baggage: '6 - 7 Large Bags',
            ac: 'Dual Multi A/C & Wi-Fi',
            image: 'images/toyota-kdh-van.jpg'
        },
        'Luxury Tourist Mini Van (KDH / HiAce Commuter)': {
            title: 'Luxury Toyota KDH Van',
            category: '7-Seater Tourist Van (KDH / HiAce)',
            desc: 'Spacious high-roof Toyota KDH tourist van featuring 7 passenger seats, reclining captain chairs, dual multi-zone air conditioning, and panoramic tinted windows.',
            capacity: '7 Passengers (4 - 7)',
            baggage: '6 - 7 Large Bags',
            ac: 'Dual Multi A/C & Wi-Fi',
            image: 'images/toyota-kdh-van.jpg'
        }
    };

    const vehicleSelect = document.getElementById('vehicle');
    const selectedVehiclePreview = document.getElementById('selectedVehiclePreview');
    const vehiclePreviewImg = document.getElementById('vehiclePreviewImg');
    const vehiclePreviewTitle = document.getElementById('vehiclePreviewTitle');
    const vehiclePreviewCategory = document.getElementById('vehiclePreviewCategory');
    const vehiclePreviewDesc = document.getElementById('vehiclePreviewDesc');
    const vehiclePreviewCapacity = document.querySelector('#vehiclePreviewCapacity span');
    const vehiclePreviewBaggage = document.querySelector('#vehiclePreviewBaggage span');
    const vehiclePreviewAc = document.querySelector('#vehiclePreviewAc span');

    function updateVehiclePreview(selectedVal) {
        if (!selectedVehiclePreview) return;

        const data = vehicleData[selectedVal];
        if (data) {
            if (vehiclePreviewImg) {
                vehiclePreviewImg.src = data.image;
                vehiclePreviewImg.alt = data.title;
            }
            if (vehiclePreviewTitle) vehiclePreviewTitle.textContent = data.title;
            if (vehiclePreviewCategory) vehiclePreviewCategory.textContent = data.category;
            if (vehiclePreviewDesc) vehiclePreviewDesc.textContent = data.desc;
            if (vehiclePreviewCapacity) vehiclePreviewCapacity.textContent = data.capacity;
            if (vehiclePreviewBaggage) vehiclePreviewBaggage.textContent = data.baggage;
            if (vehiclePreviewAc) vehiclePreviewAc.textContent = data.ac;

            selectedVehiclePreview.style.display = 'flex';
        } else {
            selectedVehiclePreview.style.display = 'none';
        }
    }

    if (vehicleSelect) {
        vehicleSelect.addEventListener('change', (e) => {
            updateVehiclePreview(e.target.value);
        });
        // Initial check on load
        updateVehiclePreview(vehicleSelect.value);
    }

    // 5.2 Vehicle Card Selection to Contact Form Handler
    const vehicleSelectBtns = document.querySelectorAll('.vehicle-select-btn');
    vehicleSelectBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetVehicle = btn.getAttribute('data-vehicle');
            const contactSection = document.getElementById('contact');

            if (vehicleSelect && targetVehicle) {
                vehicleSelect.value = targetVehicle;
                updateVehiclePreview(targetVehicle);

                // Add highlight pulse animation to the vehicle field
                vehicleSelect.classList.remove('highlight-field');
                void vehicleSelect.offsetWidth; // Trigger reflow
                vehicleSelect.classList.add('highlight-field');

                setTimeout(() => {
                    vehicleSelect.classList.remove('highlight-field');
                }, 2000);
            }

            // Smooth scroll to the contact form
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Focus on the name field for quick entry
                setTimeout(() => {
                    const nameInput = document.getElementById('name');
                    if (nameInput) nameInput.focus();
                }, 600);
            }
        });
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

    // 7. Interactive Gallery Filter
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    function getVisibleGalleryItems() {
        return Array.from(galleryItems).filter(item => item.style.display !== 'none');
    }

    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-gallery-filter');

            galleryItems.forEach(item => {
                const categoryStr = item.getAttribute('data-category') || '';
                const categories = categoryStr.split(/\s+/);
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 8. Gallery Lightbox Modal
    const galleryModal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImg');
    const modalTag = document.getElementById('modalTag');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalClose = document.getElementById('modalClose');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const modalOverlay = document.querySelector('.gallery-modal-overlay');

    let currentGalleryIndex = 0;

    function openModal(index) {
        const visibleItems = getVisibleGalleryItems();
        if (index < 0 || index >= visibleItems.length) return;

        currentGalleryIndex = index;
        const targetItem = visibleItems[index];
        const imgEl = targetItem.querySelector('img');

        const imgSrc = imgEl.getAttribute('src');
        const imgAlt = imgEl.getAttribute('alt') || 'Gallery Photo';
        const tagText = targetItem.getAttribute('data-tag') || '';
        const titleText = targetItem.getAttribute('data-title') || targetItem.querySelector('.gallery-info h3')?.textContent || '';
        const descText = targetItem.getAttribute('data-desc') || targetItem.querySelector('.gallery-info p')?.textContent || '';

        modalImg.src = imgSrc;
        modalImg.alt = imgAlt;
        modalTag.textContent = tagText;
        modalTitle.textContent = titleText;
        modalDesc.textContent = descText;

        galleryModal.classList.add('active');
        galleryModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        galleryModal.classList.remove('active');
        galleryModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function showPrevImage() {
        const visibleItems = getVisibleGalleryItems();
        if (visibleItems.length === 0) return;
        currentGalleryIndex = (currentGalleryIndex - 1 + visibleItems.length) % visibleItems.length;
        openModal(currentGalleryIndex);
    }

    function showNextImage() {
        const visibleItems = getVisibleGalleryItems();
        if (visibleItems.length === 0) return;
        currentGalleryIndex = (currentGalleryIndex + 1) % visibleItems.length;
        openModal(currentGalleryIndex);
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const visibleItems = getVisibleGalleryItems();
            const index = visibleItems.indexOf(item);
            if (index !== -1) {
                openModal(index);
            }
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    if (modalPrev) modalPrev.addEventListener('click', (e) => { e.stopPropagation(); showPrevImage(); });
    if (modalNext) modalNext.addEventListener('click', (e) => { e.stopPropagation(); showNextImage(); });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!galleryModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    // 9. Active Nav Link on Scroll (ScrollSpy)
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset + 120;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    });
});
