// EduVerse Login Page JavaScript

// DOM Elements
const roleCards = document.querySelectorAll('.role-tab');
const loginBtn = document.getElementById('loginBtn');
const loginForm = document.getElementById('loginForm');
const passwordToggle = document.getElementById('passwordToggle');
const passwordInput = document.getElementById('password');
const emailInput = document.getElementById('email');
const demoBtn = document.getElementById('demoBtn');
const signupLink = document.getElementById('signupLink');
const languageSelect = document.getElementById('language');

// State
let selectedRole = 'student';

// Role themes configuration
const roleThemes = {
    student: {
        name: 'Student',
        buttonText: 'Login as Student',
        theme: 'student-theme',
        redirectUrl: 'student-dashboard.html',
        demoUrl: 'student-dashboard.html'
    },
    teacher: {
        name: 'Teacher', 
        buttonText: 'Login as Teacher',
        theme: 'teacher-theme',
        redirectUrl: 'teacher-dashboard.html',
        demoUrl: 'teacher-dashboard.html'
    },
    parent: {
        name: 'Parent',
        buttonText: 'Login as Parent', 
        theme: 'parent-theme',
        redirectUrl: 'parent-dashboard.html',
        demoUrl: 'parent-dashboard.html'
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeRoleSelection();
    initializeFormHandlers();
    initializePasswordToggle();
    initializeDemoMode();
    initializeLanguageSelector();
    initializeGoogleSignIn();
    
    // Set default role
    selectRole('student');
});

// Role Selection Handler
function initializeRoleSelection() {
    roleCards.forEach(card => {
        card.addEventListener('click', function() {
            const role = this.dataset.role;
            selectRole(role);
        });
        
        // Keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const role = this.dataset.role;
                selectRole(role);
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
    });
}

function selectRole(role) {
    selectedRole = role;
    const theme = roleThemes[role];
    
    // Update active role card
    roleCards.forEach(card => {
        card.classList.remove('active', 'student', 'teacher', 'parent');
        if (card.dataset.role === role) {
            card.classList.add('active', role);
        }
    });
    
    // Update body theme
    document.body.className = theme.theme;
    
    // Update login button text
    if (loginBtn && loginBtn.querySelector('.btn-text')) {
        loginBtn.querySelector('.btn-text').textContent = theme.buttonText;
    }
    
    // Update signup link
    if (signupLink) {
        signupLink.textContent = `Sign up as ${theme.name}`;
    }
    
    // Add visual feedback
    addRippleEffect(document.querySelector(`[data-role="${role}"]`));
}

// Form Handlers
function initializeFormHandlers() {
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Real-time validation
    if (emailInput) emailInput.addEventListener('blur', validateEmail);
    if (passwordInput) passwordInput.addEventListener('blur', validatePassword);
    
    // Clear errors on input
    if (emailInput) emailInput.addEventListener('input', clearFieldError);
    if (passwordInput) passwordInput.addEventListener('input', clearFieldError);
}

function handleLogin() {
    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    const remember = document.getElementById('remember') ? document.getElementById('remember').checked : false;
    
    // Validate inputs
    let isValid = true;
    
    if (!validateEmail()) isValid = false;
    if (!validatePassword()) isValid = false;
    
    if (!isValid) return;
    
    // Show loading state
    showLoadingState();
    
    // Simulate login process
    setTimeout(() => {
        hideLoadingState();
        
        // In a real app, this would make an API call
        console.log('Login attempt:', {
            email,
            role: selectedRole,
            remember
        });
        
        // Simulate successful login
        showSuccessMessage();
        
        // Redirect after delay
        setTimeout(() => {
            window.location.href = roleThemes[selectedRole].redirectUrl;
        }, 1500);
        
    }, 2000);
}

function validateEmail() {
    if (!emailInput) return true;
    
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const formGroup = emailInput.closest('.form-group');
    
    if (!email) {
        showFieldError(formGroup, 'Email is required');
        return false;
    } else if (!emailRegex.test(email)) {
        showFieldError(formGroup, 'Please enter a valid email address');
        return false;
    } else {
        showFieldSuccess(formGroup);
        return true;
    }
}

function validatePassword() {
    if (!passwordInput) return true;
    
    const password = passwordInput.value;
    const formGroup = passwordInput.closest('.form-group');
    
    if (!password) {
        showFieldError(formGroup, 'Password is required');
        return false;
    } else if (password.length < 6) {
        showFieldError(formGroup, 'Password must be at least 6 characters');
        return false;
    } else {
        showFieldSuccess(formGroup);
        return true;
    }
}

function showFieldError(formGroup, message) {
    if (!formGroup) return;
    
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    
    let errorMsg = formGroup.querySelector('.input-error');
    if (!errorMsg) {
        errorMsg = document.createElement('div');
        errorMsg.className = 'input-error';
        formGroup.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
}

function showFieldSuccess(formGroup) {
    if (!formGroup) return;
    
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    
    const errorMsg = formGroup.querySelector('.input-error');
    if (errorMsg) {
        errorMsg.style.display = 'none';
    }
}

function clearFieldError() {
    const formGroup = this.closest('.form-group');
    if (!formGroup) return;
    
    formGroup.classList.remove('error', 'success');
    
    const errorMsg = formGroup.querySelector('.input-error');
    if (errorMsg) {
        errorMsg.style.display = 'none';
    }
}

// Password Toggle
function initializePasswordToggle() {
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            }
        });
    }
}

// Loading States
function showLoadingState() {
    if (loginBtn) {
        const btnText = loginBtn.querySelector('.btn-text');
        const btnLoader = loginBtn.querySelector('.btn-loader');
        
        if (btnText) btnText.style.display = 'none';
        if (btnLoader) btnLoader.style.display = 'flex';
        loginBtn.disabled = true;
    }
}

function hideLoadingState() {
    if (loginBtn) {
        const btnText = loginBtn.querySelector('.btn-text');
        const btnLoader = loginBtn.querySelector('.btn-loader');
        
        if (btnText) {
            btnText.style.display = 'block';
            btnText.textContent = roleThemes[selectedRole].buttonText;
        }
        if (btnLoader) btnLoader.style.display = 'none';
        loginBtn.disabled = false;
    }
}

function showSuccessMessage() {
    if (loginBtn) {
        const btnText = loginBtn.querySelector('.btn-text');
        const btnLoader = loginBtn.querySelector('.btn-loader');
        
        if (btnText) {
            btnText.style.display = 'block';
            btnText.textContent = 'Login Successful!';
        }
        if (btnLoader) btnLoader.style.display = 'none';
        loginBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    }
}

// Demo Mode
function initializeDemoMode() {
    if (demoBtn) {
        demoBtn.addEventListener('click', function() {
            // Show loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading Demo...';
            this.disabled = true;
            
            // Simulate demo loading
            setTimeout(() => {
                window.location.href = roleThemes[selectedRole].demoUrl;
            }, 1500);
        });
    }
}

// Language Selector
function initializeLanguageSelector() {
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            // In a real app, this would change the language
            console.log('Language changed to:', this.value);
        });
    }
}

// Google Sign In
function initializeGoogleSignIn() {
    const googleBtn = document.getElementById('googleBtn');
    const microsoftBtn = document.getElementById('microsoftBtn');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            // Simulate Google sign-in
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
            this.disabled = true;
            
            setTimeout(() => {
                window.location.href = roleThemes[selectedRole].redirectUrl;
            }, 2000);
        });
    }
    
    if (microsoftBtn) {
        microsoftBtn.addEventListener('click', function() {
            // Simulate Microsoft sign-in
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
            this.disabled = true;
            
            setTimeout(() => {
                window.location.href = roleThemes[selectedRole].redirectUrl;
            }, 2000);
        });
    }
}

// Ripple Effect
function addRippleEffect(element) {
    if (!element) return;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.marginLeft = '-10px';
    ripple.style.marginTop = '-10px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn-loader {
        display: none;
        align-items: center;
        justify-content: center;
    }
    
    .input-error {
        color: #ef4444;
        font-size: 0.8rem;
        margin-top: 0.25rem;
        display: none;
    }
    
    .form-group.error .input-error {
        display: block;
    }
    
    .form-group.error input {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .form-group.success input {
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
`;
document.head.appendChild(style);
