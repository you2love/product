// Product Manager Learning Website - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavigation();
    initLearningPathTabs();
    initCourseFilters();
    initResourceTabs();
    initScrollAnimations();
    initProgressBars();
    initMobileMenu();
    initSmoothScroll();
    initButtonEffects();
    initFormHandling();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenu.querySelector('i').classList.toggle('fa-bars');
            mobileMenu.querySelector('i').classList.toggle('fa-times');
        });
    }
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Learning Path Tabs
function initLearningPathTabs() {
    const tabs = document.querySelectorAll('.path-tab');
    const levels = document.querySelectorAll('.path-level');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const level = this.dataset.level;
            
            // Remove active class from all tabs and levels
            tabs.forEach(t => t.classList.remove('active'));
            levels.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding level
            this.classList.add('active');
            const targetLevel = document.getElementById(level);
            if (targetLevel) {
                targetLevel.classList.add('active');
            }
        });
    });
}

// Course Filters
function initCourseFilters() {
    const filters = document.querySelectorAll('.filter-btn');
    const courses = document.querySelectorAll('.course-card');
    
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.dataset.filter;
            
            // Update active filter
            filters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter courses
            courses.forEach(course => {
                if (category === 'all' || course.dataset.category === category) {
                    course.classList.remove('hidden');
                    course.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    course.classList.add('hidden');
                }
            });
        });
    });
}

// Resource Tabs
function initResourceTabs() {
    const tabs = document.querySelectorAll('.resource-tab');
    const panels = document.querySelectorAll('.resource-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const type = this.dataset.type;
            
            // Remove active class from all tabs and panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(type);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.skill-card, .course-card, .project-card, .resource-item, ' +
        '.tool-item, .community-item, .timeline-item'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Add animate-in styles dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Progress Bar Animations
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.style.getPropertyValue('--progress');
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = progress;
                }, 100);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Button Effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .btn-outline .ripple {
            background: rgba(79, 70, 229, 0.2);
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Form Handling
function initFormHandling() {
    const ctaForm = document.querySelector('.cta-form');
    
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const input = this.querySelector('.cta-input');
            const button = this.querySelector('button');
            const email = input.value.trim();
            
            if (email) {
                // Show loading state
                button.textContent = '提交中...';
                button.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    button.textContent = '✓ 订阅成功！';
                    button.style.background = '#10B981';
                    input.value = '';
                    
                    setTimeout(() => {
                        button.textContent = '免费开始学习';
                        button.disabled = false;
                        button.style.background = '';
                    }, 2000);
                }, 1000);
            } else {
                input.classList.add('error');
                input.style.borderColor = '#EF4444';
                
                setTimeout(() => {
                    input.classList.remove('error');
                    input.style.borderColor = '';
                }, 2000);
            }
        });
    }
    
    // Login button click handler
    const loginBtn = document.querySelector('.nav-actions .btn-outline');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showModal('login');
        });
    }
    
    // Start learning button click handlers
    const startBtns = document.querySelectorAll('.hero-actions .btn-primary, .course-footer .btn-primary');
    startBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showModal('signup');
        });
    });
}

// Modal functionality
function showModal(type) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h3>${type === 'login' ? '登录账户' : '开始学习'}</h3>
            <p>${type === 'login' ? '已有账号？立即登录开始学习' : '免费注册，获得完整学习体验'}</p>
            <form class="modal-form">
                ${type === 'signup' ? '<input type="text" placeholder="您的姓名" required>' : ''}
                <input type="email" placeholder="电子邮箱" required>
                <input type="password" placeholder="密码" required>
                <button type="submit" class="btn btn-primary btn-lg">
                    ${type === 'login' ? '立即登录' : '免费注册'}
                </button>
            </form>
            <p class="modal-footer">
                ${type === 'login' ? '还没有账号？<a href="#">立即注册</a>' : '已有账号？<a href="#">立即登录</a>'}
            </p>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Add modal styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            padding: 48px;
            border-radius: 16px;
            max-width: 420px;
            width: 90%;
            text-align: center;
            position: relative;
            animation: slideUp 0.3s ease;
        }
        
        .modal-close {
            position: absolute;
            top: 16px;
            right: 16px;
            font-size: 28px;
            color: #6B7280;
            cursor: pointer;
            transition: color 0.3s;
        }
        
        .modal-close:hover {
            color: #1F2937;
        }
        
        .modal-content h3 {
            font-size: 28px;
            margin-bottom: 12px;
        }
        
        .modal-content > p {
            color: #6B7280;
            margin-bottom: 32px;
        }
        
        .modal-form input {
            width: 100%;
            padding: 14px 18px;
            border: 2px solid #E5E7EB;
            border-radius: 8px;
            font-size: 16px;
            margin-bottom: 16px;
            transition: border-color 0.3s;
        }
        
        .modal-form input:focus {
            border-color: #4F46E5;
        }
        
        .modal-form .btn {
            width: 100%;
            margin-top: 8px;
        }
        
        .modal-footer {
            margin-top: 24px;
            font-size: 14px;
            color: #6B7280;
        }
        
        .modal-footer a {
            color: #4F46E5;
            font-weight: 500;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(modalStyle);
    
    // Close modal functionality
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
    
    // Add fadeOut animation
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
        @keyframes fadeOut {
            to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(fadeOutStyle);
    
    // Form submission
    modal.querySelector('.modal-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const button = this.querySelector('button[type="submit"]');
        button.textContent = '提交中...';
        button.disabled = true;
        
        setTimeout(() => {
            closeModal();
            showNotification('success', type === 'login' ? '登录成功！欢迎回来' : '注册成功！开始你的学习之旅');
        }, 1500);
    });
}

// Notification System
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 24px;
            background: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 3000;
            animation: slideInRight 0.4s ease;
            font-weight: 500;
        }
        
        .notification-success {
            border-left: 4px solid #10B981;
        }
        
        .notification-success i {
            color: #10B981;
            font-size: 20px;
        }
        
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
        
        @keyframes slideOutRight {
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(notificationStyle);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease forwards';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Counter Animation for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .community-stats .stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const hasPlus = target.includes('+');
        const hasComma = target.includes(',');
        const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
        
        let current = 0;
        const increment = numericTarget / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericTarget) {
                current = numericTarget;
                clearInterval(timer);
            }
            
            let display = Math.floor(current).toString();
            if (hasComma) {
                display = display.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
            if (hasPlus) {
                display += '+';
            }
            counter.textContent = display;
        }, stepTime);
    });
}

// Initialize counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// Parallax effect for floating cards
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const floatingCards = document.querySelector('.floating-cards');
    
    if (floatingCards && scrolled < window.innerHeight) {
        floatingCards.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// Add hover effect to cards
document.querySelectorAll('.card-1, .card-2, .card-3, .card-4').forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Resource item hover effect
document.querySelectorAll('.resource-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('.resource-rank').style.transform = 'scale(1.2)';
        this.querySelector('.resource-rank').style.color = '#4F46E5';
    });
    
    item.addEventListener('mouseleave', function() {
        this.querySelector('.resource-rank').style.transform = 'scale(1)';
        this.querySelector('.resource-rank').style.color = '';
    });
});

// Course card bookmark functionality
document.querySelectorAll('.course-card').forEach(card => {
    const bookmarkBtn = document.createElement('button');
    bookmarkBtn.className = 'bookmark-btn';
    bookmarkBtn.innerHTML = '<i class="far fa-bookmark"></i>';
    bookmarkBtn.style.cssText = `
        position: absolute;
        top: 16px;
        right: 16px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: white;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #6B7280;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
    `;
    
    card.querySelector('.course-image').appendChild(bookmarkBtn);
    
    bookmarkBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.innerHTML = this.querySelector('i').classList.contains('far') 
            ? '<i class="fas fa-bookmark" style="color: #4F46E5;"></i>'
            : '<i class="far fa-bookmark"></i>';
        
        showNotification('success', this.querySelector('i').classList.contains('fas') 
            ? '已添加到收藏' 
            : '已取消收藏');
    });
});

// Project card explore functionality
document.querySelectorAll('.project-overlay .btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const projectCard = this.closest('.project-card');
        const title = projectCard.querySelector('h3').textContent;
        
        showNotification('success', `即将开始项目：${title}`);
    });
});

// Tab keyboard navigation
document.querySelectorAll('.path-tab, .filter-btn, .resource-tab').forEach(tab => {
    tab.setAttribute('tabindex', '0');
    
    tab.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Loading animation for page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    const loadStyle = document.createElement('style');
    loadStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadStyle);
});

// Console welcome message
console.log('%c🚀 欢迎来到 PM Hub - 产品经理学习平台', 'font-size: 20px; font-weight: bold; color: #4F46E5;');
console.log('%c开始你的产品经理成长之旅吧！', 'font-size: 14px; color: #6B7280;');
console.log('%c🎯 学习路径 | 📚 精品课程 | 🛠️ 实战项目 | 👥 社区交流', 'font-size: 12px; color: #10B981;');