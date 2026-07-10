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