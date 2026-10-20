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
            const text = `Hello Nalaka,%0A%0A*Tour Booking & Enquiry - Thambapanni Rides*%0AName: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0APreferred Vehicle: ${encodeURIComponent(vehicle)}%0ATravelers: ${encodeURIComponent(travelers)}%0AArrival Date: ${encodeURIComponent(date)}%0AMessage: ${encodeURIComponent(message)}`;
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

    // ==========================================================================
    // 10. Customer Review System (Live Cloud Sync & Interactive UI)
    // ==========================================================================
    const CLOUD_REVIEWS_URL = 'https://kvdb.io/3umq2rHdkoxQtaNjZr1L1L/thambapanni_reviews';
    const LOCAL_STORAGE_KEY = 'thambapanni_customer_reviews';
    const HELPFUL_STORAGE_KEY = 'thambapanni_helpful_reviews';

    let allReviews = [];
    let currentFilter = 'all';
    let currentSort = 'newest';
    let searchQuery = '';

    // DOM Elements for Reviews
    const reviewsGrid = document.getElementById('reviewsGrid');
    const noReviewsFound = document.getElementById('noReviewsFound');
    const avgRatingDisplay = document.getElementById('avgRatingDisplay');
    const avgStarsDisplay = document.getElementById('avgStarsDisplay');
    const totalReviewsCount = document.getElementById('totalReviewsCount');
    const allReviewsCount = document.getElementById('allReviewsCount');
    const cloudSyncStatus = document.getElementById('cloudSyncStatus');
    const reviewSearchInput = document.getElementById('reviewSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const reviewSortSelect = document.getElementById('reviewSortSelect');
    const reviewFilterPills = document.querySelectorAll('.review-filter-btn');
    const resetReviewFiltersBtn = document.getElementById('resetReviewFiltersBtn');

    // Modal DOM Elements
    const reviewModal = document.getElementById('reviewModal');
    const openReviewModalBtn = document.getElementById('openReviewModalBtn');
    const openReviewModalBtn2 = document.getElementById('openReviewModalBtn2');
    const closeReviewModalBtn = document.getElementById('closeReviewModalBtn');
    const cancelReviewBtn = document.getElementById('cancelReviewBtn');
    const reviewModalOverlay = document.getElementById('reviewModalOverlay');
    const submitReviewForm = document.getElementById('submitReviewForm');
    const reviewFormScreen = document.getElementById('reviewFormScreen');
    const reviewSuccessState = document.getElementById('reviewSuccessState');
    const closeSuccessModalBtn = document.getElementById('closeSuccessModalBtn');
    const shareReviewWhatsAppBtn = document.getElementById('shareReviewWhatsAppBtn');
    const starPickerBtns = document.querySelectorAll('.star-picker-btn');
    const selectedRatingValue = document.getElementById('selectedRatingValue');
    const ratingFeedbackText = document.getElementById('ratingFeedbackText');
    const submitReviewBtn = document.getElementById('submitReviewBtn');
    const reviewFormStatus = document.getElementById('reviewFormStatus');

    // Helper: HTML escaping to prevent XSS
    function escapeHTML(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // Helper: Get user initials
    function getInitials(name) {
        if (!name) return 'TR';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }

    // Helper: Render Star Icons
    function renderStarsHTML(rating) {
        let stars = '';
        const full = Math.floor(rating);
        const hasHalf = (rating - full) >= 0.5;
        for (let i = 1; i <= 5; i++) {
            if (i <= full) {
                stars += '<i class="fa-solid fa-star"></i>';
            } else if (i === full + 1 && hasHalf) {
                stars += '<i class="fa-solid fa-star-half-stroke"></i>';
            } else {
                stars += '<i class="fa-regular fa-star"></i>';
            }
        }
        return stars;
    }

    // Rating Label Descriptions
    const ratingLabels = {
        1: "1 Star - Disappointing",
        2: "2 Stars - Fair Experience",
        3: "3 Stars - Good & Satisfactory",
        4: "4 Stars - Very Good & Recommended",
        5: "5 Stars - Outstanding / Unforgettable!"
    };

    // Update Interactive Star Rating Picker
    function setRatingPicker(val) {
        if (!selectedRatingValue) return;
        selectedRatingValue.value = val;
        
        starPickerBtns.forEach(btn => {
            const btnVal = parseInt(btn.getAttribute('data-rating'), 10);
            if (btnVal <= val) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        if (ratingFeedbackText) {
            ratingFeedbackText.textContent = ratingLabels[val] || `${val} Stars`;
        }
    }

    // Star Picker Event Listeners
    starPickerBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            const hoverVal = parseInt(btn.getAttribute('data-rating'), 10);
            starPickerBtns.forEach(b => {
                const bVal = parseInt(b.getAttribute('data-rating'), 10);
                if (bVal <= hoverVal) {
                    b.classList.add('hover');
                } else {
                    b.classList.remove('hover');
                }
            });
        });

        btn.addEventListener('mouseleave', () => {
            starPickerBtns.forEach(b => b.classList.remove('hover'));
        });

        btn.addEventListener('click', () => {
            const rating = parseInt(btn.getAttribute('data-rating'), 10);
            setRatingPicker(rating);
        });
    });

    // Helpful reviews tracker in localStorage
    function getHelpfulReviews() {
        try {
            return JSON.parse(localStorage.getItem(HELPFUL_STORAGE_KEY) || '[]');
        } catch (e) {
            return [];
        }
    }

    function isReviewHelpfulMarked(id) {
        const helpfulList = getHelpfulReviews();
        return helpfulList.includes(id);
    }

    function toggleHelpfulReview(id) {
        const helpfulList = getHelpfulReviews();
        const index = helpfulList.indexOf(id);
        const review = allReviews.find(r => r.id === id);

        if (!review) return;

        if (index === -1) {
            helpfulList.push(id);
            review.helpful = (review.helpful || 0) + 1;
        } else {
            helpfulList.splice(index, 1);
            review.helpful = Math.max(0, (review.helpful || 0) - 1);
        }

        try {
            localStorage.setItem(HELPFUL_STORAGE_KEY, JSON.stringify(helpfulList));
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allReviews));
        } catch (e) {
            console.error('Failed to save helpful state', e);
        }

        renderReviews();
        // Optimistically sync helpful counter to cloud
        syncAllToCloudDebounced();
    }

    // Debounced Cloud Sync
    let syncTimeout = null;
    function syncAllToCloudDebounced() {
        clearTimeout(syncTimeout);
        syncTimeout = setTimeout(() => {
            fetch(CLOUD_REVIEWS_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(allReviews)
            }).catch(err => console.log('Silent sync notice:', err));
        }, 1500);
    }

    // Calculate & Update Overall Rating Statistics
    function updateRatingStats() {
        if (!allReviews || allReviews.length === 0) {
            if (avgRatingDisplay) avgRatingDisplay.textContent = '5.0';
            if (avgStarsDisplay) avgStarsDisplay.innerHTML = renderStarsHTML(5);
            if (totalReviewsCount) totalReviewsCount.textContent = '0';
            if (allReviewsCount) allReviewsCount.textContent = '0';
            for (let s = 1; s <= 5; s++) {
                const barFill = document.getElementById(`bar${s}Star`);
                const barText = document.getElementById(`count${s}Star`);
                if (barFill) barFill.style.width = '0%';
                if (barText) barText.textContent = '0%';
            }
            return;
        }

        const total = allReviews.length;
        const sum = allReviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
        const avg = (sum / total).toFixed(1);

        if (avgRatingDisplay) avgRatingDisplay.textContent = avg;
        if (avgStarsDisplay) avgStarsDisplay.innerHTML = renderStarsHTML(avg);
        if (totalReviewsCount) totalReviewsCount.textContent = total;
        if (allReviewsCount) allReviewsCount.textContent = total;

        // Breakdown counts
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        allReviews.forEach(r => {
            const star = Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5)));
            counts[star] = (counts[star] || 0) + 1;
        });

        for (let s = 1; s <= 5; s++) {
            const barFill = document.getElementById(`bar${s}Star`);
            const barText = document.getElementById(`count${s}Star`);
            const pct = Math.round((counts[s] / total) * 100);

            if (barFill) barFill.style.width = `${pct}%`;
            if (barText) barText.textContent = `${pct}%`;
        }
    }

    // Filter, Sort, and Render Reviews
    function renderReviews() {
        if (!reviewsGrid) return;

        // If no reviews exist at all yet
        if (!allReviews || allReviews.length === 0) {
            reviewsGrid.innerHTML = `
                <div class="reviews-empty-state" style="grid-column: 1 / -1; margin-bottom: 0;">
                    <i class="fa-solid fa-comments empty-state-icon"></i>
                    <h3>No guest reviews yet</h3>
                    <p>Be the very first traveller to share your journey with Nalaka &amp; Thambapanni Rides!</p>
                    <button type="button" class="btn btn-first-review" id="firstReviewBtn">
                        <i class="fa-solid fa-pen-to-square"></i>
                        <span>Leave the First Review</span>
                    </button>
                </div>
            `;
            const firstBtn = document.getElementById('firstReviewBtn');
            if (firstBtn) firstBtn.addEventListener('click', openReviewModal);
            if (noReviewsFound) noReviewsFound.style.display = 'none';
            return;
        }

        // Filter reviews
        let filtered = allReviews.filter(rev => {
            // Category / Pill filter
            if (currentFilter === '5' && Number(rev.rating) < 5) return false;
            if (currentFilter === 'with-reply' && (!rev.reply || rev.reply.trim() === '')) return false;
            if (currentFilter === 'recent') {
                const now = Date.now();
                const revTime = rev.timestamp || 0;
                // Last 180 days or recent flag
                if (now - revTime > 180 * 24 * 60 * 60 * 1000 && !rev.justAdded) return false;
            }

            // Keyword search
            if (searchQuery) {
                const query = searchQuery.toLowerCase();
                const name = (rev.name || '').toLowerCase();
                const country = (rev.country || '').toLowerCase();
                const tour = (rev.tour || '').toLowerCase();
                const title = (rev.title || '').toLowerCase();
                const comment = (rev.comment || '').toLowerCase();
                return name.includes(query) || country.includes(query) || tour.includes(query) || title.includes(query) || comment.includes(query);
            }

            return true;
        });

        // Sort reviews
        filtered.sort((a, b) => {
            if (currentSort === 'newest') {
                return (b.timestamp || 0) - (a.timestamp || 0);
            }
            if (currentSort === 'highest') {
                return (Number(b.rating) || 0) - (Number(a.rating) || 0);
            }
            if (currentSort === 'helpful') {
                return (Number(b.helpful) || 0) - (Number(a.helpful) || 0);
            }
            return 0;
        });

        // Handle Empty State when search/filter has no match
        if (filtered.length === 0) {
            reviewsGrid.innerHTML = '';
            if (noReviewsFound) noReviewsFound.style.display = 'block';
            return;
        }

        if (noReviewsFound) noReviewsFound.style.display = 'none';

        // Build HTML
        reviewsGrid.innerHTML = filtered.map(rev => {
            const initials = getInitials(rev.name);
            const starsHTML = renderStarsHTML(rev.rating || 5);
            const isHelpful = isReviewHelpfulMarked(rev.id);
            const justAddedClass = rev.justAdded ? ' just-added' : '';
            const justAddedBadge = rev.justAdded ? '<span class="just-added-badge"><i class="fa-solid fa-sparkles"></i> New</span>' : '';

            const replyHTML = rev.reply && rev.reply.trim() !== '' ? `
                <div class="host-reply-box">
                    <div class="host-reply-header">
                        <i class="fa-solid fa-reply"></i>
                        <span>Response from Nalaka Senadeera • Host &amp; Guide</span>
                    </div>
                    <p>"${escapeHTML(rev.reply)}"</p>
                </div>
            ` : '';

            const recommendHTML = rev.recommend !== false ? `
                <span class="recommend-tag"><i class="fa-solid fa-check"></i> Recommends this tour</span>
            ` : '';

            return `
                <div class="review-card${justAddedClass}" data-id="${escapeHTML(rev.id)}">
                    ${justAddedBadge}
                    <div class="review-card-header">
                        <div class="reviewer-meta">
                            <div class="reviewer-avatar">${escapeHTML(initials)}</div>
                            <div class="reviewer-info">
                                <h4>
                                    ${escapeHTML(rev.name)}
                                    <i class="fa-solid fa-circle-check verified-icon" title="Verified Guest"></i>
                                </h4>
                                <span class="reviewer-origin">
                                    <i class="fa-regular fa-calendar-check"></i> ${escapeHTML(rev.date || 'Recent')}
                                </span>
                            </div>
                        </div>
                        <div class="review-card-rating">
                            <div class="review-stars">${starsHTML}</div>
                        </div>
                    </div>

                    <div class="review-body">
                        <p>${escapeHTML(rev.comment)}</p>
                        ${replyHTML}
                    </div>

                    <div class="review-card-footer">
                        <button type="button" class="helpful-btn${isHelpful ? ' active' : ''}" data-review-id="${escapeHTML(rev.id)}">
                            <i class="fa-${isHelpful ? 'solid' : 'regular'} fa-thumbs-up"></i> Helpful (${Number(rev.helpful || 0)})
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        // Attach helpful click handlers
        reviewsGrid.querySelectorAll('.helpful-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-review-id');
                if (id) toggleHelpfulReview(id);
            });
        });
    }

    // Modal Control Functions
    function openReviewModal() {
        if (!reviewModal) return;
        if (reviewFormScreen) reviewFormScreen.style.display = 'block';
        if (reviewSuccessState) reviewSuccessState.style.display = 'none';
        if (submitReviewForm) submitReviewForm.reset();
        setRatingPicker(5);
        if (reviewFormStatus) reviewFormStatus.textContent = '';
        reviewModal.classList.add('active');
        reviewModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeReviewModal() {
        if (!reviewModal) return;
        reviewModal.classList.remove('active');
        reviewModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    if (openReviewModalBtn) openReviewModalBtn.addEventListener('click', openReviewModal);
    if (openReviewModalBtn2) openReviewModalBtn2.addEventListener('click', openReviewModal);
    if (closeReviewModalBtn) closeReviewModalBtn.addEventListener('click', closeReviewModal);
    if (cancelReviewBtn) cancelReviewBtn.addEventListener('click', closeReviewModal);
    if (closeSuccessModalBtn) closeSuccessModalBtn.addEventListener('click', closeReviewModal);
    if (reviewModalOverlay) reviewModalOverlay.addEventListener('click', closeReviewModal);

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && reviewModal && reviewModal.classList.contains('active')) {
            closeReviewModal();
        }
    });

    // Review Form Submission Handling
    if (submitReviewForm) {
        submitReviewForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('reviewAuthorName').value.trim();
            const comment = document.getElementById('reviewComment').value.trim();
            const rating = parseInt(selectedRatingValue.value || '5', 10);

            if (!name || !comment) {
                if (reviewFormStatus) {
                    reviewFormStatus.className = 'form-status error';
                    reviewFormStatus.textContent = 'Please enter your name and review.';
                }
                return;
            }

            // Spinner state
            const btnText = submitReviewBtn.querySelector('.btn-text');
            const btnSpinner = submitReviewBtn.querySelector('.btn-spinner');
            if (btnText) btnText.style.display = 'none';
            if (btnSpinner) btnSpinner.style.display = 'inline-block';
            submitReviewBtn.disabled = true;

            const now = new Date();
            const dateStr = now.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

            const newReview = {
                id: 'rev_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
                name: name,
                rating: rating,
                comment: comment,
                date: dateStr,
                reply: '',
                helpful: 0,
                verified: true,
                timestamp: Date.now(),
                justAdded: true
            };

            // Optimistic local update
            allReviews.unshift(newReview);
            try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allReviews));
            } catch (err) {
                console.error('LocalStorage write error:', err);
            }

            // Re-render UI immediately
            updateRatingStats();
            renderReviews();

            // Prepare WhatsApp direct link for sharing
            if (shareReviewWhatsAppBtn) {
                const whatsappMsg = `Hello Nalaka!%0A%0A*New Guest Review for Thambapanni Rides*%0A*Rating:* ${rating}/5 Stars%0A*Name:* ${encodeURIComponent(name)}%0A*Review:* ${encodeURIComponent(comment)}%0A%0AThank you for a wonderful experience with Thambapanni Rides!`;
                shareReviewWhatsAppBtn.href = `https://wa.me/94710747041?text=${whatsappMsg}`;
            }

            // Post to Cloud KVDB asynchronously
            try {
                // Fetch fresh cloud data, merge, and put
                const cloudResp = await fetch(CLOUD_REVIEWS_URL);
                let cloudList = [];
                if (cloudResp.ok) {
                    cloudList = await cloudResp.json();
                    if (!Array.isArray(cloudList)) cloudList = [cloudList];
                } else {
                    cloudList = allReviews;
                }

                // Prepend new review if not existing
                if (!cloudList.some(r => r.id === newReview.id)) {
                    cloudList.unshift(newReview);
                }

                await fetch(CLOUD_REVIEWS_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(cloudList)
                });

                if (cloudSyncStatus) {
                    cloudSyncStatus.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Live synced for all visitors';
                }
            } catch (netErr) {
                console.log('Background cloud sync notice:', netErr);
            }

            // Restore button & show success state
            if (btnText) btnText.style.display = 'inline-block';
            if (btnSpinner) btnSpinner.style.display = 'none';
            submitReviewBtn.disabled = false;

            if (reviewFormScreen) reviewFormScreen.style.display = 'none';
            if (reviewSuccessState) reviewSuccessState.style.display = 'block';

            // Scroll reviews into view smoothly when modal finishes
            const reviewsSection = document.getElementById('reviews');
            if (reviewsSection) {
                reviewsSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Filter Buttons Listeners
    reviewFilterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            reviewFilterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            currentFilter = pill.getAttribute('data-filter') || 'all';
            renderReviews();
        });
    });

    // Search Input Listener
    if (reviewSearchInput) {
        reviewSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            if (clearSearchBtn) {
                clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
            }
            renderReviews();
        });
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            if (reviewSearchInput) reviewSearchInput.value = '';
            searchQuery = '';
            clearSearchBtn.style.display = 'none';
            renderReviews();
        });
    }

    // Sort Dropdown Listener
    if (reviewSortSelect) {
        reviewSortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderReviews();
        });
    }

    // Reset Filters Button
    if (resetReviewFiltersBtn) {
        resetReviewFiltersBtn.addEventListener('click', () => {
            currentFilter = 'all';
            currentSort = 'newest';
            searchQuery = '';
            if (reviewSearchInput) reviewSearchInput.value = '';
            if (clearSearchBtn) clearSearchBtn.style.display = 'none';
            if (reviewSortSelect) reviewSortSelect.value = 'newest';
            reviewFilterPills.forEach(p => {
                p.classList.toggle('active', p.getAttribute('data-filter') === 'all');
            });
            renderReviews();
        });
    }

    // Initialization & Cloud Sync Function
    async function initReviews() {
        // Step 1: Load from local storage (if any user reviews exist)
        let localList = null;
        try {
            const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (raw) localList = JSON.parse(raw);
        } catch (e) {
            console.error('Local review parse error', e);
        }

        if (Array.isArray(localList)) {
            // Filter out any legacy dummy seed reviews
            allReviews = localList.filter(r => r && r.id && !r.id.startsWith('seed_'));
        } else {
            allReviews = [];
        }

        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allReviews));
        } catch (e) {}

        // Render immediately
        updateRatingStats();
        renderReviews();

        // Step 2: Asynchronously sync with global Cloud store
        try {
            if (cloudSyncStatus) {
                cloudSyncStatus.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i> Checking live reviews...';
            }

            const response = await fetch(CLOUD_REVIEWS_URL, { cache: 'no-cache' });
            if (response.ok) {
                let cloudReviews = await response.json();
                if (!Array.isArray(cloudReviews)) {
                    cloudReviews = [];
                }

                // Discard any dummy seed reviews
                cloudReviews = cloudReviews.filter(r => r && r.id && !r.id.startsWith('seed_'));

                allReviews = cloudReviews;
                allReviews.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

                try {
                    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allReviews));
                } catch (e) {}

                updateRatingStats();
                renderReviews();

                if (cloudSyncStatus) {
                    cloudSyncStatus.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i> Live synced for all visitors';
                }
            }
        } catch (netErr) {
            console.log('Using offline reviews cache:', netErr);
            if (cloudSyncStatus) {
                cloudSyncStatus.innerHTML = '<i class="fa-solid fa-wifi"></i> Offline mode';
            }
        }
    }

    // Initialize Reviews System
    initReviews();
});
