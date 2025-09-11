// Parent Dashboard JavaScript - EduVerse

class ParentDashboard {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.initializeCharts();
        this.loadDashboardData();
    }

    init() {
        // Initialize dashboard components
        this.setupProfileDropdown();
        this.setupNotificationModal();
        this.setupSidebar();
    }

    setupEventListeners() {
        // Profile dropdown
        const profileBtn = document.querySelector('.profile-btn');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        
        if (profileBtn && dropdownMenu) {
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            });

            document.addEventListener('click', () => {
                dropdownMenu.style.display = 'none';
            });
        }

        // Notification modal
        const notificationBtn = document.getElementById('notificationBtn');
        const notificationModal = document.getElementById('notificationModal');
        const modalClose = document.querySelector('.modal-close');

        if (notificationBtn && notificationModal) {
            notificationBtn.addEventListener('click', () => {
                notificationModal.style.display = 'block';
            });
        }

        if (modalClose && notificationModal) {
            modalClose.addEventListener('click', () => {
                notificationModal.style.display = 'none';
            });
        }

        if (notificationModal) {
            notificationModal.addEventListener('click', (e) => {
                if (e.target === notificationModal) {
                    notificationModal.style.display = 'none';
                }
            });
        }

        // Sidebar navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Time filter for charts
        const timeFilter = document.querySelector('.time-filter');
        if (timeFilter) {
            timeFilter.addEventListener('change', (e) => {
                this.updateProgressChart(e.target.value);
            });
        }

        // Fee payment button
        const payNowBtn = document.querySelector('.btn-primary');
        if (payNowBtn && payNowBtn.textContent.includes('Pay Now')) {
            payNowBtn.addEventListener('click', () => {
                this.handlePayment();
            });
        }

        // Communication items
        const commItems = document.querySelectorAll('.communication-item');
        commItems.forEach(item => {
            item.addEventListener('click', () => {
                this.openCommunication(item);
            });
        });

        // Event items
        const eventItems = document.querySelectorAll('.event-item');
        eventItems.forEach(item => {
            item.addEventListener('click', () => {
                this.viewEventDetails(item);
            });
        });
    }

    setupProfileDropdown() {
        // Profile dropdown functionality is handled in setupEventListeners
    }

    setupNotificationModal() {
        // Mark notifications as read when modal is opened
        const notificationModal = document.getElementById('notificationModal');
        if (notificationModal) {
            notificationModal.addEventListener('show', () => {
                this.markNotificationsAsRead();
            });
        }
    }

    setupSidebar() {
        // Mobile sidebar toggle (if needed)
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (sidebarToggle && sidebar) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
        }
    }

    initializeCharts() {
        this.initProgressChart();
    }

    initProgressChart() {
        const ctx = document.getElementById('progressChart');
        if (!ctx) return;

        const chartCtx = ctx.getContext('2d');
        
        this.progressChart = new Chart(chartCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Emma Johnson',
                        data: [85, 88, 92, 89, 94, 92],
                        borderColor: '#ea580c',
                        backgroundColor: 'rgba(234, 88, 12, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#ea580c',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    },
                    {
                        label: 'Alex Johnson',
                        data: [72, 75, 78, 74, 80, 78],
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#f59e0b',
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                family: 'Inter',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        borderColor: '#ea580c',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}%`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 11
                            },
                            color: '#6b7280'
                        }
                    },
                    y: {
                        beginAtZero: false,
                        min: 60,
                        max: 100,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: {
                                family: 'Inter',
                                size: 11
                            },
                            color: '#6b7280',
                            callback: function(value) {
                                return value + '%';
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        hoverRadius: 8
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    updateProgressChart(timeRange) {
        if (!this.progressChart) return;

        let newData;
        let newLabels;

        switch(timeRange) {
            case 'Last 6 Months':
                newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                newData = [
                    [85, 88, 92, 89, 94, 92],
                    [72, 75, 78, 74, 80, 78]
                ];
                break;
            case 'This Year':
                newLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
                newData = [
                    [88, 92, 90, 94],
                    [75, 78, 82, 80]
                ];
                break;
            case 'All Time':
                newLabels = ['Year 1', 'Year 2', 'Year 3'];
                newData = [
                    [82, 87, 92],
                    [70, 75, 78]
                ];
                break;
            default:
                return;
        }

        this.progressChart.data.labels = newLabels;
        this.progressChart.data.datasets[0].data = newData[0];
        this.progressChart.data.datasets[1].data = newData[1];
        this.progressChart.update('active');
    }

    loadDashboardData() {
        // Simulate loading dashboard data
        this.loadChildrenData();
        this.loadCommunications();
        this.loadEvents();
        this.loadFeeStatus();
        this.loadNotifications();
    }

    loadChildrenData() {
        // Simulate API call to load children data
        const childrenData = [
            {
                id: 1,
                name: 'Emma Johnson',
                grade: 'Grade 8',
                class: 'Class 8A',
                overallGrade: 92,
                attendance: 98,
                assignmentsDue: 5,
                status: 'excellent'
            },
            {
                id: 2,
                name: 'Alex Johnson',
                grade: 'Grade 5',
                class: 'Class 5B',
                overallGrade: 78,
                attendance: 85,
                assignmentsDue: 3,
                status: 'needs_attention'
            }
        ];

        // Update UI with children data
        this.updateChildrenCards(childrenData);
    }

    updateChildrenCards(childrenData) {
        // This would update the children cards with real data
        // For now, the data is already in the HTML
    }

    loadCommunications() {
        // Simulate loading recent communications
        const communications = [
            {
                id: 1,
                sender: 'Ms. Davis (Math Teacher)',
                message: 'Emma did excellent work on her algebra test. She scored 95%!',
                time: '2 hours ago',
                avatar: 'https://via.placeholder.com/40'
            },
            {
                id: 2,
                sender: 'Mr. Wilson (Science Teacher)',
                message: 'Alex missed the science project deadline. Please help him catch up.',
                time: '1 day ago',
                avatar: 'https://via.placeholder.com/40'
            }
        ];

        // Update communications list
        this.updateCommunicationsList(communications);
    }

    updateCommunicationsList(communications) {
        // Update the communications list in the UI
        // For now, the data is already in the HTML
    }

    loadEvents() {
        // Simulate loading upcoming events
        const events = [
            {
                id: 1,
                title: 'Parent-Teacher Conference',
                description: "Emma's quarterly review meeting",
                date: '2023-12-15',
                time: '3:00 PM - 4:00 PM'
            },
            {
                id: 2,
                title: 'Science Fair',
                description: "Alex's project presentation",
                date: '2023-12-18',
                time: '10:00 AM - 2:00 PM'
            }
        ];

        // Update events list
        this.updateEventsList(events);
    }

    updateEventsList(events) {
        // Update the events list in the UI
        // For now, the data is already in the HTML
    }

    loadFeeStatus() {
        // Simulate loading fee status
        const feeStatus = {
            emma: { amount: 1200, status: 'paid' },
            alex: { amount: 1000, status: 'pending', dueDate: '2023-12-20' },
            activity: { amount: 150, status: 'paid' },
            outstanding: 1000
        };

        // Update fee status
        this.updateFeeStatus(feeStatus);
    }

    updateFeeStatus(feeStatus) {
        // Update the fee status in the UI
        // For now, the data is already in the HTML
    }

    loadNotifications() {
        // Simulate loading notifications
        const notifications = [
            {
                id: 1,
                type: 'warning',
                title: 'Assignment Overdue',
                message: 'Alex has an overdue math assignment',
                time: '2 hours ago',
                read: false
            },
            {
                id: 2,
                type: 'success',
                title: 'Achievement Unlocked',
                message: 'Emma earned "Math Wizard" badge',
                time: '1 day ago',
                read: true
            }
        ];

        // Update notification badge
        this.updateNotificationBadge(notifications.filter(n => !n.read).length);
    }

    updateNotificationBadge(unreadCount) {
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'block' : 'none';
        }
    }

    markNotificationsAsRead() {
        // Mark all notifications as read
        const unreadItems = document.querySelectorAll('.notification-item.unread');
        unreadItems.forEach(item => {
            item.classList.remove('unread');
        });

        // Update badge
        this.updateNotificationBadge(0);
    }

    handlePayment() {
        // Handle fee payment
        if (confirm('Proceed with payment of $1,000?')) {
            // Simulate payment processing
            this.showPaymentProcessing();
            
            setTimeout(() => {
                this.showPaymentSuccess();
                this.updateFeeStatusAfterPayment();
            }, 2000);
        }
    }

    showPaymentProcessing() {
        const payBtn = document.querySelector('.btn-primary');
        if (payBtn && payBtn.textContent.includes('Pay Now')) {
            payBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            payBtn.disabled = true;
        }
    }

    showPaymentSuccess() {
        const payBtn = document.querySelector('.btn-primary');
        if (payBtn) {
            payBtn.innerHTML = '<i class="fas fa-check"></i> Payment Successful';
            payBtn.classList.remove('btn-primary');
            payBtn.classList.add('btn-success');
        }

        // Show success message
        this.showNotification('Payment successful! Receipt sent to your email.', 'success');
    }

    updateFeeStatusAfterPayment() {
        // Update fee status after successful payment
        const pendingFee = document.querySelector('.fee-amount.pending');
        if (pendingFee) {
            pendingFee.textContent = '$1,000 - Paid';
            pendingFee.classList.remove('pending');
            pendingFee.classList.add('paid');
        }

        const totalAmount = document.querySelector('.total-amount');
        if (totalAmount) {
            totalAmount.textContent = '$0';
        }
    }

    openCommunication(item) {
        // Open communication details
        const sender = item.querySelector('.comm-sender').textContent;
        const message = item.querySelector('.comm-message').textContent;
        
        // For now, just highlight the item
        document.querySelectorAll('.communication-item').forEach(comm => {
            comm.classList.remove('active');
        });
        item.classList.add('active');
        
        // In a real app, this would open a detailed view or compose reply
        console.log('Opening communication from:', sender);
    }

    viewEventDetails(item) {
        // View event details
        const title = item.querySelector('h4').textContent;
        const description = item.querySelector('p').textContent;
        
        // For now, just highlight the item
        document.querySelectorAll('.event-item').forEach(event => {
            event.classList.remove('active');
        });
        item.classList.add('active');
        
        // In a real app, this would open event details or calendar
        console.log('Viewing event:', title);
    }

    showNotification(message, type = 'info') {
        // Create and show notification toast
        const notification = document.createElement('div');
        notification.className = `notification-toast ${type}`;
        notification.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close">&times;</button>
        `;

        document.body.appendChild(notification);

        // Position the notification
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 2001;
            display: flex;
            align-items: center;
            gap: 1rem;
            min-width: 300px;
            animation: slideInRight 0.3s ease-out;
        `;

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        // Close button functionality
        const closeBtn = notification.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || icons.info;
    }

    getNotificationColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        return colors[type] || colors.info;
    }

    // Utility methods
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    formatTime(timeString) {
        const time = new Date(`2000-01-01 ${timeString}`);
        return time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParentDashboard();
});

// Add CSS for notification toast animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    }
    
    .toast-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background-color 0.2s;
    }
    
    .toast-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .communication-item.active,
    .event-item.active {
        background: rgba(234, 88, 12, 0.1);
        border-left: 4px solid #ea580c;
    }
    
    .btn-success {
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
    }
`;
document.head.appendChild(style);
