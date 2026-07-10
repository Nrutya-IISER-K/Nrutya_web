document.addEventListener("DOMContentLoaded", function() {
            
            // ==========================================
// DROPDOWN MENU CLICK & HOVER LOGIC
// ==========================================
const dropdownWrapper = document.querySelector('.more-menu-dropdown');
const menuBtn = document.querySelector('.menu-dots-btn');

if (dropdownWrapper && menuBtn) {
    // Toggle the 'clicked-open' class when clicking the three dots
    menuBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevents the document click listener from firing immediately
        dropdownWrapper.classList.toggle('clicked-open');
    });

    // Close the menu if the user clicks anywhere outside of it
    document.addEventListener('click', function(event) {
        if (!dropdownWrapper.contains(event.target)) {
            dropdownWrapper.classList.remove('clicked-open');
        }
    });
}

            // ==========================================
            // LOGO FLIGHT ANIMATION LOGIC
            // ==========================================
            const splashContainer = document.getElementById("splash-container");
            const splashLogo = document.getElementById("splash-logo");
            const appContent = document.getElementById("app-content");
            const headerTargetLogo = document.getElementById("header-logo-target");

            // Check if the splash screen has already been played in this session
            if (!sessionStorage.getItem('splashPlayed')) {
            // Briefly hide the real logo so the flying logo can take its place seamlessly
            headerTargetLogo.style.opacity = '0';

            // 1. Kick off the cinematic entrance
            setTimeout(() => {
                splashLogo.classList.add("animate-in");
            }, 100);

            // 2. Pause/Pulse (Wait 1.5 seconds)
            setTimeout(() => {
                splashLogo.classList.add("pause");
            }, 1100);

            // 3. Calculate target trajectory and fly out
            setTimeout(() => {
                // Fade in the actual website background
                appContent.classList.add("visible"); 

                // Get geometric bounds to calculate dynamic translation
                const targetRect = headerTargetLogo.getBoundingClientRect();
                const splashRect = splashLogo.getBoundingClientRect();

                // Calculate required shrink scale
                const scaleX = targetRect.width / splashRect.width;
                const scaleY = targetRect.height / splashRect.height;
                const scale = Math.min(scaleX, scaleY); 

                // Calculate X/Y distance to target's center point
                const translateX = (targetRect.left + targetRect.width / 2) - (splashRect.left + splashRect.width / 2);
                const translateY = (targetRect.top + targetRect.height / 2) - (splashRect.top + splashRect.height / 2);

                // Apply CSS Transform flight
                splashLogo.classList.add("fly-to-corner");
                splashLogo.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
                splashLogo.style.filter = 'drop-shadow(0 0 0px rgba(212, 175, 55, 0)) blur(0px)'; 
                
                // Dim the dark overlay
                splashContainer.classList.add("hide-bg");

                // 4. Clean up DOM when animation finishes
                setTimeout(() => {
                    headerTargetLogo.style.opacity = '1';
                    splashContainer.style.display = 'none'; // Completely remove overlay
                }, 1200); // 1.2s matches the CSS transition time

            }, 1600); // Wait in center for roughly 1 second before flying

            } else {
    // IF IT HAS PLAYED ALREADY: Skip animation entirely
           splashContainer.style.display = 'none';
           appContent.classList.add("visible");
           headerTargetLogo.style.opacity = '1';
           }

            // ==========================================
            // CAROUSEL LOGIC WITH SEAMLESS CROSSFADE
            // ==========================================
            const slides = document.querySelectorAll(".carousel-slide");
            const placeholder = document.getElementById("carousel-placeholder");
            
            // Hide the text placeholder so it doesn't bleed through
            if (slides.length > 0 && placeholder) {
                placeholder.style.display = 'none';
            }

            if (slides.length > 1) {
                let currentSlideIndex = 0;
                setInterval(() => {
                    // Reset the 'prev' state for all slides
                    slides.forEach(s => s.classList.remove("prev"));
                    
                    // The old slide becomes 'prev' to stay fully visible beneath the fading new image
                    slides[currentSlideIndex].classList.remove("active");
                    slides[currentSlideIndex].classList.add("prev");
                    
                    // Move to the next slide and make it 'active' to fade in on top
                    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
                    slides[currentSlideIndex].classList.add("active");
                }, 4000);
            }
        });
        // ==========================================
// ANNOUNCEMENT BAR CLICK LOGIC
// ==========================================
const announcementBar = document.querySelector('.single-footer-bar');

if (announcementBar) {
    announcementBar.addEventListener('click', () => {
        // Redirects the user to the announcements page
        window.location.href = 'pages/announcements.html';
    });
}