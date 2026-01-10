document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Theme Toggle Logic ---
    const toggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    }

    toggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- 2. Scroll Animation (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px" // Offset slightly
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once visible to run animation only once
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));
});

// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // Create the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // If the element is visible
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-show');
                // Optional: Stop watching it so it doesn't animate out again
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Start animation slightly before bottom
    });

    // Tell the observer which elements to watch
    const hiddenElements = document.querySelectorAll('.scroll-hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});