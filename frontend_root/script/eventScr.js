let currentCategories = ['upcoming', 'current', 'past'];
let activeCategoryIndex = 0;
let selectedEventObj = null;
let carouselIntervalId = null;

// Structured live event array mapping metrics directly from files
const eventsRegistry = [
    {
        title: "Lasya 3.0",
        category: "past",
        date: "Last date for submission 27 June 2026",
        venue: "Online Summer Event",
        brief: "LASYA 3.0 - The Beautiful Fusion of Dance and Music is BACK this Summer!",
        details: "The most successful and highly anticipated cultural performance celebration on the campus timeline. It operates as an inclusive open air arena setting allowing community members to sync rhythms and jam collectively.",
        formUrl: "https://forms.gle/9g8vbm33Y8ShrN4f8",
        images: [
            "../images/Lasya_3.0/Las_poster_final.jpg",
            "../images/Interbatch Group 2026.jpg"
        ]
    }
];

function syncIndicatorPillPosition(activeButton) {
    const slider = document.getElementById('indicatorSlider');
    slider.style.width = activeButton.offsetWidth + 'px';
    slider.style.left = activeButton.offsetLeft + 'px';
}

function triggerTabShift(clickedBtn, categoryKey) {
    document.querySelectorAll('.category-tab-btn').forEach(btn => btn.classList.remove('active'));
    clickedBtn.classList.add('active');
    
    activeCategoryIndex = parseInt(clickedBtn.getAttribute('data-index'));
    
    syncIndicatorPillPosition(clickedBtn);
    generateEventCardsList(categoryKey);
}

// Card Interface Engine with Smart Conditional Formatting Rules
function generateEventCardsList(categoryKey) {
    const grid = document.getElementById('eventsVerticalGrid');
    const emptyState = document.getElementById('emptyStateBox');
    const emptyText = document.getElementById('emptyStateText');
    const clockIconSvg = document.getElementById('clockIconSvg');
    
    const filteredSet = eventsRegistry.filter(event => event.category === categoryKey);

    if (filteredSet.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'flex';
        
        // Smart Display Logic Constraints via Screenshots Reference
        if (categoryKey === 'upcoming') {
            clockIconSvg.style.display = 'block'; 
            emptyText.textContent = "Stay Tuned for Future Events";
        } else if (categoryKey === 'current') {
            clockIconSvg.style.display = 'none';  
            emptyText.textContent = "No Ongoing Events at the Moment";
        } else if (categoryKey === 'past') {
            clockIconSvg.style.display = 'none';  
            emptyText.textContent = "No Event History Available";
        }
        return;
    }

    emptyState.style.display = 'none';
    grid.style.display = 'grid';
    grid.innerHTML = '';

    filteredSet.forEach((ev, i) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'vertical-event-card';
        cardElement.onclick = () => evokeModalPopUp(ev);

        const hasImg = ev.images && ev.images.length > 0;
        const posterSubHTML = hasImg 
            ? `<img src="${ev.images[0]}" class="main-card-img" alt="${ev.title}">`
            : `<i class="fa-solid fa-clapperboard media-art-icon"></i>`;

        cardElement.innerHTML = `
            <div class="vertical-poster-frame">
                ${posterSubHTML}
                <span class="category-corner-badge">${categoryKey}</span>
            </div>
            <div class="vertical-card-text-box">
                <div class="card-event-heading">${ev.title}</div>
                <div class="card-event-metadata">
                    <span><i class="fa-regular fa-calendar-alt"></i> ${ev.date}</span>
                    <span><i class="fa-solid fa-map-pin"></i> ${ev.venue}</span>
                </div>
                <div class="card-event-synopsis">${ev.brief}</div>
            </div>
        `;

        grid.appendChild(cardElement);

        setTimeout(() => {
            cardElement.classList.add('pop-up-reveal');
        }, i * 100);
    });
}

// KEYBOARD SIDEWAYS NAVIGATION CONTROLLER
document.addEventListener('keydown', (e) => {
    if (backdropModal.classList.contains('active-reveal')) return;

    if (e.key === 'ArrowRight') {
        activeCategoryIndex = (activeCategoryIndex + 1) % currentCategories.length;
        let targetBtn = document.querySelector(`.category-tab-btn[data-index="${activeCategoryIndex}"]`);
        if (targetBtn) targetBtn.click();
    } else if (e.key === 'ArrowLeft') {
        activeCategoryIndex = (activeCategoryIndex - 1 + currentCategories.length) % currentCategories.length;
        let targetBtn = document.querySelector(`.category-tab-btn[data-index="${activeCategoryIndex}"]`);
        if (targetBtn) targetBtn.click();
    }
});

// Dropdown Toggle Utility: Hover + Click to Pin
const menuDotsBtn = document.querySelector('.menu-dots-btn');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdownContainer = document.querySelector('.more-menu-dropdown');

// Toggle the 'pinned' state on click to lock it open
menuDotsBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents the click from immediately triggering the document click listener
    dropdownContent.classList.toggle('pinned');
});

// Remove the 'pinned' state when clicking anywhere outside the dropdown area
document.addEventListener('click', (e) => {
    // If the click happened outside the dropdown container entirely, unpin it
    if (!dropdownContainer.contains(e.target)) {
        dropdownContent.classList.remove('pinned');
    }
});

//
// Pop Up Window Handlers
const backdropModal = document.getElementById('popupModalBackdrop');
const remindMeBtn = document.getElementById('remindMeBtn');
const whatsappShareBtn = document.getElementById('whatsappShareBtn');
const submitEntryBtn = document.getElementById('submitEntryBtn');

function evokeModalPopUp(dataObj) {
    selectedEventObj = dataObj;
    document.getElementById('modalHeadline').textContent = dataObj.title;
    document.getElementById('modalMetaDate').textContent = dataObj.date;
    document.getElementById('modalMetaVenue').textContent = dataObj.venue;
    document.getElementById('modalEditorialDesc').textContent = dataObj.details;

    if (dataObj.formUrl) {
        submitEntryBtn.setAttribute('href', dataObj.formUrl);
        submitEntryBtn.style.display = 'flex';
    } else {
        submitEntryBtn.setAttribute('href', 'https://docs.google.com');
    }

    if (localStorage.getItem('nrutya_reminders_enabled') === 'true') {
        remindMeBtn.classList.add('active-toggle');
        remindMeBtn.innerHTML = '<i class="fa-solid fa-bell"></i> Reminder Scheduled';
    } else {
        remindMeBtn.classList.remove('active-toggle');
        remindMeBtn.innerHTML = '<i class="fa-regular fa-bell" style="color: var(--accent-magenta);"></i> Remind Me';
    }

    // --- CAROUSEL SLIDESHOW ENGINE LOGIC ---
    const carouselWindow = document.getElementById('popupCarouselWindow');
    const fallbackIcon = document.getElementById('modalFallbackIcon');
    
    clearInterval(carouselIntervalId);
    carouselWindow.innerHTML = '';

    if (dataObj.images && dataObj.images.length > 0) {
        fallbackIcon.style.display = 'none';
        
        dataObj.images.forEach((imgUrl, idx) => {
            const imgNode = document.createElement('img');
            imgNode.src = imgUrl;
            imgNode.className = `carousel-slide-img ${idx === 0 ? 'active' : ''}`;
            imgNode.alt = `Slide Image ${idx}`;
            carouselWindow.appendChild(imgNode);
        });

        if (dataObj.images.length > 1) {
            let slideIndex = 0;
            const slides = carouselWindow.getElementsByClassName('carousel-slide-img');
            
            carouselIntervalId = setInterval(() => {
                slides[slideIndex].classList.remove('active');
                slideIndex = (slideIndex + 1) % slides.length;
                slides[slideIndex].classList.add('active');
            }, 3500);
        }
    } else {
        fallbackIcon.style.display = 'block';
    }

    backdropModal.style.display = 'flex';
    setTimeout(() => backdropModal.classList.add('active-reveal'), 10);
}

function dismissModalWindow() {
    backdropModal.classList.remove('active-reveal');
    clearInterval(carouselIntervalId); 
    setTimeout(() => backdropModal.style.display = 'none', 300);
}

window.onclick = function(event) {
    if (event.target === backdropModal) dismissModalWindow();
};

// WhatsApp Custom Intent API Hyperlink Trigger
whatsappShareBtn.addEventListener('click', () => {
    if (!selectedEventObj) return;
    const liveWebsiteUrl = window.location.href;
    const contextText = `🔥 *${selectedEventObj.title}* is happening! 🔥\n\n📢 *Details:* ${selectedEventObj.brief}\n📅 *Date:* ${selectedEventObj.date}\n📍 *Venue:* ${selectedEventObj.venue}\n\n✨ Find out more and register here:\n🌐 ${liveWebsiteUrl}`;
    const nativeEndpoint = `https://api.whatsapp.com/send?text=${encodeURIComponent(contextText)}`;
    window.open(nativeEndpoint, '_blank');
});

// Remind Me Local API Permission Schedule Toggle Switch Handler
remindMeBtn.addEventListener('click', () => {
    if (!('Notification' in window)) {
        alert('Web notifications are not fully supported by your active client agent.');
        return;
    }
    
    if (remindMeBtn.classList.contains('active-toggle')) {
        remindMeBtn.classList.remove('active-toggle');
        remindMeBtn.innerHTML = '<i class="fa-regular fa-bell" style="color: var(--accent-magenta);"></i> Remind Me';
        localStorage.setItem('nrutya_reminders_enabled', 'false');
    } else {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                remindMeBtn.classList.add('active-toggle');
                remindMeBtn.innerHTML = '<i class="fa-solid fa-bell"></i> Reminder Scheduled';
                localStorage.setItem('nrutya_reminders_enabled', 'true');
                
                const trackedTitles = eventsRegistry.map(e => e.title);
                localStorage.setItem('nrutya_seen_events', JSON.stringify(trackedTitles));
            } else {
                alert('Notification permissions are required to activate event alerts.');
            }
        });
    }
});

// Engine monitor system verifying index shifts across distinct initialization timelines
function runGlobalEventRegistryMonitor() {
    if (localStorage.getItem('nrutya_reminders_enabled') === 'true' && Notification.permission === 'granted') {
        let storedEvents = [];
        try {
            storedEvents = JSON.parse(localStorage.getItem('nrutya_seen_events')) || [];
        } catch(e) { storedEvents = []; }

        let unreadCount = 0;
        eventsRegistry.forEach(event => {
            if (!storedEvents.includes(event.title)) {
                unreadCount++;
            }
        });

        if (unreadCount > 0) {
            new Notification("Nrutya Club IISER Kolkata", {
                body: `🎉 ${unreadCount} new event details or schedules have been posted. Check them out!`,
                icon: 'logo_1.png'
            });
        }
        
        const updatedTitles = eventsRegistry.map(e => e.title);
        localStorage.setItem('nrutya_seen_events', JSON.stringify(updatedTitles));
    }
}

// Initialize Positioning System
window.addEventListener('DOMContentLoaded', () => {
    const initialActiveBtn = document.querySelector('.category-tab-btn.active');
    syncIndicatorPillPosition(initialActiveBtn);
    generateEventCardsList('upcoming');
    runGlobalEventRegistryMonitor();
});

window.addEventListener('resize', () => {
    const currentActiveBtn = document.querySelector('.category-tab-btn.active');
    syncIndicatorPillPosition(currentActiveBtn);
});

/* --- MOBILE SWIPE GESTURE CONTROLS --- */
let touchStartX = 0;
let touchEndX = 0;

function handleCategorySwipe() {
    // Do not trigger tab changes if the event details modal is open
    if (backdropModal.classList.contains('active-reveal')) return; 

    const swipeThreshold = 50; // Minimum distance in pixels to count as a swipe
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swiped Left -> Move to Next Category Tab
        activeCategoryIndex = (activeCategoryIndex + 1) % currentCategories.length;
        let targetBtn = document.querySelector(`.category-tab-btn[data-index="${activeCategoryIndex}"]`);
        if (targetBtn) targetBtn.click();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swiped Right -> Move to Previous Category Tab
        activeCategoryIndex = (activeCategoryIndex - 1 + currentCategories.length) % currentCategories.length;
        let targetBtn = document.querySelector(`.category-tab-btn[data-index="${activeCategoryIndex}"]`);
        if (targetBtn) targetBtn.click();
    }
}

// Listen for touch start anywhere on the document
document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

// Listen for touch end anywhere on the document
document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleCategorySwipe();
}, { passive: true });
