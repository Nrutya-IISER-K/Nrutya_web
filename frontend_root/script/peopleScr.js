document.addEventListener('DOMContentLoaded', () => {
        const tabs = document.querySelectorAll('.tab-btn');
        const sections = document.querySelectorAll('.cards-section');
        let currentIdx = 0;

        function switchTab(index) {
            if (index < 0 || index >= tabs.length) return;
            
            currentIdx = index;

            // Handle Tab active statuses
            tabs.forEach((tab, idx) => {
                if (idx === currentIdx) {
                    tab.classList.add('active');
                    tab.setAttribute('aria-selected', 'true');
                    tab.focus();
                } else {
                    tab.classList.remove('active');
                    tab.setAttribute('aria-selected', 'false');
                }
            });

            // Handle switching displayed section layouts
            const targetId = tabs[currentIdx].getAttribute('data-target');
            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        }

        // Mouse click handler
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                switchTab(index);
            });
        });

        // Keyboard Left & Right Arrow Key Events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                let nextIdx = (currentIdx + 1) % tabs.length;
                switchTab(nextIdx);
            } else if (e.key === 'ArrowLeft') {
                let prevIdx = (currentIdx - 1 + tabs.length) % tabs.length;
                switchTab(prevIdx);
            }
        });
    });