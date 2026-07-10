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

        document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactForm");
    const submitButton = form.querySelector(".btn-submit");
    const statusMessage = document.getElementById("form-status"); // Target the new div
    
    // Your Google Apps Script deployment URL
    const scriptURL = "https://script.google.com/macros/s/AKfycbyriLM8dIH6u7GVWOqDEGmB3czWgypS393o0_IoNi7dH9jPznifEowzeZjsIvxqFVtetA/exec";

    form.addEventListener("submit", e => {
        e.preventDefault(); 
        
        // Hide any previous messages
        statusMessage.className = "form-status-message hidden";
        
        const originalBtnText = submitButton.innerHTML;
        submitButton.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
        submitButton.disabled = true;

        const formData = new FormData(form);

        fetch(scriptURL, { method: "POST", body: formData })
            .then(response => response.json()) // Parse the JSON from Apps Script
            .then(data => {
                if (data.result === "success") {
                    // Actual Success
                    statusMessage.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent.';
                    statusMessage.className = "form-status-message success";
                    form.reset(); 
                } else {
                    // Script ran but threw an error internally
                    console.error("Apps Script Error:", data.error);
                    statusMessage.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Oops! Something went wrong on the server.';
                    statusMessage.className = "form-status-message error";
                }
                
                submitButton.innerHTML = originalBtnText;
                submitButton.disabled = false;
                
                // Hide success message after 5 seconds
                if(data.result === "success") {
                    setTimeout(() => { statusMessage.className = "form-status-message hidden"; }, 5000);
                }
            })
            .catch(error => {
                // Network or fetch error
                console.error("Network Error!", error.message);
                statusMessage.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Network error. Please try again.';
                statusMessage.className = "form-status-message error";
                
                submitButton.innerHTML = originalBtnText;
                submitButton.disabled = false;
            });
    });
});