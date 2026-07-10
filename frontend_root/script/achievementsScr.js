// Dropdown Toggle Utility for Navigation
        const menuDotsBtn = document.querySelector('.menu-dots-btn');
        const dropdownContent = document.querySelector('.dropdown-content');

        menuDotsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', () => {
            dropdownContent.style.display = 'none';
        });

        document.addEventListener("DOMContentLoaded", () => {
            const sliders = document.querySelectorAll(".card-image-slider");

            sliders.forEach((slider) => {
                const images = slider.querySelectorAll("img");
                if (images.length <= 1) return; // Skip if card contains only 1 photo

                let currentIndex = 0;
                
                // Rotates images safely every 3.5 seconds
                setInterval(() => {
                    images[currentIndex].classList.remove("active");
                    currentIndex = (currentIndex + 1) % images.length;
                    images[currentIndex].classList.add("active");
                }, 3500); 
            });
        });