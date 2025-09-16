// ============ SIMPLIFIED FORM VALIDATION SYSTEM ============

console.log('Validation script loading...');

// Password strength meter functionality
function checkPasswordStrength(password) {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) {
        strength += 25;
    }
    
    // Uppercase check
    if (/[A-Z]/.test(password)) {
        strength += 25;
    }
    
    // Lowercase check
    if (/[a-z]/.test(password)) {
        strength += 25;
    }
    
    // Number check
    if (/\d/.test(password)) {
        strength += 25;
    }
    
    return { strength: Math.min(strength, 100) };
}

function updatePasswordStrength(password) {
    const strengthMeter = document.getElementById('password-strength');
    const strengthText = document.getElementById('strength-text');
    
    if (!strengthMeter || !strengthText) {
        console.log('Password strength elements not found');
        return;
    }
    
    const result = checkPasswordStrength(password);
    
    // Update strength meter
    strengthMeter.value = result.strength;
    
    // Update strength text and color
    let strengthLabel = '';
    let color = '';
    
    if (result.strength < 25) {
        strengthLabel = 'Very Weak';
        color = '#dc3545';
    } else if (result.strength < 50) {
        strengthLabel = 'Weak';
        color = '#fd7e14';
    } else if (result.strength < 75) {
        strengthLabel = 'Medium';
        color = '#ffc107';
    } else if (result.strength < 100) {
        strengthLabel = 'Strong';
        color = '#28a745';
    } else {
        strengthLabel = 'Very Strong';
        color = '#20c997';
    }
    
    strengthText.textContent = strengthLabel;
    strengthText.style.color = color;
    strengthMeter.style.accentColor = color;
    
    console.log('Password strength updated:', strengthLabel, result.strength);
}

// Simple validation functions
function validateName(name) {
    if (name.trim() === '') {
        return { isValid: false, message: 'Name is required' };
    }
    if (name.length < 2) {
        return { isValid: false, message: 'Name must be at least 2 characters long' };
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        return { isValid: false, message: 'Name can only contain letters and spaces' };
    }
    return { isValid: true, message: '' };
}

function validateEmail(email) {
    if (email.trim() === '') {
        return { isValid: false, message: 'Email is required' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { isValid: false, message: 'Please enter a valid email address' };
    }
    return { isValid: true, message: '' };
}

function validatePhone(phone) {
    if (phone.trim() === '') {
        return { isValid: false, message: 'Phone number is required' };
    }
    if (!/^\d{10}$/.test(phone.replace(/\s/g, ''))) {
        return { isValid: false, message: 'Phone number must be exactly 10 digits' };
    }
    return { isValid: true, message: '' };
}

function validatePassword(password) {
    if (password.trim() === '') {
        return { isValid: false, message: 'Password is required' };
    }
    if (password.length < 8) {
        return { isValid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/\d/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one number' };
    }
    return { isValid: true, message: '' };
}

function validateArea(area) {
    if (area.trim() === '') {
        return { isValid: false, message: 'Area/Locality is required' };
    }
    if (area.length < 2) {
        return { isValid: false, message: 'Area must be at least 2 characters long' };
    }
    return { isValid: true, message: '' };
}

// Simple field validation with clear error display
function validateField(field, validationFunction) {
    const value = field.value;
    const result = validationFunction(value);
    
    console.log('Validating field:', field.id, 'Value:', value, 'Result:', result);
    
    // Find or create error element
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.display = 'block';
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.style.fontWeight = '500';
        errorElement.style.backgroundColor = '#f8d7da';
        errorElement.style.border = '1px solid #f5c6cb';
        errorElement.style.padding = '0.5rem';
        errorElement.style.borderRadius = '4px';
        errorElement.style.marginBottom = '0.5rem';
        field.parentNode.appendChild(errorElement);
    }
    
    if (!result.isValid) {
        field.classList.add('error');
        field.classList.remove('valid');
        errorElement.textContent = result.message;
        errorElement.style.display = 'block';
        console.log('Field error:', field.id, result.message);
        return false;
    } else {
        field.classList.remove('error');
        field.classList.add('valid');
        errorElement.style.display = 'none';
        console.log('Field valid:', field.id);
        return true;
    }
}

// Form validation for registration
function validateRegistrationForm() {
    console.log('Validating registration form...');
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const area = document.getElementById('area');
    const terms = document.getElementById('terms');
    
    if (!name || !email || !phone || !password || !area || !terms) {
        console.error('Required form elements not found');
        return false;
    }
    
    let isValid = true;
    
    // Validate each field
    isValid = validateField(name, validateName) && isValid;
    isValid = validateField(email, validateEmail) && isValid;
    isValid = validateField(phone, validatePhone) && isValid;
    isValid = validateField(password, validatePassword) && isValid;
    isValid = validateField(area, validateArea) && isValid;
    
    // Check terms agreement
    if (!terms.checked) {
        const termsError = document.getElementById('terms-error');
        if (termsError) {
            termsError.style.display = 'block';
            termsError.style.color = '#dc3545';
            termsError.textContent = 'You must agree to the terms and conditions';
        }
        isValid = false;
        console.log('Terms not agreed');
    } else {
        const termsError = document.getElementById('terms-error');
        if (termsError) {
            termsError.style.display = 'none';
        }
    }
    
    console.log('Form validation result:', isValid);
    return isValid;
}

// Form validation for login
function validateLoginForm() {
    console.log('Validating login form...');
    
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    
    if (!email || !password) {
        console.error('Required login form elements not found');
        return false;
    }
    
    let isValid = true;
    
    isValid = validateField(email, validateEmail) && isValid;
    
    if (password.value.trim() === '') {
        const passwordError = password.parentNode.querySelector('.field-error');
        if (passwordError) {
            passwordError.textContent = 'Password is required';
            passwordError.style.display = 'block';
            passwordError.style.color = '#dc3545';
        }
        password.classList.add('error');
        isValid = false;
    } else {
        password.classList.remove('error');
        const passwordError = password.parentNode.querySelector('.field-error');
        if (passwordError) {
            passwordError.style.display = 'none';
        }
    }
    
    console.log('Login validation result:', isValid);
    return isValid;
}

// Initialize validation on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing validation...');
    
    // Add password strength meter if password field exists
    const passwordField = document.getElementById('password');
    if (passwordField) {
        console.log('Password field found, adding strength meter');
        addPasswordStrengthMeter(passwordField);
        
        passwordField.addEventListener('input', function() {
            console.log('Password input:', this.value);
            updatePasswordStrength(this.value);
        });
    } else {
        console.log('Password field not found');
    }
    
    // Add real-time validation for all input fields
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="password"]');
    console.log('Found input fields:', inputs.length);
    
    inputs.forEach(input => {
        console.log('Adding validation to field:', input.id);
        
        // Validate on input (real-time)
        input.addEventListener('input', function() {
            const fieldName = this.name || this.id;
            console.log('Input event for field:', fieldName, 'Value:', this.value);
            
            switch(fieldName) {
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
                default:
                    console.log('Unknown field:', fieldName);
            }
        });
        
        // Also validate on blur
        input.addEventListener('blur', function() {
            const fieldName = this.name || this.id;
            console.log('Blur event for field:', fieldName);
            
            switch(fieldName) {
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
    
    console.log('Validation initialization complete');
});

// Function to add password strength meter
function addPasswordStrengthMeter(passwordField) {
    const passwordContainer = passwordField.parentNode;
    
    // Check if strength meter already exists
    if (document.getElementById('password-strength')) {
        console.log('Password strength meter already exists');
        return;
    }
    
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
    console.log('Password strength meter added successfully');
}

console.log('Validation script loaded successfully');