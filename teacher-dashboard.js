// Teacher Dashboard JavaScript - EduVerse
class TeacherDashboard {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.initializeCharts();
        this.loadDashboardData();
    }

    init() {
        // Initialize mobile menu functionality
        this.setupMobileMenu();
        
        // Initialize navigation
        this.setupNavigation();
        
        // Initialize tooltips and interactions
        this.setupInteractions();
        
        // Initialize real-time updates
        this.startRealTimeUpdates();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', this.toggleMobileMenu.bind(this));
        }

        // Navigation items
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', this.handleNavigation.bind(this));
        });

        // Quick action cards
        const actionCards = document.querySelectorAll('.action-card');
        actionCards.forEach(card => {
            card.addEventListener('click', this.handleQuickAction.bind(this));
        });

        // Search functionality
        const searchInput = document.querySelector('.search-container input');
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearch.bind(this));
        }

        // Notification button
        const notificationBtn = document.querySelector('.notification-btn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', this.toggleNotifications.bind(this));
        }

        // Calendar navigation
        const calendarNavs = document.querySelectorAll('.calendar-nav');
        calendarNavs.forEach(nav => {
            nav.addEventListener('click', this.handleCalendarNavigation.bind(this));
        });

        // Contact buttons for at-risk students
        const contactBtns = document.querySelectorAll('.contact-btn');
        contactBtns.forEach(btn => {
            btn.addEventListener('click', this.handleContactStudent.bind(this));
        });

        // Schedule action buttons
        const scheduleActions = document.querySelectorAll('.schedule-action');
        scheduleActions.forEach(btn => {
            btn.addEventListener('click', this.handleScheduleAction.bind(this));
        });
    }

    setupMobileMenu() {
        const sidebar = document.querySelector('.left-sidebar');
        const overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1001;
            display: none;
        `;
        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => {
            this.closeMobileMenu();
        });
    }

    toggleMobileMenu() {
        const sidebar = document.querySelector('.left-sidebar');
        const overlay = document.querySelector('.mobile-overlay');
        
        if (sidebar.classList.contains('active')) {
            this.closeMobileMenu();
        } else {
            sidebar.classList.add('active');
            overlay.style.display = 'block';
        }
    }

    closeMobileMenu() {
        const sidebar = document.querySelector('.left-sidebar');
        const overlay = document.querySelector('.mobile-overlay');
        
        sidebar.classList.remove('active');
        overlay.style.display = 'none';
    }

    handleNavigation(event) {
        event.preventDefault();
        
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to clicked item
        event.currentTarget.classList.add('active');
        
        // Get the page data attribute
        const page = event.currentTarget.dataset.page;
        
        // Handle navigation based on page
        this.navigateToPage(page);
        
        // Close mobile menu if open
        this.closeMobileMenu();
    }

    navigateToPage(page) {
        // This would typically load different content
        // For now, we'll just show a notification
        this.showNotification(`Navigating to ${page.charAt(0).toUpperCase() + page.slice(1)} page`, 'info');
        
        // In a real application, you would:
        // 1. Hide current content
        // 2. Load new content via AJAX or show/hide sections
        // 3. Update URL if using SPA routing
    }

    handleQuickAction(event) {
        const actionType = event.currentTarget.classList[1]; // get second class name
        
        switch(actionType) {
            case 'add-lecture':
                this.showModal('Add New Lecture', this.createLectureForm());
                break;
            case 'create-quiz':
                this.showModal('Create Quiz/Assignment', this.createQuizForm());
                break;
            case 'post-announcement':
                this.showModal('Post Announcement', this.createAnnouncementForm());
                break;
            case 'schedule-lecture':
                this.showModal('Schedule Lecture', this.createScheduleForm());
                break;
        }
    }

    handleSearch(event) {
        const query = event.target.value.toLowerCase();
        
        if (query.length > 2) {
            // Simulate search results
            this.showSearchResults(query);
        } else {
            this.hideSearchResults();
        }
    }

    showSearchResults(query) {
        // Create search results dropdown
        let resultsContainer = document.querySelector('.search-results');
        
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.className = 'search-results';
            resultsContainer.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 0.5rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                max-height: 300px;
                overflow-y: auto;
                z-index: 1000;
            `;
            document.querySelector('.search-container').appendChild(resultsContainer);
        }

        // Mock search results
        const mockResults = [
            { type: 'student', name: 'Isha Sharma', detail: 'Grade: 96.5%' },
            { type: 'student', name: 'Rohan Patel', detail: 'Grade: 94.2%' },
            { type: 'lecture', name: 'Calculus II', detail: 'Math Department' },
            { type: 'assignment', name: 'Physics Quiz', detail: 'Due: Tomorrow' }
        ].filter(item => item.name.toLowerCase().includes(query));

        resultsContainer.innerHTML = mockResults.map(result => `
            <div class="search-result-item" style="padding: 12px; border-bottom: 1px solid #f3f4f6; cursor: pointer;">
                <div style="font-weight: 500; color: #374151;">${result.name}</div>
                <div style="font-size: 0.875rem; color: #6b7280;">${result.detail}</div>
            </div>
        `).join('');

        resultsContainer.style.display = 'block';
    }

    hideSearchResults() {
        const resultsContainer = document.querySelector('.search-results');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
    }

    toggleNotifications() {
        this.showNotification('Notifications panel would open here', 'info');
    }

    handleCalendarNavigation(event) {
        const direction = event.currentTarget.getAttribute('aria-label');
        const monthElement = document.querySelector('.calendar-month');
        
        // Simple month navigation simulation
        const currentMonth = monthElement.textContent;
        this.showNotification(`Calendar navigation: ${direction}`, 'info');
    }

    handleContactStudent(event) {
        event.stopPropagation();
        const studentItem = event.currentTarget.closest('.at-risk-item');
        const studentName = studentItem.querySelector('.student-name').textContent;
        
        this.showModal(`Contact ${studentName}`, this.createContactForm(studentName));
    }

    handleScheduleAction(event) {
        const scheduleItem = event.currentTarget.closest('.schedule-item');
        const scheduleTitle = scheduleItem.querySelector('.schedule-title').textContent;
        
        this.showNotification(`Starting: ${scheduleTitle}`, 'success');
        
        // Update button to show "In Progress"
        event.currentTarget.textContent = 'In Progress';
        event.currentTarget.style.background = '#f59e0b';
    }

    initializeCharts() {
        // Initialize the weekly performance chart
        const chartCanvas = document.getElementById('weeklyPerformanceChart');
        if (chartCanvas && typeof Chart !== 'undefined') {
            const ctx = chartCanvas.getContext('2d');
            
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Class Average',
                        data: [78, 82, 85, 79, 88, 84, 86],
                        borderColor: '#2563eb',
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            grid: {
                                color: '#f3f4f6'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            });
        }
    }

    loadDashboardData() {
        // Simulate loading real-time data
        this.updatePerformanceCards();
        this.updateNotificationBadge();
        this.animateProgressBars();
    }

    updatePerformanceCards() {
        // Animate the progress bar
        const progressBar = document.querySelector('.progress-fill');
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.width = progressBar.style.width || '82.5%';
            }, 500);
        }
    }

    updateNotificationBadge() {
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            // Simulate real-time notification updates
            setInterval(() => {
                const currentCount = parseInt(badge.textContent);
                if (Math.random() > 0.95) { // 5% chance every interval
                    badge.textContent = currentCount + 1;
                    this.showNotification('New notification received', 'info');
                }
            }, 10000); // Check every 10 seconds
        }
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.transition = 'width 1s ease-in-out';
                const width = bar.style.width || '0%';
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }, index * 200);
        });
    }

    startRealTimeUpdates() {
        // Simulate real-time updates every 30 seconds
        setInterval(() => {
            this.updateEngagementHeatmap();
        }, 30000);
    }

    updateEngagementHeatmap() {
        const activityBars = document.querySelectorAll('.activity-bar');
        activityBars.forEach(bar => {
            const classes = ['low', 'medium', 'high'];
            const currentClass = classes.find(cls => bar.classList.contains(cls));
            const newClass = classes[Math.floor(Math.random() * classes.length)];
            
            if (currentClass !== newClass) {
                bar.classList.remove(currentClass);
                bar.classList.add(newClass);
            }
        });
    }

    setupInteractions() {
        // Add hover effects and tooltips
        this.setupTooltips();
        this.setupHoverEffects();
    }

    setupTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', this.showTooltip.bind(this));
            element.addEventListener('mouseleave', this.hideTooltip.bind(this));
        });
    }

    showTooltip(event) {
        const text = event.currentTarget.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: #374151;
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.875rem;
            z-index: 1000;
            pointer-events: none;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = event.currentTarget.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    }

    hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    setupHoverEffects() {
        // Add interactive hover effects to cards
        const cards = document.querySelectorAll('.performance-card, .action-card, .insight-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    // Modal functionality
    showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        `;

        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.cssText = `
            background: white;
            border-radius: 12px;
            padding: 24px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        `;

        modalContent.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="margin: 0; font-size: 1.25rem; font-weight: 600;">${title}</h3>
                <button class="modal-close" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
            </div>
            <div>${content}</div>
        `;

        modal.appendChild(modalContent);
        document.body.appendChild(modal);

        // Close modal functionality
        const closeBtn = modalContent.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Form creators for modals
    createLectureForm() {
        return `
            <form class="lecture-form">
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Lecture Title</label>
                    <input type="text" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px;" placeholder="Enter lecture title">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Subject</label>
                    <select style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px;">
                        <option>Mathematics</option>
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Biology</option>
                    </select>
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Upload Materials</label>
                    <input type="file" multiple style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px;">
                </div>
                <div style="display: flex; gap: 12px; justify-content: flex-end;">
                    <button type="button" class="modal-close" style="padding: 12px 24px; border: 1px solid #d1d5db; border-radius: 8px; background: white; cursor: pointer;">Cancel</button>
                    <button type="submit" style="padding: 12px 24px; border: none; border-radius: 8px; background: #2563eb; color: white; cursor: pointer;">Add Lecture</button>
                </div>
            </form>
        `;
    }

    createQuizForm() {
        return `
            <form class="quiz-form">
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Quiz/Assignment Title</label>
                    <input type="text" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px;" placeholder="Enter title">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Type</label>
                    <select style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px;">
                        <option>Quiz</option>
                        <option>Assignment</option>
                        <option>Test</option>
                    </select>
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Due Date</label>
                    <input type="datetime-local" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px;">
                </div>
                <div style="display: flex; gap: 12px; justify-content: flex-end;">
                    <button type="button" class="modal-close" style="padding: 12px 24px; border: 1px solid #d1d5db; border-radius: 8px; background: white; cursor: pointer;">Cancel</button>
                    <button type="submit" style="padding: 12px 24px; border: none; border-radius: 8px; background: #f59e0b; color: white; cursor: pointer;">Create</button>
                </div>
            </form>
        `;
    }

    createAnnouncementForm() {
        return `
            <form class="announcement-form">
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Announcement Title</label>
                    <input type="text" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px;" placeholder="Enter title">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Message</label>
                    <textarea style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; min-height: 100px;" placeholder="Enter your announcement"></textarea>
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Priority</label>
                    <select style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px;">
                        <option>Normal</option>
                        <option>High</option>
                        <option>Urgent</option>
                    </select>
                </div>
                <div style="display: flex; gap: 12px; justify-content: flex-end;">
                    <button type="button" class="modal-close" style="padding: 12px 24px; border: 1px solid #d1d5db; border-radius: 8px; background: white; cursor: pointer;">Cancel</button>
                    <button type="submit" style="padding: 12px 24px; border: none; border-radius: 8px; background: #10b981; color: white; cursor: pointer;">Post</button>
                </div>
            </form>
        `;
    }

    createScheduleForm() {
        return `
            <form class="schedule-form">
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Lecture Title</label>
                    <input type="text" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px;" placeholder="Enter lecture title">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Date & Time</label>
                    <input type="datetime-local" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px;">
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Duration (minutes)</label>
                    <input type="number" style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px;" placeholder="60" min="15" max="180">
                </div>
                <div style="display: flex; gap: 12px; justify-content: flex-end;">
                    <button type="button" class="modal-close" style="padding: 12px 24px; border: 1px solid #d1d5db; border-radius: 8px; background: white; cursor: pointer;">Cancel</button>
                    <button type="submit" style="padding: 12px 24px; border: none; border-radius: 8px; background: #8b5cf6; color: white; cursor: pointer;">Schedule</button>
                </div>
            </form>
        `;
    }

    createContactForm(studentName) {
        return `
            <form class="contact-form">
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Contact ${studentName}</label>
                    <select style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px;">
                        <option>Send Email</option>
                        <option>Schedule Meeting</option>
                        <option>Call Parent</option>
                    </select>
                </div>
                <div style="margin-bottom: 16px;">
                    <label style="display: block; margin-bottom: 8px; font-weight: 500;">Message</label>
                    <textarea style="width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; min-height: 100px;" placeholder="Enter your message"></textarea>
                </div>
                <div style="display: flex; gap: 12px; justify-content: flex-end;">
                    <button type="button" class="modal-close" style="padding: 12px 24px; border: 1px solid #d1d5db; border-radius: 8px; background: white; cursor: pointer;">Cancel</button>
                    <button type="submit" style="padding: 12px 24px; border: none; border-radius: 8px; background: #2563eb; color: white; cursor: pointer;">Send</button>
                </div>
            </form>
        `;
    }

    // Notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#2563eb'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 24px;
            background: ${colors[type]};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 2001;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize the dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TeacherDashboard();
});

// Add some utility functions for data formatting
const formatters = {
    percentage: (value) => `${value}%`,
    currency: (value) => `$${value.toLocaleString()}`,
    number: (value) => value.toLocaleString(),
    date: (date) => new Date(date).toLocaleDateString(),
    time: (date) => new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

// Export for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TeacherDashboard;
}
