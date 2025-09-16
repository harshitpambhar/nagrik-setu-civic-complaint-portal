// ============ SIMPLIFIED FORM SUBMISSION HANDLERS ============

console.log('Connection script loading...');

// Show notification messages
function showNotification(message, type = 'info') {
    console.log('Showing notification:', message, type);
    
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

// Display success card for registration
function displaySuccessCard(data) {
    const successBox = document.getElementById('success-box');
    if (successBox) {
        successBox.innerHTML = `
            <div class="success-card">
                <div class="check-icon">✔</div>
                <h3>Registration Successful!</h3>
                <p>Hello <strong>${data.name}</strong> from <strong>${data.area}</strong>.</p>
                <p>Your account has been created successfully. You can now:</p>
                <ul>
                    <li>Submit civic complaints</li>
                    <li>Track complaint status</li>
                    <li>Receive updates via email</li>
                </ul>
                <div style="margin-top: 1rem;">
                    <a href="login.html" class="btn primary">Login Now</a>
                    <a href="index.html" class="btn secondary">Back to Home</a>
                </div>
            </div>
        `;
        successBox.style.display = 'block';
    }
}

// Registration form handler
document.addEventListener('DOMContentLoaded', function() {
    console.log('Connection script DOM loaded');
    
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        console.log('Register form found, adding submit handler');
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Register form submitted');
            
            // Validate form before submission
            if (typeof validateRegistrationForm === 'function') {
                const isValid = validateRegistrationForm();
                console.log('Form validation result:', isValid);
                
                if (!isValid) {
                    // Show a prominent error message
                    const errorMessage = '❌ Form submission blocked! Please fix the errors highlighted in red above.';
                    showNotification(errorMessage, 'error');
                    
                    // Scroll to the first error field
                    const firstError = document.querySelector('.field-error[style*="display: block"]');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                    
                    return;
                }
            } else {
                console.error('validateRegistrationForm function not found');
            }
            
            const formData = new FormData(this);
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Creating Account...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                // Simulate successful registration
                const mockData = {
                    success: true,
                    name: formData.get('name'),
                    area: formData.get('area'),
                    phone: formData.get('phone'),
                    email: formData.get('email')
                };
                
                showNotification('✅ Registration successful! Welcome to Nagrik Setu.', 'success');
                displaySuccessCard(mockData);
                this.style.display = 'none';
                
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
        });
    } else {
        console.log('Register form not found');
    }
    
    // Login form handler
    const loginForm = document.querySelector('.login-page form');
    if (loginForm) {
        console.log('Login form found, adding submit handler');
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Login form submitted');
            
            // Validate form before submission
            if (typeof validateLoginForm === 'function') {
                const isValid = validateLoginForm();
                console.log('Login validation result:', isValid);
                
                if (!isValid) {
                    const errorMessage = '❌ Login blocked! Please fix the errors highlighted in red above.';
                    showNotification(errorMessage, 'error');
                    return;
                }
            } else {
                console.error('validateLoginForm function not found');
            }
            
            const formData = new FormData(this);
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Logging in...';
            submitButton.disabled = true;
            
            // Simulate login process
            setTimeout(() => {
                showNotification('✅ Login successful! Redirecting to dashboard...', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html'; // Replace with actual dashboard URL
                }, 1500);
            }, 1000);
        });
    } else {
        console.log('Login form not found');
    }
});

console.log('Connection script loaded successfully');
