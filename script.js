document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTabSwitching();
    initScrollAnimations();
    initProgressBars();
    initMobileMenu();
    initSmoothScroll();
    initHoverEffects();
});

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        navbar.style.boxShadow = window.scrollY > 100 ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none';
    });
}

function initTabSwitching() {
    const tabs = document.querySelectorAll('.resource-tab');
    const panels = document.querySelectorAll('.resource-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const type = this.dataset.type;
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            const targetPanel = document.getElementById(type);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.skill-card, .roadmap-item, .ai-card, .tip-card, .resource-item').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.5s ease ${index * 0.05}s`;
        observer.observe(el);
    });
}

function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const progress = bar.style.getPropertyValue('--progress');
                setTimeout(() => { bar.style.width = progress; }, 200);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    progressBars.forEach(bar => observer.observe(bar));
}

function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('fa-times');
            this.classList.toggle('fa-bars');
        });
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetPosition = target.offsetTop - 80;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });
}

function initHoverEffects() {
    document.querySelectorAll('.roadmap-item, .skill-card, .tip-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

console.log('%c🚀 产品经理成长指南 2026', 'font-size: 20px; font-weight: bold; color: #4F46E5;');
console.log('%c持续学习，成为优秀的产品经理！', 'font-size: 14px; color: #6B7280;');