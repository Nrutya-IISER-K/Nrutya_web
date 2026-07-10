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

        // Example logic for dynamically rendering announcements
const announcementListContainer = document.querySelector('.announcement-list');

// Imagine this is your data fetched from a database or API
const announcementsData = []; 

function renderAnnouncements() {
    // Check if the array is empty
    if (announcementsData.length === 0) {
        announcementListContainer.innerHTML = `
            <div class="no-announcements-message">
                No Announcements
            </div>
        `;
        return;
    }

    // If there is data, render the cards (using your existing card structure)
    let htmlContent = '';
    announcementsData.forEach(item => {
        htmlContent += `
            <div class="announcement-card">
                <div class="card-meta">
                    <span class="meta-date">${item.date}</span>
                    <span class="meta-badge">${item.type}</span>
                </div>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
    });
    
    announcementListContainer.innerHTML = htmlContent;
}

// Call the function on page load
renderAnnouncements();