// JobHub - Modern Job Board JavaScript
class JobHub {
    constructor() {
        this.currentPage = 1;
        this.jobsPerPage = 6;
        this.allJobs = [];
        this.filteredJobs = [];
        this.currentFilters = {
            search: '',
            location: '',
            type: '',
            category: ''
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadJobs();
        this.setupMobileMenu();
        this.setupModals();
        this.setupSearch();
        this.setupAnimations();
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreJobs();
            });
        }

        // Search functionality
        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.performSearch();
            });
        }

        // Search tags
        document.querySelectorAll('.search-tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const searchInput = document.getElementById('job-search');
                if (searchInput) {
                    searchInput.value = tag.textContent;
                    this.performSearch();
                }
            });
        });

        // Job card interactions
        this.setupJobCardInteractions();
    }

    // Mobile Menu Setup
    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger?.contains(e.target) && !navMenu?.contains(e.target)) {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            }
        });

        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            }
        });
    }

    // Modal Setup
    setupModals() {
        const loginBtn = document.getElementById('login-btn');
        const signupBtn = document.getElementById('signup-btn');
        const loginModal = document.getElementById('login-modal');
        const signupModal = document.getElementById('signup-modal');
        const loginClose = document.getElementById('login-close');
        const signupClose = document.getElementById('signup-close');

        // Open modals
        if (loginBtn && loginModal) {
            loginBtn.addEventListener('click', () => this.openModal(loginModal));
        }

        if (signupBtn && signupModal) {
            signupBtn.addEventListener('click', () => this.openModal(signupModal));
        }

        // Close modals
        if (loginClose && loginModal) {
            loginClose.addEventListener('click', () => this.closeModal(loginModal));
        }

        if (signupClose && signupModal) {
            signupClose.addEventListener('click', () => this.closeModal(signupModal));
        }

        // Close modal when clicking outside
        [loginModal, signupModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.closeModal(modal);
                    }
                });
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });

        // Form submissions
        this.setupFormSubmissions();
    }

    // Search Setup
    setupSearch() {
        const searchInput = document.getElementById('job-search');
        const locationInput = document.getElementById('location-search');

        // Debounced search
        let searchTimeout;
        
        [searchInput, locationInput].forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    clearTimeout(searchTimeout);
                    searchTimeout = setTimeout(() => {
                        this.performSearch();
                    }, 300);
                });

                // Search on Enter key
                input.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.performSearch();
                    }
                });
            }
        });
    }

    // Job Card Interactions
    setupJobCardInteractions() {
        document.addEventListener('click', (e) => {
            // Save job functionality
            if (e.target.closest('.btn-outline')) {
                const btn = e.target.closest('.btn-outline');
                if (btn.textContent.includes('Guardar')) {
                    this.toggleSaveJob(btn);
                }
            }

            // Apply for job functionality
            if (e.target.closest('.btn-primary')) {
                const btn = e.target.closest('.btn-primary');
                if (btn.textContent.includes('Postularse')) {
                    this.applyForJob(btn);
                }
            }
        });
    }

    // Load Jobs
    loadJobs() {
        // Simulate loading jobs from API
        this.allJobs = [
            {
                id: 1,
                title: 'Art Director',
                company: 'Hermes International S.A.',
                location: 'Harrisburg, Pennsylvania',
                type: 'fulltime',
                salary: '$1,240',
                salaryType: 'hiring_reward',
                tags: ['Diseño', 'Creatividad', 'Adobe Creative Suite'],
                logo: './src/img/suitcase.png'
            },
            {
                id: 2,
                title: 'Senior Developer',
                company: 'TechCorp Solutions',
                location: 'San Francisco, CA',
                type: 'remote',
                salary: '$120K - $150K',
                salaryType: 'salary',
                tags: ['React', 'Node.js', 'TypeScript'],
                logo: './src/img/suitcase.png'
            },
            {
                id: 3,
                title: 'Marketing Manager',
                company: 'MarketingPro Inc.',
                location: 'New York, NY',
                type: 'fulltime',
                salary: '$80K - $100K',
                salaryType: 'salary',
                tags: ['Marketing Digital', 'SEO', 'Analytics'],
                logo: './src/img/suitcase.png'
            },
            {
                id: 4,
                title: 'Data Scientist',
                company: 'DataFlow Analytics',
                location: 'Austin, TX',
                type: 'hybrid',
                salary: '$110K - $140K',
                salaryType: 'salary',
                tags: ['Python', 'Machine Learning', 'SQL'],
                logo: './src/img/suitcase.png'
            },
            {
                id: 5,
                title: 'UX/UI Designer',
                company: 'DesignStudio Creative',
                location: 'Los Angeles, CA',
                type: 'contract',
                salary: '$60 - $80/hr',
                salaryType: 'hourly',
                tags: ['Figma', 'Prototyping', 'User Research'],
                logo: './src/img/suitcase.png'
            },
            {
                id: 6,
                title: 'DevOps Engineer',
                company: 'CloudTech Solutions',
                location: 'Seattle, WA',
                type: 'fulltime',
                salary: '$130K - $160K',
                salaryType: 'salary',
                tags: ['AWS', 'Docker', 'Kubernetes'],
                logo: './src/img/suitcase.png'
            }
        ];

        this.filteredJobs = [...this.allJobs];
        this.renderJobs();
    }

    // Render Jobs
    renderJobs() {
        const jobsGrid = document.getElementById('jobs-grid');
        if (!jobsGrid) return;

        const startIndex = (this.currentPage - 1) * this.jobsPerPage;
        const endIndex = startIndex + this.jobsPerPage;
        const jobsToShow = this.filteredJobs.slice(startIndex, endIndex);

        if (this.currentPage === 1) {
            jobsGrid.innerHTML = '';
        }

        jobsToShow.forEach(job => {
            const jobCard = this.createJobCard(job);
            jobsGrid.appendChild(jobCard);
        });

        // Update load more button
        this.updateLoadMoreButton();
    }

    // Create Job Card
    createJobCard(job) {
        const card = document.createElement('article');
        card.className = 'job-card animate-fade-in-up';
        card.dataset.jobId = job.id;

        const badgeClass = `badge-${job.type}`;
        const salaryLabel = this.getSalaryLabel(job.salaryType);

        card.innerHTML = `
            <div class="job-header">
                <div class="company-logo">
                    <img src="${job.logo}" alt="${job.company}" class="logo-img">
                </div>
                <div class="job-meta">
                    <h3 class="job-title">${job.title}</h3>
                    <p class="company-name">${job.company}</p>
                    <div class="job-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${job.location}</span>
                    </div>
                </div>
                <div class="job-type">
                    <span class="badge ${badgeClass}">${this.getTypeLabel(job.type)}</span>
                </div>
            </div>
            
            <div class="job-details">
                <div class="job-tags">
                    ${job.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="job-salary">
                    <span class="salary-label">${salaryLabel}:</span>
                    <span class="salary-amount">${job.salary}</span>
                </div>
            </div>
            
            <div class="job-actions">
                <button class="btn btn-outline btn-sm" data-action="save">
                    <i class="fas fa-heart"></i>
                    Guardar
                </button>
                <button class="btn btn-primary btn-sm" data-action="apply">
                    <i class="fas fa-paper-plane"></i>
                    Postularse
                </button>
            </div>
        `;

        return card;
    }

    // Get Salary Label
    getSalaryLabel(salaryType) {
        const labels = {
            'salary': 'Salario',
            'hiring_reward': 'Recompensa por contratación',
            'hourly': 'Tarifa'
        };
        return labels[salaryType] || 'Salario';
    }

    // Get Type Label
    getTypeLabel(type) {
        const labels = {
            'fulltime': 'Tiempo Completo',
            'remote': 'Remoto',
            'hybrid': 'Híbrido',
            'contract': 'Contrato'
        };
        return labels[type] || 'Tiempo Completo';
    }

    // Load More Jobs
    loadMoreJobs() {
        this.currentPage++;
        this.renderJobs();
    }

    // Update Load More Button
    updateLoadMoreButton() {
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (!loadMoreBtn) return;

        const hasMoreJobs = this.currentPage * this.jobsPerPage < this.filteredJobs.length;
        loadMoreBtn.style.display = hasMoreJobs ? 'inline-flex' : 'none';
    }

    // Perform Search
    performSearch() {
        const searchInput = document.getElementById('job-search');
        const locationInput = document.getElementById('location-search');

        const searchTerm = searchInput?.value.toLowerCase() || '';
        const locationTerm = locationInput?.value.toLowerCase() || '';

        this.currentFilters.search = searchTerm;
        this.currentFilters.location = locationTerm;

        this.filteredJobs = this.allJobs.filter(job => {
            const matchesSearch = !searchTerm || 
                job.title.toLowerCase().includes(searchTerm) ||
                job.company.toLowerCase().includes(searchTerm) ||
                job.tags.some(tag => tag.toLowerCase().includes(searchTerm));

            const matchesLocation = !locationTerm || 
                job.location.toLowerCase().includes(locationTerm);

            return matchesSearch && matchesLocation;
        });

        this.currentPage = 1;
        this.renderJobs();
        this.showSearchResults();
    }

    // Show Search Results
    showSearchResults() {
        const resultsCount = this.filteredJobs.length;
        const totalCount = this.allJobs.length;
        
        // You could add a results counter here
        console.log(`Mostrando ${resultsCount} de ${totalCount} empleos`);
    }

    // Toggle Save Job
    toggleSaveJob(button) {
        const icon = button.querySelector('i');
        const isSaved = button.classList.contains('saved');

        if (isSaved) {
            button.classList.remove('saved');
            icon.className = 'fas fa-heart';
            button.innerHTML = '<i class="fas fa-heart"></i>Guardar';
            this.showNotification('Empleo removido de guardados', 'info');
        } else {
            button.classList.add('saved');
            icon.className = 'fas fa-heart';
            icon.style.color = '#ef4444';
            button.innerHTML = '<i class="fas fa-heart" style="color: #ef4444;"></i>Guardado';
            this.showNotification('Empleo guardado exitosamente', 'success');
        }
    }

    // Apply for Job
    applyForJob(button) {
        const jobCard = button.closest('.job-card');
        const jobId = jobCard?.dataset.jobId;
        const jobTitle = jobCard?.querySelector('.job-title')?.textContent;

        if (jobId && jobTitle) {
            this.showNotification(`Postulación enviada para: ${jobTitle}`, 'success');
            
            // Simulate API call
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-check"></i>Aplicado';
                button.disabled = true;
                button.style.background = '#10b981';
            }, 1000);
        }
    }

    // Modal Functions
    openModal(modal) {
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Focus first input
            const firstInput = modal.querySelector('input, select');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }

    closeModal(modal) {
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    closeAllModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            this.closeModal(modal);
        });
    }

    // Form Submissions
    setupFormSubmissions() {
        const loginForm = document.querySelector('#login-modal form');
        const signupForm = document.querySelector('#signup-modal form');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(e.target);
            });
        }

        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignup(e.target);
            });
        }
    }

    // Handle Login
    handleLogin(form) {
        const formData = new FormData(form);
        const email = formData.get('email') || document.getElementById('login-email')?.value;
        const password = formData.get('password') || document.getElementById('login-password')?.value;

        if (!email || !password) {
            this.showNotification('Por favor completa todos los campos', 'error');
            return;
        }

        // Simulate login
        this.showNotification('Iniciando sesión...', 'info');
        
        setTimeout(() => {
            this.showNotification('¡Bienvenido de vuelta!', 'success');
            this.closeModal(document.getElementById('login-modal'));
            form.reset();
        }, 1500);
    }

    // Handle Signup
    handleSignup(form) {
        const formData = new FormData(form);
        const name = formData.get('name') || document.getElementById('signup-name')?.value;
        const email = formData.get('email') || document.getElementById('signup-email')?.value;
        const password = formData.get('password') || document.getElementById('signup-password')?.value;
        const type = formData.get('type') || document.getElementById('signup-type')?.value;

        if (!name || !email || !password || !type) {
            this.showNotification('Por favor completa todos los campos', 'error');
            return;
        }

        // Simulate signup
        this.showNotification('Creando cuenta...', 'info');
        
        setTimeout(() => {
            this.showNotification('¡Cuenta creada exitosamente!', 'success');
            this.closeModal(document.getElementById('signup-modal'));
            form.reset();
        }, 1500);
    }

    // Animations Setup
    setupAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements
        document.querySelectorAll('.job-card, .feature-card').forEach(el => {
            observer.observe(el);
        });
    }

    // Notification System
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${this.getNotificationColor(type)};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Get Notification Icon
    getNotificationIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Get Notification Color
    getNotificationColor(type) {
        const colors = {
            'success': '#10b981',
            'error': '#ef4444',
            'warning': '#f59e0b',
            'info': '#3b82f6'
        };
        return colors[type] || '#3b82f6';
    }
}

// Initialize JobHub when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JobHub();
});

// Add some utility functions
const utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format currency
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },

    // Format date
    formatDate(date) {
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    }
};

// Export for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { JobHub, utils };
}