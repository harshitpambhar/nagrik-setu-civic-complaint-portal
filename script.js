
document.addEventListener('DOMContentLoaded', function () {
    // Typing animation for slogan
    const typingSlogan = document.getElementById('typing-slogan');
    const cursor = document.getElementById('cursor');
    if (typingSlogan && cursor) {
        const slogans = [
            'Empowering Citizens. Resolving Complaints.',
            'Building Better Cities Together.',
            'Transparent Governance for All.',
            'Your Voice. Our Action.',
            'Smart Solutions for Civic Issues.',
            'Connecting Citizens & Authorities.',
            'Fast, Secure, and Accountable.',
            'Digital Bridge for Better Communities.',
            'Your Issues, Our Priority.',
            'Innovation in Civic Engagement.'
        ];
        let sloganIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        let deleteSpeed = 50;
        let pauseTime = 2000;
        function typeWriter() {
            const currentSlogan = slogans[sloganIndex];
            if (!isDeleting) {
                typingSlogan.textContent = currentSlogan.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentSlogan.length) {
                    setTimeout(() => {
                        isDeleting = true;
                        typeWriter();
                    }, pauseTime);
                    return;
                }
                setTimeout(typeWriter, typeSpeed);
            } else {
                typingSlogan.textContent = currentSlogan.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex < 0) {
                    isDeleting = false;
                    sloganIndex = (sloganIndex + 1) % slogans.length;
                    setTimeout(typeWriter, 500);
                    return;
                }
                setTimeout(typeWriter, deleteSpeed);
            }
        }
        // Cursor blinking (in addition to CSS for reliability)
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
        typeWriter();
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form enhancement functions
    enhanceFormFields();
    initializeValidation();

    // Initialize track complaint if on track page
    if (window.location.pathname.includes('track-complaint')) {
        initializeTrackComplaint();
    }
});
// === FAQ Toggle ===
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.classList.toggle('active');
    });
});

// === Popup Notification ===
function showNotification(msg) {
    const popup = document.getElementById('notification');
    popup.textContent = msg;
    popup.style.display = 'block';
    setTimeout(() => popup.style.display = 'none', 3000);
}
window.addEventListener('load', () => {
    // Custom welcome message based on page
    const path = window.location.pathname;
    let message = 'Welcome to the portal!';
    if (path.endsWith('index.html') || path === '/' || path === '/index.html') {
        message = 'Welcome to the portal!';
    } else if (path.endsWith('register.html')) {
        message = 'Welcome to the registration portal!';
    } else if (path.endsWith('login.html')) {
        message = 'Welcome to the login portal!';
    } else if (path.endsWith('register-complaint.html')) {
        message = 'Welcome to the complaint registration portal!';
    } else if (path.endsWith('track-complaint.html')) {
        message = 'Welcome to the complaint tracking portal!';
    } else if (path.endsWith('official-login.html')) {
        message = 'Welcome to the official login portal!';
    } else if (path.endsWith('about.html')) {
        message = 'Welcome to the about section!';
    } else if (path.endsWith('contact.html')) {
        message = 'Welcome to the contact section!';
    } else if (path.endsWith('faq.html')) {
        message = 'Welcome to the FAQ section!';
    }
    showNotification(message);
});

// === Slider ===
let current = 0;
const slides = document.querySelectorAll('.slide');

function initializeSlider() {
    if (slides.length > 0) {
        // Ensure only the first slide is active initially
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index === 0) {
                slide.classList.add('active');
            }
        });

        // Start the slider interval
        setInterval(() => {
            if (slides.length > 1) {
                slides[current].classList.remove('active');
                current = (current + 1) % slides.length;
                slides[current].classList.add('active');
            }
        }, 3000);
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSlider);


// ============ FORM ENHANCEMENT FUNCTIONS ============

function enhanceFormFields() {
    // Add password strength meter to registration form
    const passwordField = document.getElementById('password');
    if (passwordField && !document.getElementById('password-strength')) {
        const passwordContainer = passwordField.parentNode;

        // Create strength meter container
        const strengthContainer = document.createElement('div');
        strengthContainer.className = 'password-strength-container';
        strengthContainer.innerHTML = `
            <div class="strength-meter-wrapper">
                <progress id="password-strength" value="0" max="100"></progress>
                <span id="strength-text">Very Weak</span>
            </div>
            <div class="password-requirements">
                <small>Password must contain: at least 8 characters, uppercase, lowercase, and number</small>
            </div>
        `;

        passwordContainer.appendChild(strengthContainer);
    }

    // Add terms error display
    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox && !document.getElementById('terms-error')) {
        const termsContainer = termsCheckbox.parentNode;
        const termsError = document.createElement('div');
        termsError.id = 'terms-error';
        termsError.className = 'field-error';
        termsError.textContent = 'You must agree to the terms and conditions';
        termsError.style.display = 'none';
        termsContainer.appendChild(termsError);
    }
}

function initializeValidation() {
    // Add password strength meter if password field exists
    const passwordField = document.getElementById('password');
    if (passwordField) {
        passwordField.addEventListener('input', function () {
            updatePasswordStrength(this.value);
        });
    }

    // Add real-time validation for all input fields
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            const fieldName = this.name || this.id;
            switch (fieldName) {
                case 'name':
                    validateField(this, validateName);
                    break;
                case 'email':
                    validateField(this, validateEmail);
                    break;
                case 'phone':
                    validateField(this, validatePhone);
                    break;
                case 'password':
                    validateField(this, validatePassword);
                    break;
                case 'area':
                    validateField(this, validateArea);
                    break;
            }
        });
    });
}

// ============ UTILITY FUNCTIONS ============

// Show notification messages
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);

    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        hideNotification(notification);
    });
}

// Hide notification
function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// ============ PAGE-SPECIFIC FUNCTIONALITY ============

// Track complaint functionality
function initializeTrackComplaint() {
    const trackForm = document.querySelector('#track-form');
    if (trackForm) {
        trackForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const trackingNumber = document.getElementById('tracking-number').value.trim();
            if (!trackingNumber) {
                showNotification('Please enter a tracking number', 'error');
                return;
            }

            // Simulate tracking lookup
            showNotification('Searching for complaint...', 'info');

            setTimeout(() => {
                // Simulate found complaint
                const resultContainer = document.getElementById('tracking-result');
                if (resultContainer) {
                    resultContainer.innerHTML = `
                        <div class="success-card">
                            <h3>Complaint Found!</h3>
                            <p><strong>Tracking Number:</strong> ${trackingNumber}</p>
                            <p><strong>Status:</strong> <span style="color: #28a745;">In Progress</span></p>
                            <p><strong>Category:</strong> Road Damage</p>
                            <p><strong>Location:</strong> MG Road, Near Bus Stop</p>
                            <p><strong>Submitted:</strong> 15 days ago</p>
                            <p><strong>Expected Resolution:</strong> Within 7 days</p>
                        </div>
                    `;
                    resultContainer.style.display = 'block';
                }
            }, 1500);
        });
    }
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize track complaint if on track page
    if (window.location.pathname.includes('track-complaint')) {
        initializeTrackComplaint();
    }
});
