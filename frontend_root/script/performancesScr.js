const sortBtn = document.getElementById('sortBtn');
        const sortPopup = document.getElementById('sortPopup');
        const sortOptions = document.querySelectorAll('.sort-option');
        const videoGrid = document.getElementById('videoGrid');
        const videoCards = Array.from(document.querySelectorAll('.video-card'));
        const videoModal = document.getElementById('videoModal');
        const closeModalBtn = document.getElementById('closeModalBtn');
        const modalIframe = document.getElementById('modalIframe');

        // Balanced palette of non-white solid light tones
        const fallbackSolidColors = [
            '#90caf9', // Light Soft Blue
            '#f48fb1', // Soft Light Rose
            '#a5d6a7', // Pastel Pale Green
            '#ffcc80', // Soft Muted Orange/Peach
            '#ce93d8', // Light Pastel Purple
            '#80deea'  // Gentle Soft Aqua Cyan
        ];

        // Process cards to detect missing or unuploaded images and replace them with solid color tones
        function setupThumbnailColors() {
            document.querySelectorAll('.video-card').forEach((card, index) => {
                const img = card.querySelector('.thumbnail-img');
                const srcValue = img.getAttribute('src');

                // Check if src is unuploaded, completely blank, or generic placeholder '#'
                if (!srcValue || srcValue.trim() === '' || srcValue.trim() === '#') {
                    attachSolidBackground(card, img, index);
                } else {
                    // Check if an assigned path configuration breaks over image parsing errors
                    img.onerror = function() {
                        attachSolidBackground(card, img, index);
                    };
                }
            });
        }

        function attachSolidBackground(card, img, index) {
            img.style.display = 'none'; // Clear the broken resource node window
            card.classList.add('has-fallback-thumb');

            // Select color based on grid sequence indexing rules
            const chosenColor = fallbackSolidColors[index % fallbackSolidColors.length];

            const colorWrapper = document.createElement('div');
            colorWrapper.className = 'solid-color-fallback';
            colorWrapper.style.backgroundColor = chosenColor;

            card.appendChild(colorWrapper);
        }

        // Toggle custom pop-up dropdown matching layout drawing
        sortBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sortPopup.classList.toggle('show');
        });

        // Close sort options popup clicking anywhere else
        document.addEventListener('click', () => {
            sortPopup.classList.remove('show');
        });

        // Dynamic sorting algorithm array control
        sortOptions.forEach(option => {
            option.addEventListener('click', function() {
                sortOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
                
                const order = this.getAttribute('data-order');
                sortVideos(order);
            });
        });

        function sortVideos(order) {
            const sorted = videoCards.sort((a, b) => {
                const dateA = new Date(a.getAttribute('data-timestamp'));
                const dateB = new Date(b.getAttribute('data-timestamp'));
                return order === 'latest' ? dateB - dateA : dateA - dateB;
            });

            // Re-render structural node cards array cleanly
            videoGrid.innerHTML = '';
            sorted.forEach(card => videoGrid.appendChild(card));
            attachCardClickEvents(); // Rebind video modal links triggers to nodes
        }

        // Handle Video Overlay Display & Exit mechanisms
        function attachCardClickEvents() {
            document.querySelectorAll('.video-card').forEach(card => {
                card.onclick = function() {
                    const videoSrc = this.getAttribute('data-video');
                    modalIframe.src = videoSrc;
                    videoModal.classList.add('open');
                };
            });
        }

        closeModalBtn.addEventListener('click', () => {
            videoModal.classList.remove('open');
            modalIframe.src = ''; // Break buffer loading thread instantly on exit
        });
// Initialize elements setup loops
setupThumbnailColors();

// Set default sorting to 'latest'
sortVideos('latest'); 

const defaultSortOption = document.querySelector('.sort-option[data-order="latest"]');
if (defaultSortOption) {
    document.querySelectorAll('.sort-option').forEach(opt => opt.classList.remove('active'));
    defaultSortOption.classList.add('active');
}

// Note: attachCardClickEvents() is now handled inside sortVideos() so it was removed from here.
        